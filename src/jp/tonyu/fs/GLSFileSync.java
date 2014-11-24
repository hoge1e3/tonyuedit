package jp.tonyu.fs;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import jp.tonyu.edit.JSRun;
import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.ContextHolder;
import jp.tonyu.js.SafeJSSession;
import jp.tonyu.servlet.NodeJSRequest;
import jp.tonyu.servlet.NodeJSResponse;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Html;
import jp.tonyu.util.Resource;

public class GLSFileSync implements ServletCartridge {
	public GLSFileSync(JSRun r) {
		jsRun=r;
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

	@Override
	public boolean get(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String u = req.getPathInfo();
        if (u==null) u="/";
		//app.get('/getDirInfo', LSFile.getDirInfo);
        if (u.startsWith("/getDirInfo")) {
            resp.setContentType("text/json; charset=utf8");
            Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"getDirInfo");
            getJSRun().procHttpFunc(f, req, resp);
            return true;
        }
        if (u.startsWith("/File2LSSync")) {
            return file2LSSync(req, resp);
        }
        if (u.startsWith("/LS2FileSyncForm")) {
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
    				"LS2FileSync",
    				"base","/",
    				"data",""
    		));
        	return true;
        }
        if (u.startsWith("/rmall")) {
        	String k=req.getParameter("key");
        	if (LSEmulator.removeAll(k)) {
        		resp.getWriter().println("rmall done");
        	} else {
        		resp.getWriter().println(LSEmulator.key);
        	}
        	return true;
        }
		return false;
	}

	private boolean file2LSSync(HttpServletRequest req, HttpServletResponse resp) {
		resp.setContentType("text/json; charset=utf8");
		Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"File2LSSync");
		getJSRun().procHttpFunc(f, req, resp);
		return true;
	}

	@Override
	public boolean post(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		//app.post('/File2LSSync', LSFile.File2LSSync);
		//app.post('/LS2FileSync', LSFile.LS2FileSync);
		String u = req.getPathInfo();
        if (u==null) u="/";
		System.out.println("GLSFileSync POST - "+u);
        if (u.startsWith("/LS2FileSync")) {
            Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"LS2FileSync");
            getJSRun().procHttpFunc(f, req, resp);
            return true;
        }
        if (u.startsWith("/File2LSSync")) {
            return file2LSSync(req, resp);
        }
        if (u.startsWith("/testSync")) {
            String a=req.getParameter("a");
            String b=req.getParameter("b");

            String resps = "Succ  a="+a+"  b="+b;
            System.out.println("resps="+resps);
            resp.getWriter().print(resps);
            return true;
        }
		return false;
	}

}
