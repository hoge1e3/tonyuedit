package jp.tonyu.cartridges;

import java.io.IOException;
import java.util.Map;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.GoogleOAuth;
import jp.tonyu.auth.OAuthCartridge;
import jp.tonyu.auth.OAuthKeyDB;
import jp.tonyu.edit.EQ;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;

public class GoogleOAuthCartridge implements OAuthCartridge {
	private static final String START_OAUTH_GOOGLE = "start-oauth-google";
	private static final String OAUTH_GOOGLE = "oauth-google";

    GoogleOAuth g;// = new GoogleOAuth(client_id, client_secret);
	private Auth auth;
	OAuthKeyDB okdb;
	public GoogleOAuthCartridge(Auth a,OAuthKeyDB okdb) {
		auth=a;
		this.okdb=okdb;
		g= new GoogleOAuth(okdb);//, client_id, client_secret);
	}
	@Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
    		throws IOException {
    	String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/"+START_OAUTH_GOOGLE)) {
        	return start(req, resp);
        } else if (u.startsWith("/"+OAUTH_GOOGLE)) {
        	return done(req, resp);
        }
        return false;
    }
    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
    		throws IOException {
    	// TODO 自動生成されたメソッド・スタブ
    	return false;
    }
    public String getRedirectURL(HttpServletRequest req) {
    	//String url="http://"+req.getServerName();
    	if (ServerInfo.isExe(req)) throw new RuntimeException("Login not allowed in tonyuexe");
    	//if (req.getServerPort()!=80) url+=":"+req.getServerPort();
    	//url+="/edit/"+OAUTH_GOOGLE;
    	String url=ServerInfo.appTop(req)+"/"+OAUTH_GOOGLE;
    	return url;
	}
	public boolean start(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String redurl = getRedirectURL(req);
        System.out.println("Redirect redirect url "+redurl);
        String url=g.authURI(redurl);
        System.out.println("Redirect url "+url);
        resp.sendRedirect(url);
        return true;
    }
    public boolean done(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String code=req.getParameter("code");
        String token=g.getAccessToken(code, getRedirectURL(req));
        Map user=g.getUserInfo(token);
        //{id=109419721542738816344, email=hoge1e3@gmail.com, verified_email=true, name=hoge1e3, given_name=hoge1e3, family_name=., link=https://plus.google.com/109419721542738816344, picture=https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg, locale=ja}
        String userId=user.get("id")+"";
        String recUserName=user.get("name")+"";
        auth.setOAuthInfo(getOAuthProviderName(), userId, recUserName);
        resp.sendRedirect(ServerInfo.appTop(req)+"/"+LoginCartridge.VERIFY_OAUTHED_USER);
        return true;
    }
    @Override
	public String getOAuthProviderName() {
		return "Google";
	}
	@Override
	public String getOAuthStartURL(HttpServletRequest req) {
		return ServerInfo.appTop(req)+"/"+START_OAUTH_GOOGLE;
	}

}
