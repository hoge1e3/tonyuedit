package jp.tonyu.auth;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import jp.tonyu.edit.EQ;

import com.google.appengine.api.datastore.Entity;

public class Auth {
	private HttpSession session;
	UserDB db=new UserDB();
	static final String KEY_USER_ENTITY="current_user";
	//static final String KEY_OAUTH_PROVIDER="oauth_provider";
    //static final String KEY_OAUTHED_USER_ID="oauthed_user_id";
    static final String KEY_OAUTHED_USER_ENTITY="oauthed_user_entity";
    static final String KEY_RECOMMENDED_USER_ID = "recommended_user_id";
    static final String KEY_CSRF_TOKEN="csrfToken";
    public Auth(HttpSession session) {
		super();
		this.session = session;
	}
	public Entity currentUser() {
	    return (Entity)session.getAttribute(KEY_USER_ENTITY);
	}
	public void su(String lUserId) {
	    System.out.println(this+": su "+lUserId);
	    Entity e = db.getUserEntity(lUserId, true);
	    currentUser(e);
	}
	public void currentUser(Entity u) {
		session.setAttribute(KEY_USER_ENTITY, u);
	}
    public boolean isRoot() {
        return "root".equals(currentUserId());
    }
    public String currentUserId() {
        EQ e = EQ.$(currentUser());
        String res = (String)e.attr(UserDB.KEY_LOCAL_USER_ID);//+"";
        //System.out.println(this+": curUser "+res);
        return res;
    }
    public void setOAuthInfo(String oauthProvider, String oauthedUserId, String recommendedUserId) {
        Entity res=db.getUserEntity(oauthProvider, oauthedUserId, true);
        session.setAttribute(KEY_OAUTHED_USER_ENTITY, res);
        session.setAttribute(KEY_RECOMMENDED_USER_ID, recommendedUserId);

        //session.setAttribute(KEY_OAUTH_PROVIDER, provider);
        //session.setAttribute(KEY_OAUTHED_USER_ID,  oauthedUserId);
    }
    public String getRecommendedLocalUserId() {
        return session.getAttribute(KEY_RECOMMENDED_USER_ID)+"";
    }
    public Entity getOAuthedUserEntity() {
        /*String oauthProvider=session.getAttribute(KEY_OAUTH_PROVIDER)+"";
        String aUserId=session.getAttribute(KEY_OAUTHED_USER_ID)+"";
        if (oauthProvider==null || aUserId==null) return null;
        */
        Entity res=(Entity) session.getAttribute(KEY_OAUTHED_USER_ENTITY);
        /*if (res!=null) {
            if (oauthProvider.equals(res.getProperty(UserDB.KEY_OAUTH_PROVIDER )) &&
                aUserId.equals(res.getProperty(UserDB.KEY_OAUTHED_USER_ID))    ) {
                return res;
            }
        }
        res=db.getUserEntity(oauthProvider, aUserId, true);
        session.setAttribute(KEY_OAUTHED_USER_ENTITY, res);*/
        return res;
    }
    public void logout() {
        session.removeAttribute(KEY_USER_ENTITY);
    }
    static Pattern p=Pattern.compile("^[A-Za-z_0-9]+$");
    public static boolean isValidUserName(String u) {
        return p.matcher(u).matches();
    }
    public String csrfToken() {
        Object res=session.getAttribute(KEY_CSRF_TOKEN);
        if (res==null) {
            res=(Math.random()+"").replace(".", "");
            session.setAttribute(KEY_CSRF_TOKEN, res);
        }
        return res+"";
    }
    public void validateCsrfToken(HttpServletRequest req) {
        String t=req.getParameter(KEY_CSRF_TOKEN);
        if (csrfToken().equals(t)) return;
        System.out.println(csrfToken()+"!="+t);
        throw new RuntimeException("CSRF token does not match");
    }
    public UserDB getUDB() {
        return db;
    }
}
