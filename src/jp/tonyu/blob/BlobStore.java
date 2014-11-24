package jp.tonyu.blob;

import java.util.Set;

import jp.tonyu.edit.EQ;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;

public class BlobStore {
    private static final String MEDIATYPE_IMAGE = "image";
    private static final String MEDIATYPE_SOUND = "sound";
    BlobstoreService bs;
    DatastoreService dss;
    public static final String KIND_BLOB="TBlobStore",KEY_USER="user",KEY_PRJ="project",KEY_FN="fileName",
            KEY_BLOBKEY="blobKey";
    public BlobStore(BlobstoreService bs,DatastoreService dss) {
        this.bs = bs;
        this.dss=dss;
    }
    public BlobKey getKey(String user,String project, String fileName) {
        Entity e=getEntitiy(user, project, fileName);
        if (e==null) return null;
        return new BlobKey(EQ.$(e).attr(KEY_BLOBKEY).toString());
    }
    public void delete(String user,String project, String fileName) {
        Entity e = getEntitiy(user, project, fileName);
        delete(e);
    }
    public void delete(Entity e) {
        bs.delete(  new BlobKey((String)EQ.$(e).attr(KEY_BLOBKEY)));
        dss.delete( e.getKey());
    }
    public void putKey(String user,String project, String fileName, BlobKey key) {
        Entity e=getEntitiy(user, project, fileName);
        if (e==null) {
            EQ.$("<"+KIND_BLOB+">").
            attr(KEY_USER,user).
            attr(KEY_PRJ,project).
            attr(KEY_FN,fileName).
            attr(KEY_BLOBKEY,key.getKeyString()).putTo(dss);
        } else {
            EQ eq = EQ.$(e);
            bs.delete(  new BlobKey((String)eq.attr(KEY_BLOBKEY)));
            eq.attr(KEY_BLOBKEY,key.getKeyString()).putTo(dss);
        }
    }
    private Entity getEntitiy(String user, String project, String fileName) {
        return EQ.$(KIND_BLOB).
        attr(KEY_USER,user).
        attr(KEY_PRJ,project).
        attr(KEY_FN,fileName).
        find1(dss);
    }
    public void retain(String user, String project, Set retainFileNames, String mediaType) {
        Iterable<Entity> it = EQ.$(KIND_BLOB).
        attr(KEY_USER,user).
        attr(KEY_PRJ,project).asIterable(dss);
        for (Entity e:it) {
            EQ eq = EQ.$(e);
            Object fn = eq.attr(KEY_FN);
            if (!retainFileNames.contains( fn ) && detectMediaType(fn+"").equals(mediaType) ){
               delete(e);
            }
        }
    }
    public static String detectMediaType(String fn) {
        if (fn.endsWith(".mp3") || fn.endsWith(".ogg")) {
            return MEDIATYPE_SOUND;
        } else {
            return MEDIATYPE_IMAGE;
        }
    }

}
