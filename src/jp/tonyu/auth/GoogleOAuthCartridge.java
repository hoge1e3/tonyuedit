package jp.tonyu.auth;

import java.io.IOException;
import java.util.Map;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

		/*EQ k = okdb.get("google", false);
		if (client_id.equals( k.attr(OAuthKeyDB.KEY_KEY))) {
		    System.out.println("Google client_id verified");
		} else {
            System.out.println("Google client_id NOT verified");
		}
        if (client_secret.equals( k.attr(OAuthKeyDB.KEY_SECRET))) {
            System.out.println("Google client_secret verified");
        } else {
            System.out.println("Google client_secret NOT verified");
        }*/
	}
	public String getRedirectURL(HttpServletRequest req) {
    	String url="http://"+req.getServerName();
    	if (ServerInfo.isExe(req)) throw new RuntimeException("Login not allowed in tonyuexe");
    	if (req.getServerPort()!=80) url+=":"+req.getServerPort();
    	url+="/edit/"+OAUTH_GOOGLE;
    	return url;
	}
	@Override
	public boolean get(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/"+START_OAUTH_GOOGLE)) {
        	String redurl = getRedirectURL(req);
        	System.out.println("Redirect redirect url "+redurl);
			String url=g.authURI(redurl);
        	System.out.println("Redirect url "+url);
        	resp.sendRedirect(url);
        	return true;
        }
        if (u.startsWith("/"+OAUTH_GOOGLE)) {
        	String code=req.getParameter("code");
        	String token=g.getAccessToken(code, getRedirectURL(req));
        	Map user=g.getUserInfo(token);
        	//{id=109419721542738816344, email=hoge1e3@gmail.com, verified_email=true, name=hoge1e3, given_name=hoge1e3, family_name=., link=https://plus.google.com/109419721542738816344, picture=https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg, locale=ja}
        	String userId=user.get("id")+"";
        	String recUserName=user.get("name")+"";
        	auth.setOAuthInfo(getOAuthProviderName(), userId, recUserName);
        	resp.sendRedirect(LoginCartridge.VERIFY_OAUTHED_USER);
        	return true;
        }
        return false;
	}

	@Override
	public boolean post(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// TODO 自動生成されたメソッド・スタブ
		return false;
	}
	@Override
	public String getOAuthProviderName() {
		return "Google";
	}
	@Override
	public String getOAuthStartURL(HttpServletRequest req) {
		return START_OAUTH_GOOGLE;
	}

}
