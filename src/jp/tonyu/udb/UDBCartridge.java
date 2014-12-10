package jp.tonyu.udb;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;
import net.arnx.jsonic.JSONException;


import com.google.appengine.api.datastore.DatastoreService;

import jp.tonyu.auth.Auth;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;

public class UDBCartridge implements ServletCartridge {
    private DatastoreService dss;
    Auth auth;
    boolean isExe;

    public UDBCartridge(DatastoreService dss, Auth auth, boolean isExe) {
        super();
        this.auth=auth;
        this.dss = dss;
        this.isExe=isExe;
    }

    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        return false;
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.endsWith("/dbSelect")) {
            return dbSelect(req,resp);
        }
        if (u.endsWith("/dbInsert")) {
            return dbInsert(req,resp);
        }
        if (u.endsWith("/dbUpdate")) {
            return dbUpdate(req,resp);
        }
        if (u.endsWith("/dbDelete")) {
            return dbDelete(req,resp);
        }
        return false;
    }

    private boolean dbDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        UDB db=getUDB(req);
        Map<String, Object>[] records = getRecords(req);
        db.delete(records);
        resp.getWriter().print("OK");
        return true;
    }

    private boolean dbUpdate(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        UDB db=getUDB(req);
        Map<String, Object>[] records = getRecords(req);
        db.update(records);
        resp.getWriter().print("OK");
        return true;
    }

    private boolean dbInsert(HttpServletRequest req, HttpServletResponse resp) throws JSONException, IOException {
        UDB db=getUDB(req);
        Map<String, Object>[] records = getRecords(req);
        String kind=getKind(req);
        List<Long> res = db.insert(kind, records);
        resp.setContentType("text/json; charset=utf8");
        resp.getWriter().print(JSON.encode(res));
        return true;
    }

    private boolean dbSelect(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        UDB db = getUDB(req);
        String kind = getKind(req);
        Map<String,Object> where=getWhere(req);

        Vector<Map<String, Object>> res = db.select(kind, where);
        for (int i=0 ;i<res.size() ;i++) {
            res.set(i, obj2json(res.get(i))  );
        }
        resp.setContentType("text/json; charset=utf8");
        resp.getWriter().print(JSON.encode(res));
        return true;
    }

    public Map<String, Object> getWhere(HttpServletRequest req) {
        return (Map<String,Object>)JSON.decode(req.getParameter("where"));
    }

    public Map<String, Object>[] getRecords(HttpServletRequest req) {
        Object decode = JSON.decode(req.getParameter("records"));
        if (decode instanceof List) {
            List<Map<String, Object>> resl = (List) decode;
            resl = (List<Map<String,Object>>)decode;
            Map<String, Object>[] res=new Map[resl.size()];
            for (int i=0 ;i<res.length; i++) {
                res[i]=json2obj(resl.get(i));
            }
            return res;
        } else {
            return new Map[]{  json2obj((Map)decode) };
        }
    }

    public String getKind(HttpServletRequest req) {
        String kind=req.getParameter("kind");
        return kind;
    }

    public UDB getUDB(HttpServletRequest req) {
        if (isExe) {
            String appAuthID=req.getParameter("appAuthID");
            AppAuth appAuth=AppAuth.get(dss, appAuthID);
            UDB db=new UDB(dss, appAuth);
            return db;
        } else {
            String project=req.getParameter("project");
            AppAuth appAuth=AppAuth.get(auth,project);
            UDB db=new UDB(dss, appAuth);
            return db;
        }
    }
    public static Map<String,Object> obj2json(Map<String,Object> obj) {
        Map<String, Object> res=new HashMap<String,Object>();
        for (String key:obj.keySet()) {
            Object value=obj.get(key);
            if (value instanceof Date) {
                Date d = (Date) value;
                UDB.annotateType(res, key, "date" );
                res.put(key, d.getTime());
            } else {
                res.put(key, value);
            }
        }
        return res;
    }
    public static Map<String,Object> json2obj(Map<String,Object> json) {
        //  type:"date" =>  long  -> Date
        Map<String, Object> res=new HashMap<String,Object>();

        for (String key:json.keySet()) {
            if (UDB.KEY_TYPEMAP.equals(key)) continue;
            Object value=json.get(key);
            String type = UDB.annotateType(json, key);
            if (value instanceof Number && "date".equals(type)) {
                Number l = (Number) value;
                res.put(key, new Date(l.longValue()));
            } else {
                res.put(key, value);
            }
        }
        return res;
    }
}
