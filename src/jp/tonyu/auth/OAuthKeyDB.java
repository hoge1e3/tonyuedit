package jp.tonyu.auth;

import jp.tonyu.edit.EQ;

import com.google.appengine.api.datastore.DatastoreService;

public class OAuthKeyDB {
    public static final String KIND="OAuthKey",
            KEY_SERVICE="service",
            KEY_KEY="key",KEY_SECRET="secret";
    public OAuthKeyDB(DatastoreService dss) {
        super();
        this.dss = dss;
    }
    DatastoreService dss;
    public EQ get(String service, boolean cine) {
        EQ found = EQ.$(KIND).attr(KEY_SERVICE, service).find1$(dss);
        if (!cine || !found.isEmpty()) return found;
        found=EQ.$("<"+KIND+">").attr(KEY_SERVICE, service);
        return found;
    }
    public void put(String service,String key,String secret) {
        EQ s = get(service,true);
        s.attr(KEY_KEY,key).attr(KEY_SECRET,secret).putTo(dss);
    }
}
