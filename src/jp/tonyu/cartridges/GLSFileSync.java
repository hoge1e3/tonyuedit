package jp.tonyu.cartridges;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.ContextHolder;
import jp.tonyu.js.JSRun;
import jp.tonyu.js.SafeJSSession;
import jp.tonyu.servlet.NodeJSRequest;
import jp.tonyu.servlet.NodeJSResponse;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Html;
import jp.tonyu.util.Resource;

public class GLSFileSync implements ServletCartridge {
	public GLSFileSync(JSRun r) {
		jsRun=r;
	}

	@Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
    		throws IOException {
    	String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/getDirInfo")) {
            return getDirInfo(req, resp);
        } else if (u.startsWith("/File2LSSync")) {
            return file2LSSync(req, resp);
        } else if (u.startsWith("/LS2FileSyncForm")) {
        	return lS2FileSyncForm(req, resp);
        }
    	return false;
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
    		throws IOException {
    	String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/LS2FileSync")) {
            return ls2FileSync(req, resp);
        } else if (u.startsWith("/File2LSSync")) {
            return file2LSSync(req, resp);
        }
    	return false;
    }

    public boolean ls2FileSync(HttpServletRequest req, HttpServletResponse resp) {
        Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"LS2FileSync");
        getJSRun().procHttpFunc(f, req, resp);
        return true;
    }

    public boolean lS2FileSyncForm(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html; charset=utf8");
        resp.getWriter().print(Html.p("<html><body>"+
        		"<form action=%a method=POST>" +
        		"base:<input name=%a value=%a/>" +
        		"data:<BR/><textarea name=%a rows=12 cols=80>%t</textarea><br/>"+
        		"<input type=submit name='action' value='Upload'/>"+
        		"</form>"+
        		"</body></html>"+
        		""
        		,
        		ServerInfo.appURL(req)+"/LS2FileSync",
        		"base","/",
        		"data",""
        ));
        return true;
    }

    private boolean file2LSSync(HttpServletRequest req, HttpServletResponse resp) {
    	resp.setContentType("text/json; charset=utf8");
    	Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"File2LSSync");
    	getJSRun().procHttpFunc(f, req, resp);
    	return true;
    }

    public boolean getDirInfo(HttpServletRequest req, HttpServletResponse resp) {
        resp.setContentType("text/json; charset=utf8");
        Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"getDirInfo");
        getJSRun().procHttpFunc(f, req, resp);
        return true;
    }

    public static String js() {
		return Resource.text(GLSFileSync.class, ".js");
	}
	final JSRun jsRun;
	Scriptable jsObj;
	public Scriptable getJSObj() {
		if (jsObj!=null) return jsObj;
		return jsObj=(Scriptable)getJSRun().eval("GLSFileSync.js",js());
	}

	private JSRun getJSRun() {
		return jsRun;
	}

}
