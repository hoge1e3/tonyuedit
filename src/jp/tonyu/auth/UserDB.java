package jp.tonyu.auth;

import jp.tonyu.edit.CountingEntityIterable;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;

public class UserDB {
	static final String
		KEY_OAUTH_PROVIDER="oauthProvider",  // "Google"  "Twitter" ....
		KEY_OAUTHED_USER_ID="oauthedUserId";
    public static final String KEY_LOCAL_USER_ID="userId";
    public static final String KEY_LOCAL_PASSWORD="pasword";
    public static final String KEY_AGREED_TERM_VERSION="termVersion";
    static final String KIND="User";
	final DatastoreService datastoreService=DatastoreServiceFactory.getDatastoreService();
	public Entity getUserEntity(String oauthProvider, String aUserId, boolean createIfNotExist) {
		Query vQuery = new Query(KIND);
    	Filter filter= CompositeFilterOperator.and(
    		new Query.FilterPredicate(KEY_OAUTH_PROVIDER, FilterOperator.EQUAL, oauthProvider),
    		new Query.FilterPredicate(KEY_OAUTHED_USER_ID, FilterOperator.EQUAL, aUserId)
    	);
    	vQuery.setFilter(filter);
    	Iterable<Entity> it = new CountingEntityIterable( datastoreService.prepare(vQuery).asIterable() );
    	Entity res=null;
    	for (Entity e:it) {
    		res=e;
    		break;
    	}
    	if (createIfNotExist && res==null) {
    		res=new Entity(KIND);
    		res.setProperty(KEY_OAUTH_PROVIDER, oauthProvider);
    		res.setProperty(KEY_OAUTHED_USER_ID, aUserId);
    		datastoreService.put(res);
    	}
    	return res;
	}
	public String getUserId(String oauthProvider, String aUserId) {
		Entity e = getUserEntity(oauthProvider, aUserId ,false);
		if (e==null) return null;
		return e.getProperty(KEY_LOCAL_USER_ID)+"";
	}
	public Entity getUserEntity(String lUserId, boolean createIfNotExist) {
        Query vQuery = new Query(KIND);
        Filter filter=
            new Query.FilterPredicate(KEY_LOCAL_USER_ID, FilterOperator.EQUAL, lUserId)
        ;
        vQuery.setFilter(filter);
        Iterable<Entity> it = new CountingEntityIterable( datastoreService.prepare(vQuery).asIterable() );
        Entity res=null;
        for (Entity e:it) {
            res=e;
            break;
        }
        if (createIfNotExist && res==null) {
            res=new Entity(KIND);
            res.setProperty(KEY_LOCAL_USER_ID, lUserId);
            datastoreService.put(res);
        }
        return res;
    }
	public void setUserEntity(Entity e) {
	    datastoreService.put(e);
	}
}
