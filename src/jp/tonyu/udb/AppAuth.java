package jp.tonyu.udb;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.google.appengine.api.datastore.DatastoreService;

import jp.tonyu.auth.Auth;
import jp.tonyu.edit.EQ;


public class AppAuth  {
    final String id;
    public final String user;
    public final String project;
    public static final String KIND_APPAUTH="AppAuth";
    public static final String KEY_ID="id",KEY_USER="user",KEY_PROJECT="project";
    public static final String APPAUTH_EMBED_MARK="APPAUTH_EMBED_MARK";
    public AppAuth(String user, String project) {
        super();
        id=Math.random()+"";
        this.user = user;
        this.project = project;
    }
    public AppAuth(EQ found) {
        id=found.attr(KEY_ID)+"";
        user=found.attr(KEY_USER)+"";
        project=found.attr(KEY_PROJECT)+"";
    }
    public String embed(String src) {
        return src.replace(APPAUTH_EMBED_MARK, id);
    }
    public static AppAuth create(DatastoreService dss, String user, String project) {
        AppAuth res=new AppAuth(user,project);
        EQ.$("<"+KIND_APPAUTH+">").
        attr(KEY_ID,res.id).attr(KEY_PROJECT,res.project)
        .attr(KEY_USER,res.user).putTo(dss);
        return res;
    }
    public static AppAuth get(Auth auth, String project) {
        String u = auth.currentUserId();
        if (u==null) throw new RuntimeException("Login required");
        return new AppAuth(u, project);
    }
    public static AppAuth get(DatastoreService dss,String id) {
        return new AppAuth( EQ.$(KIND_APPAUTH).attr(KEY_ID,id).find1$(dss) );
    }
}
