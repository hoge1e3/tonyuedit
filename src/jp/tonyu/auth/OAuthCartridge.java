package jp.tonyu.auth;

import javax.servlet.http.HttpServletRequest;

import jp.tonyu.servlet.ServletCartridge;

public interface OAuthCartridge extends ServletCartridge {
	public String getOAuthProviderName();
	public String getOAuthStartURL(HttpServletRequest req);
}
