package jp.tonyu.auth;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Map;

import jp.tonyu.edit.EQ;
import jp.tonyu.js.Wrappable;
import jp.tonyu.util.Streams;
import net.arnx.jsonic.JSON;
// https://developers.google.com/accounts/docs/OAuth2WebServer
public class GoogleOAuth implements Wrappable {
    public static String encode(String u) {
        try {
            return URLEncoder.encode(u, "utf-8");
        } catch (UnsupportedEncodingException e) {
            // TODO 自動生成された catch ブロック
            e.printStackTrace();
            return u;
        }
    }
    private OAuthKeyDB okb;
    private void getKeyInfo() {
        EQ eq = okb.get("google", false);
        if (eq.isEmpty()) throw new RuntimeException("OAuth info for google not set");
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
    public GoogleOAuth(OAuthKeyDB okb/*, String client_id, String client_secret*/) {
		super();
		this.okb=okb;
		this.token_uri = "https://accounts.google.com/o/oauth2/token";
		this.auth_uri = "https://accounts.google.com/o/oauth2/auth";  //auth_uri;
		//this.client_id = client_id;
		//this.client_secret = client_secret;
	}
    private String token_uri;
    private String auth_uri;
    private String client_id=null;
    private String client_secret=null;
    public String getAccessToken(String code, String redirect_uri) throws IOException {

    	URL u=new URL(token_uri);
    	URLConnection con = u.openConnection();
    	con.setConnectTimeout(20*1000);
    	con.setDoOutput(true);
    	PrintStream out = new PrintStream( con.getOutputStream());
    	out.print("code="+encode(code)+"&"+
    			"client_id="+encode(getClientID())+"&"+
    			"client_secret="+encode(getClientSecret())+"&"+
    			"redirect_uri="+encode(redirect_uri)+"&"+
    			"grant_type="+encode("authorization_code")
    			);

    	InputStream in = con.getInputStream();
    	String resStr= Streams.stream2str(in);
    	Map res=(Map)JSON.decode(resStr);
    	//System.out.println(resStr);
    	return res.get("access_token").toString();
/*
        HttpClient httpclient = new DefaultHttpClient();
		HttpPost httppost = new HttpPost(token_uri);
        final List <NameValuePair> params = new Vector <NameValuePair>();
        params.add(new BasicNameValuePair("code", code   ));
        params.add(new BasicNameValuePair("client_id",  client_id   ));
        params.add(new BasicNameValuePair("client_secret",  client_secret   ));
        params.add(new BasicNameValuePair("redirect_uri",  redirect_uri   ));
        params.add(new BasicNameValuePair("grant_type",  "authorization_code"   ));
        httppost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));
        HttpResponse response=httpclient.execute(httppost);

        HttpEntity resEntity = response.getEntity();
        String resStr=EntityUtils.toString(resEntity);
        EntityUtils.consume(resEntity);

        Map res=(Map)JSON.decode(resStr);

        //System.out.println(resStr);
        return res.get("access_token").toString();
        */
    }
    public Map getUserInfo(String accessToken) throws IOException {
    	URL u=new URL("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+encode(accessToken));
    	URLConnection con = u.openConnection();
    	con.setConnectTimeout(20*1000);
    	InputStream in = con.getInputStream();
    	String resStr= Streams.stream2str(in);
        return (Map)JSON.decode(resStr);
    	/*
        HttpClient httpclient = new DefaultHttpClient();
        HttpGet httpget = new HttpGet("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+encode(accessToken));
        HttpResponse response=httpclient.execute(httpget);

        HttpEntity resEntity = response.getEntity();
        String resStr=EntityUtils.toString(resEntity);
        EntityUtils.consume(resEntity);

        return (Map)JSON.decode(resStr);*/
    }
    public String authURI(String redirect_uri){
    	String scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    	return auth_uri+"?"+
                "scope="+encode(scope)+"&"+
                "state=%2Fprofile&"+
                "redirect_uri="+encode(redirect_uri)+"&"+
                "response_type=code&"+
                "client_id="+encode(getClientID())+"&"+
                "approval_prompt=force";
    }

}
