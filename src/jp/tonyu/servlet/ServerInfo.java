package jp.tonyu.servlet;

import javax.servlet.http.HttpServletRequest;

public class ServerInfo {
    public static final String tonyuedit_local="http://localhost:8888";
    public static final String tonyuexe_local="http://localhost:8887";
    public static final String tonyuedit_server="http://tonyuedit.appspot.com";
    public static final String tonyuexe_server="http://tonyuexe.appspot.com";
    public static boolean isExe(HttpServletRequest req) {
        return isLocal(req) && req.getServerPort()==8887 ||
                req.getServerName().indexOf("tonyuexe")>=0 ;
    }
    public static boolean isLocal(HttpServletRequest req) {
        return req.getServerName().indexOf("localhost")>=0;
    }
    public static String exeURL(HttpServletRequest req) {
        return isLocal(req) ? tonyuexe_local : tonyuexe_server;
    }
}
