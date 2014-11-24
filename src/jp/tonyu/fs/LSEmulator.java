package jp.tonyu.fs;

import java.util.Map;
import java.util.Vector;

import jp.tonyu.edit.CountingEntityIterable;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;

public class LSEmulator implements ILocalStorage {

    static String key;
	public static final String KEY_NAME = "name";
	public static final String KEY_DIR = "dir";
	public static final String SEP = "/";
	public static final String kind="ServerStorage";
	//PathResolver pathResolver;
	final MemCache cache;/*=new MemCache();
	public MemCache getCache() {
	    return cache;
	}*/
	final DatastoreService datastoreService;// = DatastoreServiceFactory.getDatastoreService();
	public LSEmulator(DatastoreService d, MemCache cache) {
		datastoreService=d;
		this.cache=cache;

	}
	/*public LSEmulator(PathResolver pathResolver) {
		super();
		this.pathResolver = pathResolver;
	}*/
	public Entity getItemEntity(String path,boolean createIfNotExist) {
    	Query vQuery = new Query(kind);
    	String[] p=splitPath(path);
    	//System.out.println("path="+path+" p  = "+(p==null?null :p[0]+ "-" +p[1]));
    	Filter filter= CompositeFilterOperator.and(
    		new Query.FilterPredicate(KEY_DIR, FilterOperator.EQUAL, p[0]),
    		new Query.FilterPredicate(KEY_NAME, FilterOperator.EQUAL, p[1])
    	);
    	vQuery.setFilter(filter);
    	Iterable<Entity> it = new CountingEntityIterable( datastoreService.prepare(vQuery).asIterable() );
    	Entity res=null;
    	for (Entity e:it) {
    		res=e;
    		break;
    	}
    	res=cache.getItemEntity(p[0],p[1],res);

    	if (createIfNotExist && res==null) {
    		res=new Entity(kind);
    		res.setProperty(KEY_DIR, p[0]);
    		res.setProperty(KEY_NAME, p[1]);
    	}
    	return res;
	}
	public void setItemEntity(Entity e) {
        cache.setItemEntity(e);
		datastoreService.put(e);
	}


	public static String[] splitPath(String path) {
		if (SEP.equals(path) ) return new String[]{"", SEP};
		if (path==null || "".equals(path) || !path.startsWith(SEP) ) throw new RuntimeException("Invalid path:"+path);
		int i;
		//         012345       0123456
		//  path=  /a/b/c       /a/b/c/
		for (i=path.length()-1; i>=0 ;i--) {
			if (!path.substring(i,i+1).equals(SEP)) break;
		}
		//            i=5          i=5
		for (;i>=0;i--) {
			if (path.substring(i,i+1).equals(SEP)) break;
		}
		//           i=4          i=4
		return new String[]{ path.substring(0,i+1) , path.substring(i+1)};
		//
	}



	@Override
	public void removeItemEntity(Entity e) {
		if (e!=null) {
		    cache.removeItemEntity(e);
			datastoreService.delete(e.getKey());
		}
	}
	@Override
	public Iterable<Entity> ls(String path) {
		Query vQuery = new Query(kind);
    	Filter filter= new Query.FilterPredicate(KEY_DIR, FilterOperator.EQUAL, path);
    	vQuery.setFilter(filter);
    	Iterable<Entity> it = new CountingEntityIterable( datastoreService.prepare(vQuery).asIterable() );
    	Map<String, Entity> cm=cache.ls(path, it);
    	Vector<Entity> v=new Vector<Entity>();
    	for (Entity e:cm.values()) {
    	    v.add(e);
    	}
    	return v;
	}
	public static boolean removeAll(String k) {
		if (key!=null && key.equals(k)) {
			DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
	    	Query vQuery = new Query(kind);
	    	Iterable<Entity> it = new CountingEntityIterable(datastoreService.prepare(vQuery).asIterable());
	    	for (Entity e:it) {
	    		datastoreService.delete(e.getKey());
	    	}
			return true;
		}
		key=Math.random()+"";
		return false;
	}

}
