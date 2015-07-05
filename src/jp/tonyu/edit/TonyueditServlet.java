package jp.tonyu.edit;

import java.io.IOException;

import javax.print.attribute.standard.SheetCollate;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.OAuthKeyDB;
import jp.tonyu.auth.RequestSigner;
import jp.tonyu.cartridges.BlobCartridge;
import jp.tonyu.cartridges.GLSFileSync;
import jp.tonyu.cartridges.GoogleOAuthCartridge;
import jp.tonyu.cartridges.JSRunCartridge;
import jp.tonyu.cartridges.LoginCartridge;
import jp.tonyu.cartridges.ShellCartridge;
import jp.tonyu.cartridges.TwitterOAuthCartridge;
import jp.tonyu.cartridges.UDBCartridge;
import jp.tonyu.cartridges.UploadClient;
import jp.tonyu.debug.Log;
import jp.tonyu.fs.LSEmulator;
import jp.tonyu.fs.MemCache;
import jp.tonyu.fs.UserLSEmulator;
import jp.tonyu.js.JSRun;
import jp.tonyu.servlet.MultiServletCartridge;
import jp.tonyu.servlet.RequestFragmentReceiver;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;

@SuppressWarnings("serial")
public class TonyueditServlet extends HttpServlet {
	//private static final String KEY_CACHE = "memcache";
    //private static final String EXTRACTGIT = "extractGit";
	//static final String EXEC="exec";
	public ServletCartridge getCartridge(HttpServletRequest req) {
		Auth a=new Auth(req.getSession());
		//MemCache c=(MemCache)req.getSession().getAttribute(KEY_CACHE);
        //if (c==null) req.getSession().setAttribute(KEY_CACHE, c=new MemCache());
		MemCache cache=new MemCache();
		DatastoreService dss=DatastoreServiceFactory.getDatastoreService();
        LSEmulator localStorage=new UserLSEmulator(dss,cache,a);
        FS fs = new FS(localStorage);
        ServletContext servletContext = getServletContext();
        JSRun r=new JSRun(fs, servletContext);
        OAuthKeyDB okb = new OAuthKeyDB(dss);
        RequestSigner sgn= new RequestSigner(okb);
        GoogleOAuthCartridge gc=new GoogleOAuthCartridge(a,okb);
		TwitterOAuthCartridge tc=new TwitterOAuthCartridge(a,okb);
		LoginCartridge lc=new LoginCartridge(dss, a,okb, fs,
		        ServerInfo.top(req)+ "/html/build/notifyLoggedIn.html?user=%u&csrfToken="+a.csrfToken());
		lc.insert(gc);
		lc.insert(tc);
		GLSFileSync syn=new GLSFileSync(r);
		ShellCartridge sh=new ShellCartridge(r);
		MultiServletCartridge msc = new MultiServletCartridge(
		        new JSRunCartridge(r),syn,lc,sh,
		        new UDBCartridge(dss, a, false),
		        new UploadClient(a,sgn),
		        new BlobCartridge(a, dss, sgn, false));
        return new RequestFragmentReceiver(a,dss,msc);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
	    CountingEntityIterable.reset();
		System.out.println("TonyuEdtSrv - "+req.getPathInfo());
		ServletCartridge c = getCartridge(req);
		if (c.post(req, resp)) { report(req); return; }
		resp.getWriter().println("No operation - "+req.getPathInfo());
	}
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
        CountingEntityIterable.reset();
		System.out.println("TonyuEdtSrv get - "+req.getPathInfo());
		ServletCartridge c = getCartridge(req);
		if (c.get(req, resp)) { report(req); return; }
		resp.sendRedirect("/");
		return;
	}
	public void report(HttpServletRequest req) {
	    int count = CountingEntityIterable.getCount();
	    if (count>0) Log.n("db", req, "Read operations: "+count);
	}

}
