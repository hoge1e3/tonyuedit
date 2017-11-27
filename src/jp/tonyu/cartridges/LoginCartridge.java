package jp.tonyu.cartridges;

import static jp.tonyu.servlet.UI.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.OAuthCartridge;
import jp.tonyu.auth.OAuthKeyDB;
import jp.tonyu.auth.UserDB;
import jp.tonyu.debug.Log;
import jp.tonyu.edit.EQ;
import jp.tonyu.edit.FS;
import jp.tonyu.fs.GLSFile;
import jp.tonyu.servlet.MultiServletCartridge;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Html;
import jp.tonyu.util.MD5;
import jp.tonyu.util.col.Maps;
import net.arnx.jsonic.JSON;

public class LoginCartridge implements ServletCartridge{
	/*
	 initial setup:
	 $.post("/edit/passwd",{user:"root",new:"root-passwd"});
	 Login as root from /edit/login (Where is the form?)
	 $.post("/edit/oauthKey",{service:"",key:"",secret:""});
	 */
	private static final String KEY_PASSWD = "passwd";
    static final String LOGIN="login";
	private static final String PARAM_UID = "uid";
	private static final String PARAM_PASS = "pass";
    public static final String VERIFY_OAUTHED_USER = "verify_oauthed_user";
    private static final String TERMS_VER = "2014_0821";
    DatastoreService dss;
	MultiServletCartridge cs=new MultiServletCartridge();
	Auth auth;
	String onLoginURL;
    private FS fs;
    OAuthKeyDB oauthDB;
	public LoginCartridge(DatastoreService dss,Auth auth, OAuthKeyDB okb, FS fs, String onLoginURL) {
		super();
		this.dss=dss;
		this.auth = auth;
		this.fs=fs;
		this.onLoginURL=onLoginURL;
		oauthDB=okb;
	}
	public void insert(OAuthCartridge c) {
		cs.insert(c);
	}
	@Override
	public boolean get(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String u=req.getPathInfo();
		if (u.startsWith("/"+LOGIN)) {
			return loginForm(req, resp,"");
		} else if (u.startsWith("/logout")) {
		    return logout(req, resp);
		} else if (u.startsWith("/"+VERIFY_OAUTHED_USER)) {
            return verifyOAuthedUser(req,resp);
        } else if (u.startsWith("/currentUser")) {
		    return currentUser(req, resp);
		} else if (u.startsWith("/adduser")) {
	        return addUser(req,resp);
	    } else if (cs.get(req, resp)) return true;
		return false;
	}
    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
    		throws IOException {
    	String u=req.getPathInfo();
    	if (u.startsWith("/"+LOGIN)) {
    		return login(req, resp);
    	} else if (u.startsWith("/"+VERIFY_OAUTHED_USER)) {
    	    return verifyOAuthedUser(req,resp);
    	} else if (u.startsWith("/passwd")) {
            return passwd(req,resp);
        } else if (u.startsWith("/oauthKey")) {
            return oauthKey(req,resp);
        } else if (cs.post(req, resp)) return true;
    	return false;
    }
    private boolean oauthKey(HttpServletRequest req, HttpServletResponse resp) {
        String service=req.getParameter(OAuthKeyDB.KEY_SERVICE);
        String key=req.getParameter(OAuthKeyDB.KEY_KEY);
        String secret=req.getParameter(OAuthKeyDB.KEY_SECRET);
        if (!auth.isRoot()) throw new RuntimeException("Notroot");
        oauthDB.put(service, key, secret);
        System.out.println("Put data "+service);
        return true;
    }
    public boolean logout(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        auth.logout();
        resp.sendRedirect(ServerInfo.top(req)+"/");
        return true;
    }
    public boolean currentUser(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String uid = auth.currentUserId();
        if (uid==null) uid="null";
        if (req.getParameter("withCsrfToken")!=null) {
            resp.getWriter().print(
                    JSON.encode(Maps.create("user", uid).p("csrfToken", auth.csrfToken())));
                    return true;
        }
        resp.getWriter().print(uid);
        return true;
    }
	private boolean passwd(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	    //user is valid only user=="root" and User:root:hash is not set
	    String user=req.getParameter("user");
        String old=req.getParameter("old");
        String _new=req.getParameter("new");
	    if ("root".equals(user)) {
	        Entity root = auth.getUDB().getUserEntity("root", true);
	        EQ rq = EQ.$(root);
            Object passwd = rq.attr(KEY_PASSWD);
	        if (passwd==null) {
	            rq.attr(KEY_PASSWD,hashPass(_new)).putTo(dss);
	            resp.getWriter().write("OK");
	            return true;
	        }
	    }
	    EQ eq;
        boolean valid=false;
        if (auth.isRoot()) {
            if (user==null) user="root";
            eq=EQ.$(auth.getUDB().getUserEntity(user, false));
            valid=(!eq.isEmpty());
        } else {
            Entity e = auth.currentUser();
            eq = EQ.$(e);
            valid=verifyPass(old, eq);
        }
        if (!valid) {
            resp.getWriter().write("NG");
            return true;
        } else {
            eq.attr(KEY_PASSWD,hashPass(_new)).putTo(dss);
            resp.getWriter().write("OK");
            return true;
        }
    }
    private boolean addUser(HttpServletRequest req, HttpServletResponse resp) {
        // TODO 自動生成されたメソッド・スタブ
        return false;
    }
    private boolean verifyOAuthedUser(HttpServletRequest req,
            HttpServletResponse resp) throws IOException {
	    Entity e = auth.getOAuthedUserEntity();
	    if (e==null) {
	        resp.getWriter().println("Entity not found");
	        return true;
	    }
	    Object userId=e.getProperty(UserDB.KEY_LOCAL_USER_ID);
	    if (userId!=null) {
            loginAs(req,resp,e);
	        return true;
	    } else {
	        signup(req,resp,e);
	        return true;
	    }
    }
    private void signup(HttpServletRequest req, HttpServletResponse resp,
            Entity e) throws IOException {
        String lUserId=req.getParameter(PARAM_UID);
        Object mesg=null;
        if (lUserId==null) {
            lUserId=auth.getRecommendedLocalUserId();
        } else {
            Entity ae=auth.getUDB().getUserEntity(lUserId, false);
            if (ae!=null) mesg=t("div").a("style","color:red;").e(lUserId+"はすでに同一名のユーザがいます");
            else {
                if (Auth.isValidUserName(lUserId)) {
                    e.setProperty(UserDB.KEY_LOCAL_USER_ID, lUserId);
                    e.setProperty(UserDB.KEY_AGREED_TERM_VERSION, TERMS_VER);
                    auth.getUDB().setUserEntity(e);
                    loginAs(req,resp,e);
                    return;
                }
                mesg=t("div").a("style","color:red;").e("ユーザ名には，半角英数字，アンダースコアのみを使用してください");
            }
        }
        responseUTF8(resp);
        PrintWriter w = resp.getWriter();
        w.print( t("html").e(
                    t("body").e(
                            t("h1").e("ユーザ登録"),
                            t("div").e(
                                  "利用規約に同意の上，ユーザ名を設定してください",
                                  t("h2").e("利用規約抄録","(Ver.",TERMS_VER,")"),
                                  t("ul").e(
                                       t("li").e("他者の著作権、肖像権、パブリシティー権等を侵害する行為を禁止します．"),
                                       t("li").e("他者に不利益、損害を与える行為，特に他者を差別、誹謗中傷する行為、" +
                                       		"他者の名誉または信用を損ねる行為を禁止します．"),
                                       t("li").e("プロジェクトの投稿者は、本サービスの利用を通じて発生した結果について、" +
                                               "一切の責任を負います．"+
                                               "万が一問題が発生した場合には，当該投稿者の自己責任で解決するものとし，" +
                                               "運営者に何ら迷惑を及ぼさないものとします．")
                                  ),
                                  t("a").a("href", ServerInfo.editTop(req)+"/doc/terms.html").a("target", "terms").e("利用規約全文を読む...")
                            ),
                            t("form").a("action", ServerInfo.appTop(req)+"/"+VERIFY_OAUTHED_USER).a("method","POST").e(
                                    mesg,
                                 t("span").e("ユーザ名を設定"),
                                 t("input").a("name",PARAM_UID).a("value", lUserId),
                                 t("input").a("type", "submit").a("value", "利用規約に同意してユーザ登録する")
                            )
        )));

    }
    public void responseUTF8(HttpServletResponse resp) {
        resp.setContentType("text/html; charset=utf8");
    }
    public boolean loginForm(HttpServletRequest req, HttpServletResponse resp,String msg)
			throws IOException {
		responseUTF8(resp);
		PrintWriter w = resp.getWriter();
		w.print(Html.p("<html><body>"+
		        "<h1 onclick=%a>ログイン</h1>"
		        ,"document.getElementById('theForm').style.cssText='';" ));
		//if (req.getParameter("show_login_form")!=null) {
	        w.print(Html.p(
	                "<div>%t</div>"+
	                "<form id=theForm style=\"display:none;\" action=%a method=POST>" +
	                "User ID <input name=%a><br/>"+
	                "Password <input type=password name=%a><br/>"+
	                "<input type=submit value='Login'/>"+
	                "</form>",
	                msg,
	                ServerInfo.appTop(req)+"/"+LOGIN,
	                PARAM_UID,
	                PARAM_PASS
	        ));

		//}
		w.print("<ul>");
		for (ServletCartridge c:cs.getCartridges()) {
			if (c instanceof OAuthCartridge) {
				OAuthCartridge oc = (OAuthCartridge) c;
				w.print(Html.p("<li><a href=%a>%tを利用してログイン</a></li>",
						 oc.getOAuthStartURL(req), oc.getOAuthProviderName()));
			}
		}
		w.print("</ul>");
		w.print("</body></html>");
		return true;
	}

	public boolean login(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String uid=req.getParameter(PARAM_UID);
        String pass=req.getParameter(PARAM_PASS);
        Entity userEntity = auth.getUDB().getUserEntity(uid, false);
        //if ("tonyu-nigari".equals(pass) && userEntity!=null) {
        if (verifyPass(pass, EQ.$(userEntity))) {
            loginAs(req,resp, userEntity);
        } else {
        	loginForm(req, resp, "ユーザ名，パスワードが違います．");
        }
        return true;
    }
    public void loginAs(HttpServletRequest req,HttpServletResponse resp, Entity u)
            throws IOException {
        String currentUserId = EQ.$(u).attr(UserDB.KEY_LOCAL_USER_ID)+"";
        Log.n("auth", req, "Logged in as "+currentUserId);
        if (currentUserId.equals("root")) {
            auth.currentUser(u);
            checkHome(currentUserId);
        } else {
            auth.currentUser(auth.getUDB().getUserEntity("root", true) );
            checkHome(currentUserId);
            auth.currentUser(u);
        }
        resp.sendRedirect(onLoginURL.replaceAll("%u", auth.currentUserId())); // +"?user="+auth.currentUserId());
    }
    private void checkHome(String currentUserId) {
        GLSFile f=fs.get("/home/"+currentUserId+"/");
        f.mkdirs();
    }
    public static boolean verifyPass(String inputRawPass, EQ userEnt ) {
        Object passwd = userEnt.attr(KEY_PASSWD);
        if (passwd==null) return false;
        return passwd.equals( hashPass(inputRawPass));
    }
    public static String hashPass(String rawPass) {
        try {
            return MD5.crypt(rawPass);
        } catch (NoSuchAlgorithmException e) {
            // TODO 自動生成された catch ブロック
            e.printStackTrace();
            return null;
        }
    }

}
