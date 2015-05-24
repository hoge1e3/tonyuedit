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
    public static String exeTop(HttpServletRequest req) {
        return isLocal(req) ? tonyuexe_local : tonyuexe_server;
    }
    public static String editTop(HttpServletRequest req) {
        return isLocal(req) ? tonyuedit_local : tonyuedit_server;
    }
    public static String top(HttpServletRequest req) {
        return isExe(req) ? exeTop(req): editTop(req);
    }
    public static String appPath(HttpServletRequest req) {
        return "/"+(isExe(req)?"exe":"edit");
    }
    public static String appTop(HttpServletRequest req) {
        return top(req)+appPath(req);
    }
    public static String editAppTop(HttpServletRequest req) {
        return editTop(req)+"/"+"edit";
    }
    public static String exeAppTop(HttpServletRequest req) {
        return exeTop(req)+"/"+"exe";
    }

}
