package jp.tonyu.js;

import java.util.Iterator;
import java.util.Vector;

import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

public class RQ implements Iterable<Object> {
    Scriptable t;
    public RQ(Scriptable s) {
        t=s;
    }
    public static RQ $(Object o) {
        if (o instanceof RQ) {
            RQ r = (RQ) o;
            return r;
        }
        if (o instanceof Scriptable) {
            Scriptable s = (Scriptable) o;
            return new RQ(s);
        }
        if ("{}".equals(o)) {
            return new RQ(obj());
        }
        return new RQ(null);
    }

    public static BlankScriptableObject obj() {
        return new BlankScriptableObject();
    }
    public boolean isEmpty() {
        return t==null;
    }
    public Iterable<Object> values() {
        Vector<Object> res=new Vector<Object>();
        if (isEmpty()) return res;
        for (Object key: t.getIds()) {
            res.add( attr(key) );
        }
        return res;
    }
    public Object get() {
        return t;
    }
    public static Object unwrap(Object value) {
        if (value instanceof RQ) {
            RQ r = (RQ) value;
            return r.get();
        }
        return value;
    }
    public RQ attr$(Object key) {
        return $(attr(key));
    }
    public Object attr(Object key) {
        if (isEmpty()) return null;
        if (key instanceof String) {
            String s = (String) key;
            return ScriptableObject.getProperty(t, s);
        }
        if (key instanceof Integer) {
            Integer i = (Integer) key;
            return ScriptableObject.getProperty(t, i);
        }
        throw new RuntimeException("Invalid key : "+key);
    }
    public RQ attr(Object key, Object value) {
        if (isEmpty()) return this;
        if (key instanceof String) {
            String s = (String) key;
            ScriptableObject.putProperty(t, s, unwrap(value));
            return this;
        }
        if (key instanceof Integer) {
            int i = (Integer) key;
            ScriptableObject.putProperty(t, i, unwrap(value));
            return this;
        }
        throw new RuntimeException("Invalid key : "+key);
    }


    public boolean has(Object key) {
        if (isEmpty()) return false;
        if (key instanceof String) {
            String s = (String) key;
            return ScriptableObject.hasProperty(t, s);
        }
        if (key instanceof Integer) {
            int i = (Integer) key;
            return ScriptableObject.hasProperty(t, i);
        }
        return false;
    }

    @Override
    public Iterator<Object> iterator() {
        Vector<Object> res = new Vector<Object> ();
        if (isEmpty()) return res.iterator();
        for (Object o: t.getIds()) {
            res.add(o);
        }
        return res.iterator();
    }
    public boolean remove(Object key) {
        if (isEmpty()) return false;
        if (!has(key)) return false;
        if (key instanceof String) {
            String s = (String) key;
            t.delete(s);
            return true;
        }
        if (key instanceof Integer) {
            int i = (Integer) key;
            t.delete(i);
            return true;
        }
        throw new RuntimeException("Invalid key : "+key);
    }

}
