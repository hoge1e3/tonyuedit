package jp.tonyu.fs;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import net.arnx.jsonic.JSON;

import jp.tonyu.edit.JSRun;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.Resource;

public class Shell implements ServletCartridge {
    final JSRun jsRun;
    public Shell(JSRun jsRun) {
        this.jsRun = jsRun;
    }

    Scriptable jsObj;
    public String js() {
        return Resource.text(getClass(), ".js");
    }
    public Scriptable getJSObj() {
        if (jsObj!=null) return jsObj;
        return jsObj=(Scriptable)jsRun.eval("Shell.js",js());
    }
    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.startsWith("/rsh")) {
            String argss=req.getParameter("args");
            //Object args=jsRun.getJSONWrapper().parse(argss);// JSON.decode(argss);
            Function f=(Function)ScriptableObject.getProperty(getJSObj() ,"cmdLine");
            //Object res=jsRun.call(f, new Object[]{ args } );
            Object res=jsRun.call(f, new Object[]{ argss} );
            resp.getWriter().print(res);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        // TODO 自動生成されたメソッド・スタブ
        return false;
    }

}
