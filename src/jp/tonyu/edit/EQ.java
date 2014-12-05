package jp.tonyu.edit;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Text;

public class EQ  {
    Entity t;
    List<Query.FilterPredicate> filters;
    Query query;
    public EQ(Entity s) {
        t=s;
    }
    public EQ(Query q) {
        query=q;
        filters=new Vector<Query.FilterPredicate>();
    }
    public boolean isQuery() {return filters!=null;}
    public static EQ $(Object o) {
        if (o instanceof EQ) {
            EQ r = (EQ) o;
            return r;
        }
        if (o instanceof Entity) {
            Entity s = (Entity) o;
            return new EQ(s);
        }
        if (o instanceof String) {
            String str = (String) o;
            if (str.startsWith("<") && str.endsWith(">")) {
                String kind=str.substring(1,str.length()-1);
                return new EQ(new Entity(kind));
            }
            return new EQ(new Query(str));
        }


        return new EQ((Entity)null);
    }

    public boolean isEmpty() {
        return t==null;
    }

    public Entity get() {
        return t;
    }
    public static Object unwrap(Object value) {
        if (value instanceof EQ) {
            EQ r = (EQ) value;
            return r.get();
        }
        return value;
    }
    public EQ attr$(Object key) {
        return $(attr(key));
    }
    public Object attr(Object key) {
        if (isEmpty()) return null;
        if (key instanceof String) {
            String s = (String) key;
            Object got = t.getProperty(s);
            if (got instanceof Text) {
                Text t = (Text) got;
                got=t.getValue();
            }
            return got;
        }
        throw new RuntimeException("Invalid key : "+key);
    }
    public EQ attr(Object key, Object value) {
        if (isQuery()) {
            filters.add(new Query.FilterPredicate(key+"", FilterOperator.EQUAL, value));
            return this;
        }
        if (isEmpty()) return this;
        if (key instanceof String) {
            String s = (String) key;
            Object unwraped = unwrap(value);
            if (unwraped instanceof String) {
                String str = (String) unwraped;
                if (str.length()>=500) {
                    unwraped=new Text(str);
                }
            }
            t.setProperty(s, unwraped);
            return this;
        }

        throw new RuntimeException("Invalid key : "+key);
    }
    public Iterable<Entity> asIterable(DatastoreService datastoreService) {
        if (filters.size()>0) {
            Filter filter= filters.size()==1? filters.get(0) : CompositeFilterOperator.and(filters.toArray(new Query.FilterPredicate[0]));
            //System.out.println("EQ:asit "+filter);
            query.setFilter(filter);
        }
        Iterable<Entity> it = datastoreService.prepare(query).asIterable();
        return it;
    }
    public boolean has(String key) {
        if (isEmpty()) return false;
        return t.hasProperty(key);
    }
    public EQ putTo(DatastoreService dss) {
        if (t!=null) dss.put(t);
        return this;
    }
    public EQ removeFrom(DatastoreService dss) {
        dss.delete(t.getKey());
        return this;
    }
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public EQ putTo(Map dst, String... keys) {
        for (String key:keys) {
            dst.put(key, attr(key));
        }
        return this;
    }
    public Entity find1(DatastoreService dss) {
        Iterable<Entity> iterable = asIterable(dss);
        Entity res=null;
        for (Entity e:iterable) {
            res=e;
        }
        return res;
    }
    public EQ find1$(DatastoreService dss) {
        return $(find1(dss));
    }
}
