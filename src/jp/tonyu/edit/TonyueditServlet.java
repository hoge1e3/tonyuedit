package jp.tonyu.edit;

import java.io.IOException;

import javax.print.attribute.standard.SheetCollate;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.GoogleOAuthCartridge;
import jp.tonyu.auth.LoginCartridge;
import jp.tonyu.auth.OAuthKeyDB;
import jp.tonyu.auth.RequestSigner;
import jp.tonyu.auth.TwitterOAuthCartridge;
import jp.tonyu.blob.BlobCartridge;
import jp.tonyu.debug.Log;
import jp.tonyu.fs.GLSFileSync;
import jp.tonyu.fs.MemCache;
import jp.tonyu.fs.Shell;
import jp.tonyu.servlet.MultiServletCartridge;
import jp.tonyu.servlet.RequestFragmentReceiver;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.udb.UDBCartridge;

@SuppressWarnings("serial")
public class TonyueditServlet extends HttpServlet {
	//private static final String KEY_CACHE = "memcache";
    //private static final String EXTRACTGIT = "extractGit";
	//static final String EXEC="exec";
	public ServletCartridge getCartridge(HttpServletRequest req) {
		Auth a=new Auth(req.getSession());
		//MemCache c=(MemCache)req.getSession().getAttribute(KEY_CACHE);
        //if (c==null) req.getSession().setAttribute(KEY_CACHE, c=new MemCache());
		MemCache c=new MemCache();
		ServletContext servletContext = getServletContext();
        JSRun r=new JSRun(c,  a, servletContext);
        DatastoreService dss=r.dss;
        OAuthKeyDB okb = new OAuthKeyDB(dss);
        RequestSigner sgn= new RequestSigner(okb);
        GoogleOAuthCartridge gc=new GoogleOAuthCartridge(a,okb);
		TwitterOAuthCartridge tc=new TwitterOAuthCartridge(a,okb);
		LoginCartridge lc=new LoginCartridge(dss, a,okb, r.getFs(), "../html/build/notifyLoggedIn.html?user=%u&csrfToken="+a.csrfToken());
		lc.insert(gc);
		lc.insert(tc);
		GLSFileSync syn=new GLSFileSync(r);
		Shell sh=new Shell(r);
		MultiServletCartridge msc = new MultiServletCartridge(
		        r,syn,lc,sh,new DocumentCartridge(r.getFs()),
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
