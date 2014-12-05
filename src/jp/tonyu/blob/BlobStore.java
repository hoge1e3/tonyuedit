package jp.tonyu.blob;

import java.util.Set;

import jp.tonyu.edit.EQ;

import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;

public class BlobStore {
    private static final String KEY_MD5 = "md5";
    private static final String MEDIATYPE_IMAGE = "image";
    private static final String MEDIATYPE_SOUND = "sound";
    BlobstoreService bs;
    BlobInfoFactory bif;
    DatastoreService dss;
    public static final String KIND_BLOB="TBlobStore",KEY_USER="user",KEY_PRJ="project",KEY_FN="fileName",
            KEY_BLOBKEY="blobKey",KIND_MD52BLOB="MD52Blob";
    public BlobStore(BlobstoreService bs,DatastoreService dss) {
        this.bs = bs;
        this.dss=dss;
        bif=new BlobInfoFactory(dss);
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
        //bs.delete(  new BlobKey((String)EQ.$(e).attr(KEY_BLOBKEY)));
        dss.delete( e.getKey());
    }
    public BlobKey fromMD5(String md5) {
        EQ e=EQ.$(KIND_MD52BLOB).attr(KEY_MD5, md5).find1$(dss);
        if (e.isEmpty()) return null;
        return new BlobKey(""+e.attr(KEY_BLOBKEY));
    }
    public void scanAll() {
        for (Entity e: EQ.$(KIND_BLOB).asIterable(dss)) {
            BlobKey key = new BlobKey(""+EQ.$(e).attr(KEY_BLOBKEY));
            putMD5(key);
        }
    }
    public BlobKey putMD5(BlobKey key) {
        String md5=bif.loadBlobInfo(key).getMd5Hash();
        BlobKey old=fromMD5(md5);
        if (old!=null) {
            if (!key.getKeyString().equals(old.getKeyString())) {
                bs.delete(key);
            }
            return old;
        } else {
            EQ.$("<"+KIND_MD52BLOB+">").attr(KEY_MD5,md5).attr(KEY_BLOBKEY, key.getKeyString())
            .putTo(dss);
            return key;
        }
    }
    public void putKey(String user,String project, String fileName, BlobKey key) {
        key=putMD5(key);
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
