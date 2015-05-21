package jp.tonyu.js;

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


public class JSRun  {
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

    public FS getFs() {
        return fs;
    }
    public Scriptable getRoot() {
		return getJSSession().root;
	}
	public DatastoreService getDataStoreService() {
        return dss;
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
