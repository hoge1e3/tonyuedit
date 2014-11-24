package jp.tonyu.fs;

public class ContentType {
	public static String get(String u) {
		if (u.endsWith("html")) {
            return("text/html");
        }
        if (u.endsWith("css")) {
        	return("text/css");
        }
        if (u.endsWith("js")) {
        	return("text/javascript");
        }
        if (u.endsWith("png")) {
        	return("image/png");
        }
        if (u.endsWith("gif")) {
        	return("image/gif");
        }
        return null;
	}
}
