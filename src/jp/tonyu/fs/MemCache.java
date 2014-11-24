package jp.tonyu.fs;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.google.appengine.api.datastore.Entity;

public class MemCache implements Serializable {
    Vector<Entity> ents=new Vector<Entity>();
    static final String KEY_DIR=LSEmulator.KEY_DIR, KEY_NAME=LSEmulator.KEY_NAME, KEY_LAST_UPDATE=GLSFile.KEY_LAST_UPDATE ;
    public Entity getItemEntity(String dir, String name, Entity onDataStore) {
        Entity found=null;
        for (Entity e:ents) {
            if (dir.equals(dir(e)) && name.equals(name(e))) {
                found=e;
                break;
            }
        }
        return exchange(onDataStore, found);
    }
    public Entity exchange(Entity onDataStore, Entity onCache) {
        if (compare(onCache,onDataStore)>0 ) {
            return onCache;
        }
        if (onDataStore!=null) {
            ents.remove(onCache);
            //ents.add(onDataStore);
            return onDataStore;
        }
        return null;
    }
    static Date defDate=new Date(0);
    Date lastUpdate(Entity a) {
        if (a==null) return defDate;
        Object ao= a.getProperty(KEY_LAST_UPDATE) ;
        if (ao instanceof Date) {
            return (Date) ao;
        }
        return defDate;
    }
    private int compare(Entity a, Entity b) {
        return lastUpdate(a).compareTo(lastUpdate(b));
    }
    public void setItemEntity(Entity e) {
        removeItemEntity(e);
        ents.add(e);

    }
    public boolean removeItemEntity(Entity e) {
        if (e==null) return false;
        int i=ents.indexOf(e);
        if (i>=0) {
            ents.remove(i);
            return true;
        }
        return removeItemEntity( getItemEntity( dir(e) , name(e), null));
    }
    public static String name(Entity e) {
        return e.getProperty(KEY_NAME)+"";
    }
    public static String dir(Entity e) {
        return e.getProperty(KEY_DIR)+"";
    }
    public Map<String, Entity> ls(String path, Iterable<Entity> onDataStores) {
        Map<String, Entity> res=new HashMap<String, Entity>();
        for (Entity e:ents) {
            if (path.equals(dir(e)) ) {
                res.put(name(e), e);
            }
        }
        for (Entity onDataStore:onDataStores) {
            String name = name(onDataStore);
            Entity onCache=res.get(name);
            res.put(name, exchange( onDataStore, onCache));
        }
        return res;
    }

}
