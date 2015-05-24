package jp.tonyu.cartridges;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import jp.tonyu.edit.FS;
import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.ContextHolder;
import jp.tonyu.js.JSRun;
import jp.tonyu.js.SafeJSSession;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Html;

public class JSRunCartridge implements ServletCartridge{
    public static final String PATH_DIRECT_MODE = "directMode";
    private static final String KEY_PROG = "prog";
    private static final String KEY_LS = "ls";
    public static final String PATH_EXEC = "exec";
    JSRun run;
    public JSRunCartridge(JSRun run) {
        this.run=run;
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
                getFS().get(ls).text(prog);
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
            prog=getFS().get(ls).text();
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

                ServerInfo.appTop(req)+"/"+PATH_DIRECT_MODE,
                KEY_LS,ls,

                KEY_PROG,prog,
                res+""
        ));
    }

    private FS getFS() {
        return run.getFs();
    }
    public void exec(String path, final HttpServletRequest req, final HttpServletResponse res) throws IOException {
        String s=getFS().get(path).text();
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
    private Scriptable getRoot() {
        return run.getRoot();
    }
    private SafeJSSession getJSSession() {
        return run.getJSSession();
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
}
