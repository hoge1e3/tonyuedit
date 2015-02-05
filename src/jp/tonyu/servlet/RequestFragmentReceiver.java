package jp.tonyu.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Text;

import jp.tonyu.auth.Auth;
import jp.tonyu.cartridges.UploadClient;
import jp.tonyu.edit.EQ;

public class RequestFragmentReceiver implements ServletCartridge {
    private static final String SEND_FRAGMENT = "/sendFragment";
    private static final String RUN_FRAGMENTS = "/runFragments";
    ServletCartridge c;
    DatastoreService dss;
    public static final String PARAM_CHK=UploadClient.PARAM_CHK;
    Auth auth;
    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        return c.get(req, resp);
    }

    public RequestFragmentReceiver(Auth auth,DatastoreService dss, ServletCartridge c) {
        this.auth=auth;
        this.dss=dss;
        this.c = c;
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.startsWith(SEND_FRAGMENT)) {
            String redirectTo=req.getParameter("redirectTo");
            String id=req.getParameter("id");
            long seq=Long.parseLong(req.getParameter("seq"));
            long len=Long.parseLong(req.getParameter("len"));
            String content=req.getParameter("content");
            System.out.println("sendfrag Rediect to "+redirectTo);
            if (redirectTo!=null) {
                return sendFragmentRemote(req, resp, id, seq, len, content, redirectTo);
            } else {
                return sendFragmentLocal(resp, id, seq, len, content);
            }
        }
        if (u.startsWith(RUN_FRAGMENTS)) {
            String id=req.getParameter("id");
            return runFragmentsLocal(req, resp, id/*, user,chk*/);
        }
        return c.post(req, resp);
    }


    private boolean sendFragmentRemote(HttpServletRequest req, HttpServletResponse resp,
            String id, long seq, long len, String content, String redirectTo) throws IOException {
        URLConnection uc = openConnection(req, SEND_FRAGMENT);
        OutputStream os = uc.getOutputStream();

        String postStr =
                "id"+"="+URLEncoder.encode(id, "utf8")+"&"+
                "seq"+"="+URLEncoder.encode(seq+"", "utf8")+"&"+
                "len"+"="+URLEncoder.encode(len+"", "utf8")+"&"+
                "content"+"="+URLEncoder.encode(content, "utf8")
        ;
        PrintStream ps = new PrintStream(os);
        ps.print(postStr);
        ps.close();

        redirectResponse(resp, uc);
        return true;
    }

    public boolean sendFragmentLocal(HttpServletResponse resp,
            String id, long seq, long len, String content) throws IOException {
        EQ.$("<RequestFragment>").
        attr("id", id).
        attr("seq",seq).attr("len",len).attr("content",content)
        .putTo(dss);
        resp.getWriter().print("sent");
        return true;
    }

   /* private boolean runFragmentsRemote(HttpServletRequest req,
            HttpServletResponse resp, String id) throws IOException {
        URLConnection uc = openConnection(req, RUN_FRAGMENTS);
        OutputStream os = uc.getOutputStream();

        String user = auth.currentUserId();
        String postStr =
                "id"+"="+URLEncoder.encode(id, "utf8")+"&"+
                "user"+"="+URLEncoder.encode(user,"utf8")+"&"+
                PARAM_CHK+"="+URLEncoder.encode(UploadClient.sum(id+user), "utf8")
        ;
        PrintStream ps = new PrintStream(os);
        ps.print(postStr);
        ps.close();

        redirectResponse(resp, uc);
        return true;
    }*/
    public boolean runFragmentsLocal(HttpServletRequest req,
            HttpServletResponse resp, String id/*, String user, String chk*/)
            throws IOException {


        int len=-1,got=0;
        Iterable<Entity> it = EQ.$("RequestFragment").
                attr("id",id).
                asIterable(dss);
        for (Entity e: it) {
            len=((Number) EQ.$(e).attr("len")).intValue();
            got++;
        }
        if (len==got) {
            String []conts=new String[len];
            for (Entity e: it) {
                EQ eq=EQ.$(e);
                long i=(long) eq.attr("seq");
                Object contf = eq.attr("content");
                conts[(int)i]=contf+"";
            }
            String cont="";
            for (int i=0 ; i<len ; i++) {
                cont+=conts[i];
            }

            for (Entity e: it) {
                dss.delete(e.getKey());
            }
            /*System.out.println("RFRecv user="+user);
            if (user!=null) {
                String calcChk=UploadClient.sum(id+user);
                System.out.println("calcChk="+calcChk+"  chk="+chk);
                if (calcChk.equals(chk))  {
                    auth.su(user);
                }
            }*/

            return c.post(new ConcatenatedRequest(req,cont), resp);
        } else {
            String resps = "notCompleted:"+got+"/"+len;
            resp.getWriter().print(resps);
            return true;
        }
    }

    public URLConnection openConnection(HttpServletRequest req, String pathInfo)
            throws MalformedURLException, IOException {
        String serv=req.getServerName();
        if (ServerInfo.isExe(req)) throw new RuntimeException("not recursive request "+serv);
        String urlString=
                req.getServerName().indexOf("localhost")>=0 ?
                        ServerInfo.tonyuexe_local+"/exe"+pathInfo:
                        ServerInfo.tonyuexe_server+"/exe"+pathInfo;

        URL url = new URL(urlString);
        URLConnection uc = url.openConnection();
        uc.setDoOutput(true);
        return uc;
    }

    public void redirectResponse(HttpServletResponse resp, URLConnection uc)
            throws IOException, UnsupportedEncodingException {
        resp.setContentType("text/plain; charset=utf8");
        InputStream is = uc.getInputStream();
        ServletOutputStream os = resp.getOutputStream();
        byte[] b = new byte[1024];
        while (true) {
            int r = is.read(b);
            if (r <= 0) break;
            os.write(b, 0, r);
        }
        is.close();
        os.close();
    }


}
