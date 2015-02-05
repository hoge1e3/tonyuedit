package jp.tonyu.cartridges;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.tonyu.auth.Auth;
import jp.tonyu.edit.Console;
import jp.tonyu.edit.FS;
import jp.tonyu.fs.LSEmulator;
import jp.tonyu.fs.MemCache;
import jp.tonyu.fs.UserLSEmulator;
import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.ContextHolder;
import jp.tonyu.js.JSONWrapper;
import jp.tonyu.js.SafeJSSession;
import jp.tonyu.servlet.NodeJSRequest;
import jp.tonyu.servlet.NodeJSResponse;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Html;
import jp.tonyu.util.Streams;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Transaction;


public class JSRun implements ServletCartridge {
	public static final String PATH_DIRECT_MODE = "directMode";
	private static final String KEY_PROG = "prog";
	private static final String KEY_LS = "ls";
	public static final String PATH_EXEC = "exec";
	Scriptable root;
	private SafeJSSession jsSession;
	private JSONWrapper json;
	ServletContext sctx;
	DatastoreService dss;
	FS fs;
	Auth auth;
	public JSRun(MemCache cache, Auth a, ServletContext sctx) {
		auth=a;
		setJSSession(new SafeJSSession());
		dss=DatastoreServiceFactory.getDatastoreService();
		LSEmulator localStorage=new UserLSEmulator(dss,cache,a);
		//getSession().putToRoot("localStorage", localStorage);
		fs = new FS(localStorage);
		//getJSSession().putToRoot("Auth", auth); //Auth.userName("root");
		getJSSession().putToRoot("FS", fs);
		getJSSession().putToRoot("JSON", json=new JSONWrapper(getJSSession()));
		getJSSession().putToRoot("console", new Console());
	}
    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/"+PATH_DIRECT_MODE)) {
        	direct(req,resp);
        	return true;
        }
        if (u.startsWith("/"+PATH_EXEC)) {
        	exec(u.substring(PATH_EXEC.length()+1), req,resp);
        	return true;
        }
    	return false;
    }
    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    	String u = req.getPathInfo();
        if (u==null) u="/";
        if (u.startsWith("/"+PATH_DIRECT_MODE)) {
        	direct(req,resp);
        	return true;
        }
    	return false;
    }
    public FS getFs() {
        return fs;
    }
    public Scriptable getRoot() {
		return getJSSession().root;
	}
	public DatastoreService getDataStoreService() {
        return dss;
    }
    public void direct(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String prog=req.getParameter(KEY_PROG);
		if (prog==null) prog="";
		String ls=req.getParameter(KEY_LS);
		if (ls==null) ls="";
		String action=req.getParameter("action");
		Object res="";
		//JSRun instance = getInstance(req);
		if ("Run".equals(action)) {
			if (ls.length()>0) {
				fs.get(ls).text(prog);
				//localStorage.setItem(ls, prog);
			}
			if (prog.length()>0) {
				try {
					res=getJSSession().eval("Run_"+ls, prog); //, getRoot());
				}catch(Exception e) {
					res=e.getMessage();
				}
			}
		} else if (ls.length()>0){
			prog=fs.get(ls).text();
		}
		resp.setContentType("text/html; charset=utf8");
		resp.getWriter().print(
			Html.p("<html><body>"+
				"<form action=%a method=POST>" +
				"localStorage path:<input name=%a value=%a/>" +
				"<input type=submit name='action' value='Load'/><br/>"+
				"<textarea name=%a rows=12 cols=80>%t</textarea><br/>"+
				"<input type=submit name='action' value='Run'/>"+
				"</form>"+
				"res=%t"+
				"</body></html>"+
				""
				,

				PATH_DIRECT_MODE,
				KEY_LS,ls,

				KEY_PROG,prog,
				res+""
		));
	}
    public Scriptable params(HttpServletRequest req) {
		ScriptableObject res=new BlankScriptableObject();
    	@SuppressWarnings("unchecked")
		Map<String,Object> m=req.getParameterMap();
		for (String k:m.keySet()) {
			Object vo=m.get(k);
			if (vo instanceof String[]) {
				String[] str = (String[]) vo;
				String val= str[0];
				ScriptableObject.putProperty(res, k, val);
			}
		}
		return res;
	}

	public void exec(String path, final HttpServletRequest req, final HttpServletResponse res) throws IOException {
		String s=fs.get(path).text();
		if (s==null) {
			res.getWriter().println(path+" not found");
			res.sendError(404);
		}
		final Object r=getJSSession().eval(path, s, getRoot());
		if (r instanceof Function) {
			 ContextHolder h=SafeJSSession.newContextHolder();
			 Context cx=h.get();
			 try {
				 Function klass = (Function) r;
				 Scriptable obj=(Scriptable)klass.construct(cx, getRoot(), new Object[]{params(req)});
				 Function main=(Function)ScriptableObject.getProperty(obj, "main");
				 Object re=main.call(cx, getRoot(), obj, new Object[]{params(req)});
				 res.setContentType("text/plain; charset=utf8");
				 res.getWriter().print(re);
				 return;
			 } finally {
				 h.release();
			 }
		}
		throw new IOException(r+" is not a Class");
	}
	public Object procHttpFunc(Function f, HttpServletRequest req, HttpServletResponse resp) {
	    //Transaction transaction = dss.beginTransaction();
		try {
			return getJSSession().call(f,
        		new Object[]{new NodeJSRequest(req),new NodeJSResponse(resp, getJSONWrapper())});
		} finally {
            /*if(transaction.isActive()){
                transaction.rollback();
            }*/
		}
	}
	public Object eval(String name,String js) {
		return getJSSession().eval(name,js, getRoot());

	}
	public Object eval(String js) {
		return getJSSession().eval("eval",js, getRoot());

	}
	public SafeJSSession getJSSession() {
		return jsSession;
	}
	public void setJSSession(SafeJSSession jsSession) {
		this.jsSession = jsSession;
	}
	public JSONWrapper getJSONWrapper() {
		return json;
	}
    public Object call(Function f, Object[] args) {
        return getJSSession().call(f,args);
    }

    public Object requireResource(String path) throws IOException {
        return eval(
                path, Streams.stream2str(sctx.getResourceAsStream(path))
        );
    }

}
