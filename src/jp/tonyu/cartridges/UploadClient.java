package jp.tonyu.cartridges;

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
import java.security.NoSuchAlgorithmException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.RequestSigner;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.MD5;
import jp.tonyu.util.Streams;

public class UploadClient implements ServletCartridge {
    public static final String URL_PRJ_INFO = "get-project-info";
    public static final String URL_UPLOAD_PRJ = "upload-project";
    public static final String PARAM_PRJ = "project";
    public static final String PARAM_PRG = "prog";
    public static final String PARAM_USR = "user";
    public static final String PARAM_CHK = "chksum";
    public static final String PARAM_TITLE = "title";
    public static final String PARAM_DESC = "description";
    public static final String PARAM_THUMB = "thumbnail";

    public static final String KIND_PRJINFO = "ProjectInfo";
    public static final String KEY_USER = "user";
    public static final String KEY_PRJ_NAME = "project";
    public static final String KEY_PRJ_TITLE = "title";
    public static final String KEY_PRJ_DESC = "description";
    public static final String KEY_PUBLIST = "publishToList";
    public static final String KEY_ALLOW_FORK = "allowFork";
    public static final String KEY_LICENSE = "license";
    Auth auth;
    private RequestSigner sgn;
    public UploadClient(Auth a,RequestSigner sgn) {
        auth=a;
        this.sgn=sgn;
    }

    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.startsWith("/"+URL_PRJ_INFO)) {
            return prjInfo(req, resp);
        }
        return false;
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.startsWith("/"+URL_UPLOAD_PRJ)) {
            return upload(req, resp);
        }
        return false;
    }

    private boolean prjInfo(HttpServletRequest req, HttpServletResponse resp) throws MalformedURLException, IOException,
    UnsupportedEncodingException{
        String prj=req.getParameter(PARAM_PRJ);

        String urlString=getExeServerURL(req, URL_PRJ_INFO);
        String user = auth.currentUserId()+"";
        String postStr =
                PARAM_PRJ+"="+URLEncoder.encode(prj, "utf8")+"&"+
                        PARAM_USR+"="+URLEncoder.encode(user,"utf8")+"&"+
                        PARAM_CHK+"="+URLEncoder.encode(sgn.sum(user+prj), "utf8")
                        ;
        URL url = new URL(urlString+"?"+postStr);
        URLConnection uc = url.openConnection();
        resp.setContentType("text/plain; charset=utf8");

        InputStream is = uc.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(is,"utf8") );
        String s;
        PrintWriter w = resp.getWriter();
        while ((s = reader.readLine()) != null) {
            w.println(s);
        }
        reader.close();
        return true;
    }


    public static String getExeServerURL(HttpServletRequest req, String cmd) {
        return req.getServerName().indexOf("localhost")>=0 ?
                ServerInfo.tonyuexe_local+"/exe/"+cmd:
                ServerInfo.tonyuexe_server+"/exe/"+cmd;
    }

    public boolean upload(HttpServletRequest req, HttpServletResponse resp)
            throws MalformedURLException, IOException,
            UnsupportedEncodingException {
        auth.validateCsrfToken(req);

        String prj=req.getParameter(PARAM_PRJ);
        String prg=req.getParameter(PARAM_PRG);
        String title=req.getParameter(PARAM_TITLE);
        String desc=req.getParameter(PARAM_DESC);
        String thumb=req.getParameter(PARAM_THUMB);
        String license=req.getParameter(KEY_LICENSE);
        boolean allowFork="true".equals(req.getParameter(KEY_ALLOW_FORK));
        boolean pubList="true".equals(req.getParameter(KEY_PUBLIST));
        String urlString=getExeServerURL(req, URL_UPLOAD_PRJ);
        URL url = new URL(urlString);
        URLConnection uc = url.openConnection();
        uc.setDoOutput(true);
        OutputStream os = uc.getOutputStream();

        String user = auth.currentUserId();
        if(user==null) {
            throw new RuntimeException("Login Required");
        }
        String postStr =
                PARAM_PRJ+"="+URLEncoder.encode(prj, "utf8")+"&"+
                PARAM_USR+"="+URLEncoder.encode(user,"utf8")+"&"+
                PARAM_PRG+"="+URLEncoder.encode(prg, "utf8")+"&"+
                PARAM_TITLE+"="+URLEncoder.encode(title, "utf8")+"&"+
                PARAM_DESC+"="+URLEncoder.encode(desc, "utf8")+"&"+
                (thumb!=null? PARAM_THUMB+"="+URLEncoder.encode(thumb, "utf8")+"&":"")+
                KEY_LICENSE+"="+URLEncoder.encode(license, "utf8")+"&"+
                KEY_ALLOW_FORK+"="+allowFork+"&"+
                KEY_PUBLIST+"="+pubList+"&"+
                PARAM_CHK+"="+URLEncoder.encode(sgn.sum(user+prj+prg+title+desc+license+allowFork+pubList), "utf8")
        ;
        PrintStream ps = new PrintStream(os);
        ps.print(postStr);
        ps.close();
        resp.setContentType("text/html; charset=utf8");

        InputStream in = uc.getInputStream();
        ServletOutputStream out = resp.getOutputStream();
        Streams.redirect(in, out);
        in.close();
        out.close();
        return true;
    }


}
