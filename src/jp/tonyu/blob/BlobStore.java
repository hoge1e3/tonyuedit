package jp.tonyu.blob;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import jp.tonyu.edit.EQ;

import com.google.appengine.api.blobstore.BlobInfo;
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
        String md5=EQ.$(e).attr(KEY_MD5)+"";
        return fromMD5(md5);
        //return new BlobKey(EQ.$(e).attr(KEY_BLOBKEY).toString());
    }
    public void delete(String user,String project, String fileName) {
        Entity e = getEntitiy(user, project, fileName);
        delete(e);
    }
    public void delete(Entity e) {
        //bs.delete(  new BlobKey((String)EQ.$(e).attr(KEY_BLOBKEY)));
        dss.delete( e.getKey());
    }
    public EQ entityFromMD5(String md5) {
        EQ e=EQ.$(KIND_MD52BLOB).attr(KEY_MD5, md5).find1$(dss);
        return e;
    }

    public BlobKey fromMD5(String md5) {
        EQ e=entityFromMD5(md5);
        if (e.isEmpty()) return null;
        BlobKey res = new BlobKey(""+e.attr(KEY_BLOBKEY));
        if (bif.loadBlobInfo(res)==null) {
            e.removeFrom(dss);
            return null;
        }
        return res;
    }
    public void scanAll() {
        for (Entity e: EQ.$(KIND_BLOB).asIterable(dss)) {
            EQ ee = EQ.$(e);
            Object md5 = ee.attr(KEY_MD5);
            if (md5!=null) continue;
            Object blk = ee.attr(KEY_BLOBKEY);
            BlobKey key = new BlobKey(blk+"");
            BlobInfo bi = bif.loadBlobInfo(key);
            if (bi==null) continue;
            ee.attr( KEY_MD5,  bi.getMd5Hash());
            ee.putTo(dss);
            /*BlobKey nk = putMD5(key);
            if (!blk.equals(nk.getKeyString())) {
                ee.attr(KEY_BLOBKEY,nk.getKeyString()).putTo(dss);
            }*/
        }
    }
    public String putMD5(BlobKey newKey) {
        String md5=bif.loadBlobInfo(newKey).getMd5Hash();
        BlobKey oldKey=fromMD5(md5);
        if (oldKey!=null) {
            if (!newKey.getKeyString().equals(oldKey.getKeyString())) {
                System.out.println("Delete blob. key="+newKey);
                bs.delete(newKey);
            }
            return md5;
        } else {
            EQ.$("<"+KIND_MD52BLOB+">").attr(KEY_MD5,md5).attr(KEY_BLOBKEY, newKey.getKeyString())
            .putTo(dss);
            return md5;
        }
    }
    public Map<String, String> md5sOfProject(String user,String project) {
        Map<String, String> res=new HashMap<String, String>();
        for (Entity e:EQ.$(KIND_BLOB).attr(KEY_USER,user).attr(KEY_PRJ,project).asIterable(dss)) {
            EQ ee = EQ.$(e);
            //String key = ""+ee.attr(KEY_BLOBKEY);
            //BlobInfo inf=bif.loadBlobInfo(new BlobKey(key));
            //String hash=inf.getMd5Hash();
            String hash=ee.attr(KEY_MD5)+"";
            res.put(""+ee.attr(KEY_FN), hash);
        }
        return res;
    }
    public void putKey(String user,String project, String fileName, BlobKey key) {
        String md5=putMD5(key);
        Entity e=getEntitiy(user, project, fileName);
        if (e==null) {
            EQ.$("<"+KIND_BLOB+">").
            attr(KEY_USER,user).
            attr(KEY_PRJ,project).
            attr(KEY_FN,fileName).
            //attr(KEY_BLOBKEY,key.getKeyString())
            attr(KEY_MD5,md5)
            .putTo(dss);
        } else {
            EQ eq = EQ.$(e);
            //bs.delete(  new BlobKey((String)eq.attr(KEY_BLOBKEY)));
            //eq.attr(KEY_BLOBKEY,key.getKeyString()).putTo(dss);
            eq.attr(KEY_MD5,md5).putTo(dss);
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
    public void forkBlob(Map<String,String> md5s, String user, String project) {
        System.out.println("Forking "+user+"/"+project+" MD5s="+md5s);
        for (String fn:md5s.keySet()) {
            String md5=md5s.get(fn);
            /*BlobKey key=fromMD5(md5);
            if (key==null) {
                System.out.println(user+"/"+project+"/"+fn+" is not found");
                continue;
            }
            String keystr= key.getKeyString();*/
            EQ.$("<"+KIND_BLOB+">").attr(KEY_USER,user).attr(KEY_PRJ,project).
            attr(KEY_FN,fn)/*.attr(KEY_BLOBKEY,keystr)*/.attr(KEY_MD5,md5).putTo(dss);
        }
    }
}
