package jp.tonyu.auth;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oauth.signpost.OAuthConsumer;
import oauth.signpost.OAuthProvider;
import oauth.signpost.basic.DefaultOAuthConsumer;
import oauth.signpost.basic.DefaultOAuthProvider;
import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;
import oauth.signpost.exception.OAuthNotAuthorizedException;
import oauth.signpost.http.HttpParameters;

import jp.tonyu.edit.EQ;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.OnMemorySession;
import jp.tonyu.util.Streams;

public class TwitterOAuthCartridge implements OAuthCartridge {

	private static final String START_OAUTH_TWITTER = "start-oauth-twitter";
	private static final String OAUTH_TWITTER = "oauth-twitter";
	private static final String CONSUMER_PROVIDER = "CP";
	private String client_id,client_secret;
	private Auth auth;
	private OAuthKeyDB okb;
    private void getKeyInfo() {
        EQ eq = okb.get("twitter", false);
        if (eq.isEmpty()) throw new RuntimeException("OAuth info for twitter not set");
        client_id=eq.attr(OAuthKeyDB.KEY_KEY)+"";
        client_secret=eq.attr(OAuthKeyDB.KEY_SECRET)+"";
    }
    private String getClientID() {
        if (client_id==null) getKeyInfo();
        return client_id;
    }
    private String getClientSecret() {
        if (client_secret==null) getKeyInfo();
        return client_secret;
    }
	public TwitterOAuthCartridge(Auth a, OAuthKeyDB okdb) {
		auth=a;
		okb=okdb;
        /*EQ k = okdb.get("twitter", false);
        if (CONSUMER_KEY.equals( k.attr(OAuthKeyDB.KEY_KEY))) {
            System.out.println("Twitter client_id verified");
        } else {
            System.out.println("Twitter client_id NOT verified");
        }
        if (CONSUMER_SECRET.equals( k.attr(OAuthKeyDB.KEY_SECRET))) {
            System.out.println("Twitter client_secret verified");
        } else {
            System.out.println("Twitter client_secret NOT verified");
        }*/
	}

	public String getRedirectURL(HttpServletRequest req) {
    	String url="http://"+req.getServerName();
        if (ServerInfo.isExe(req)) throw new RuntimeException("Login not allowed in tonyuexe");
    	if (req.getServerPort()!=80) url+=":"+req.getServerPort();
    	url+="/edit/"+OAUTH_TWITTER;
    	return url;
	}
	//static OnMemorySession<ConsumerProvider> ses=OnMemorySession.create(ConsumerProvider.class, 1000*1000);
	@Override
	public boolean get(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// TODO 自動生成されたメソッド・スタブ
		String u = req.getPathInfo();
		if (u==null) u="/";
		if (u.startsWith("/"+START_OAUTH_TWITTER)) {
			//String callbackUri = "http://tonyuedit.appspot.com/edit/oauth-twitter";
			ConsumerProvider cp=new ConsumerProvider();// req.getSession().getAttribute("CP");// .get(req);
			cp.provider = new DefaultOAuthProvider(
					"https://api.twitter.com/oauth/request_token",
					"https://api.twitter.com/oauth/access_token",
					"https://api.twitter.com/oauth/authorize");

			String callbackUri = getRedirectURL(req);// "http://localhost:8888/edit/"+OAUTH_TWITTER;
			cp.consumer = new DefaultOAuthConsumer(
					getClientID(),
					getClientSecret());
			req.getSession().setAttribute(CONSUMER_PROVIDER, cp);
			try {
				String authUrl = cp.provider.retrieveRequestToken(cp.consumer, callbackUri);
				resp.sendRedirect(authUrl);
			} catch (OAuthMessageSignerException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthNotAuthorizedException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthExpectationFailedException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthCommunicationException e) {
				e.printStackTrace();
				throw new IOException(e);
			}
			return true;
		}
		if (u.startsWith("/"+OAUTH_TWITTER)) {
			ConsumerProvider cp=(ConsumerProvider)req.getSession().getAttribute(CONSUMER_PROVIDER);

			String pin = req.getParameter("oauth_token");
			try {
				String oauth_verifier = req.getParameter("oauth_verifier");
				cp.provider.retrieveAccessToken(cp.consumer, oauth_verifier);
			    String accessToken = cp.consumer.getToken();
			    String tokenSecret = cp.consumer.getTokenSecret();

			    HttpParameters hp = cp.provider.getResponseParameters();
			    String user_id = hp.get("user_id").first();
			    String screen_name = hp.get("screen_name").first();
			    // 11450582/hoge1e3

			    auth.setOAuthInfo(getOAuthProviderName(), user_id, screen_name);
	            resp.sendRedirect(LoginCartridge.VERIFY_OAUTHED_USER);
	            //resp.getWriter().print(user_id+"/"+screen_name);
			} catch (OAuthMessageSignerException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthNotAuthorizedException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthExpectationFailedException e) {
				e.printStackTrace();
				throw new IOException(e);
			} catch (OAuthCommunicationException e) {
				e.printStackTrace();
				throw new IOException(e);
			}
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
		return "Twitter";
	}

	@Override
	public String getOAuthStartURL(HttpServletRequest req) {
		return START_OAUTH_TWITTER;
	}

}
