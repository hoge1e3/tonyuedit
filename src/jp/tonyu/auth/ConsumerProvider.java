package jp.tonyu.auth;

import java.io.Serializable;

import oauth.signpost.OAuthConsumer;
import oauth.signpost.OAuthProvider;

public class ConsumerProvider implements Serializable {
	private static final long serialVersionUID = -987748888777845279L;
	public OAuthConsumer consumer;
	public OAuthProvider provider;
}
