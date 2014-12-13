package jp.tonyu.udb;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import net.arnx.jsonic.JSON;

import jp.tonyu.edit.EQ;
import jp.tonyu.util.MD5;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;

import static jp.tonyu.edit.EQ.$;
public class UDB {
    public static final String KEY_TYPEMAP = "__typeMap";

    private static final String KEY_KIND = "_kind";
    private static final String KEY_ID = "_id";
    private static final String SEP = "/+*/-_\\";
    DatastoreService dss;
    AppAuth appAuth;
    public UDB(DatastoreService dss, AppAuth appAuth) {
        super();
        this.dss = dss;
        this.appAuth = appAuth;
    }
    public Vector<Map<String,Object>> select(String kind, Map<String,Object> where) {
        String orgKind=kind;
        kind=genKind(kind);
        EQ e=$(kind);
        int limit=-1;
        for (String key:where.keySet()) {
            Object value=where.get(key);
            if ("$order".equals(key)) {
                Map<String,Number> ords=(Map<String,Number>) value;
                for (String sk:ords.keySet()) {
                    Number dir=ords.get(sk);
                    e.sort(sk, dir.doubleValue()<0);
                }
            } else if ("$limit".equals(key)) {
                limit=((Number)value).intValue();
            } else {
                e.attr(key, value );
            }
        }
        Vector<Map<String,Object>> res=new Vector<Map<String,Object>>();
        for (Entity re:e.asIterable(dss)) {
            Map<String, Object> prop = re.getProperties();
            Map<String, Object> dst= new HashMap<String, Object>(prop);
            dst=entity2obj(dst);
            dst.put(KEY_ID, re.getKey().getId());
            dst.put(KEY_KIND, orgKind);
            res.add(dst);
        }
        return res;
    }
    private String genKind(String kind) {
        String raw="_"+appAuth.user+"_"+appAuth.project+"_"+kind;
        String seed=appAuth.user+SEP+appAuth.project+SEP+kind;
        try {
            return "udb_"+MD5.crypt(seed).substring(0, 8)+raw;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<Long> insert(String kind, Map<String,Object>... records) {
        kind=genKind(kind);
        List<Long> res=new Vector<Long>();
        for (Map<String,Object> record:records) {
            record=obj2entity(record);
            EQ nr = EQ.$new(kind);
            nr.getFrom(record);
            nr.putTo(dss);
            System.out.println("INS:"+nr.get().getKey());
            res.add(nr.get().getKey().getId());
        }
        return res;
    }
    public void update(Map<String,Object>... records) {
        for (Map<String,Object> record:records) {
            record=obj2entity(record);
            Key key=extractKey(record);
            try {
                EQ e=$(dss.get(key));
                e.getFrom(record);
                e.putTo(dss);
            } catch (EntityNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
    private Key extractKey(Map<String, Object> record) {
        long id=((Number)record.remove(KEY_ID)).longValue();
        String kind=""+record.remove(KEY_KIND);
        return KeyFactory.createKey(genKind(kind), id);
    }
    public void delete(Map<String,Object>... records) {
        for (Map<String,Object> record:records) {
            Key key=extractKey(record);
            System.out.println("Delete key:"+key);
            /*try {
                Entity entity = dss.get(key);
            } catch (EntityNotFoundException e) {
                System.out.println(e.getMessage());//e.printStackTrace();
            }*/

            dss.delete(key);
        }
    }
    public void retain(String key, Map<String,Object> where) {
        //kind=genKind(kind);

    }
    private static Object str2text(String str) {
        if (str.length()<500) return str;
        return new Text(str);
    }
    public static  Map<String, Object> obj2entity(Map<String, Object> obj) {
        Map<String, Object> res=new HashMap<String,Object>();
        for (String key:obj.keySet()) {
            Object value=obj.get(key);
            if (value instanceof Map || value instanceof List) {
                annotateType(res, key,"obj");
                res.put(key, str2text(JSON.encode(value)) );
            } else {
                res.put(key, value);
            }
        }
        if (res.containsKey(KEY_TYPEMAP)) {
            res.put(KEY_TYPEMAP, JSON.encode(res.get(KEY_TYPEMAP)));
        }
        return res;
    }
    public static  Map<String, Object> entity2obj(Map<String, Object> e) {
        Map<String, Object> res=new HashMap<String,Object>();
        if (e.containsKey(KEY_TYPEMAP)) {
            e.put(KEY_TYPEMAP, JSON.decode(e.get(KEY_TYPEMAP)+""));
        }
        for (String key:e.keySet()) {
            if (KEY_TYPEMAP.equals(key)) continue;
            Object value=e.get(key);
            String type=annotateType(e, key);
            if ("obj".equals(type)) {
                if (value instanceof Text) value=((Text)value).getValue();
                res.put(key, JSON.decode(value+""));
            } else {
                res.put(key, value);
            }
        }
        return res;
    }

    public static String annotateType(Map<String,Object> obj, String key) {
        if (KEY_TYPEMAP.equals(key)) return "obj";
        Map<String,String> typeMap=(Map<String,String>)obj.get(KEY_TYPEMAP);
        if (typeMap==null) {
            return "str";
        }
        String res = typeMap.get(key);
        if (res==null) res="str";
        return res;
    }
    public static void annotateType(Map<String,Object> obj, String key, String type) {
        if (KEY_TYPEMAP.equals(key)) return;
        Map<String,String> typeMap=(Map<String,String>)obj.get(KEY_TYPEMAP);
        if (typeMap==null) {
            typeMap=new HashMap<String,String>();
            obj.put(KEY_TYPEMAP, typeMap);
        }
        typeMap.put(key, type);
    }

}
