package jp.tonyu.fs;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.Vector;

import jp.tonyu.edit.CountingEntityIterable;
import jp.tonyu.edit.EQ;
import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.ContextHolder;
import jp.tonyu.js.ContextRunnable;
import jp.tonyu.js.NumberPropAction;
import jp.tonyu.js.RQ;
import static jp.tonyu.js.RQ.$;
import jp.tonyu.js.SafeJSSession;
import jp.tonyu.js.Scriptables;
import jp.tonyu.js.Wrappable;
import jp.tonyu.util.Streams;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Text;

public class GLSFile implements Wrappable,Iterable<GLSFile> {
	private static final String UTF_8 = "UTF-8";
    private static final String INCLUDE_TRASHED = "includeTrashed";
    private static final String EXCLUDES = "excludes";
    private static final String IS_DIR = "";
	static final String KEY_VALUE = "value";
	static final String KEY_LAST_UPDATE = "lastUpdate";
	static final String KEY_TRASHED = "trashed";
	private final LSEmulator localStorage;
    private final String path;
	private Entity ent;
    private boolean gotEnt=false;
    public String path() {return path;}
	public GLSFile(LSEmulator localStorage, String path) {
		super();
		this.localStorage = localStorage;
		this.path = path;
	}


	public GLSFile(LSEmulator localStorage, Entity e) {
        this.localStorage = localStorage;
	    EQ $ = EQ.$(e);
        path=""+$.attr(LSEmulator.KEY_DIR)+$.attr(LSEmulator.KEY_NAME);
        ent=e;
	    gotEnt=true;
    }
    public Object getItem() {
		Entity e=getItemEntity(false);
		return valueOf(e);
	}
	public static Object valueOf(Entity e) {
		if (e==null) return null;
		Object o = e.getProperty(KEY_VALUE);
		if (o instanceof Text) {
			Text t = (Text) o;
			return t.getValue();
		}
		if (o instanceof Blob) {
			Blob b = (Blob) o;
			return b.getBytes();
		}
		return o+"";
	}
	public void setItem(Object value) {
		Entity e=getItemEntity(true);
		putValue(e, value);
		e.setProperty(KEY_LAST_UPDATE, new Date());
		if (e.hasProperty(KEY_TRASHED)) {
			e.removeProperty(KEY_TRASHED);
		}
		localStorage.setItemEntity(e);
	}

	public static void putValue(Entity e,Object value) {
		if (value instanceof String) {
			String str = (String) value;
			if (str.length()<512*1024) {
			    e.setProperty(KEY_VALUE, new Text(str));
			} else {
	            System.out.println("putValue: Convert text to blob");
			    byte[] b;
                try {
                    b = str.getBytes(UTF_8);
                    e.setProperty(KEY_VALUE, new Blob(b));
                } catch (UnsupportedEncodingException e1) {
                    e1.printStackTrace();
                }
			}
		} else if (value instanceof byte[]) {
			byte[] b = (byte[]) value;
			e.setProperty(KEY_VALUE, new Blob(b));
		} else {
			e.setProperty(KEY_VALUE, value+"");
		}
	}
	public void trashItem() {
		Entity e=getItemEntity(false);
		if (e!=null) {
			e.setProperty(KEY_LAST_UPDATE, new Date());
			e.setProperty(KEY_TRASHED, true);
			localStorage.setItemEntity(e);
		}
	}


	public Date lastModified() {
		Entity e = getItemEntity(false);
		if (e==null) return new Date(0);
		Object d=e.getProperty(KEY_LAST_UPDATE);
		if (d instanceof Date) {
			Date dd = (Date) d;
			return dd;
		}
		return new Date(0);
	}

	public long lastUpdate() {
		return lastModified().getTime();
	}
	public boolean isTrashed() {
		Entity e = getItemEntity(false);
		if (e==null) return false;
		return e.hasProperty(KEY_TRASHED);
	}
	public Scriptable metaInfo() {
		Scriptable res=new BlankScriptableObject();
		if (isTrashed()) {
			ScriptableObject.putProperty(res, KEY_TRASHED, true);
		}
		ScriptableObject.putProperty(res, KEY_LAST_UPDATE, lastUpdate());
		return res;
	}
	public void metaInfo(Scriptable m) {
		Entity e = getItemEntity(false);
		if (e==null) throw new RuntimeException("Cannot metaInfo : no such file :"+path);
		putMeta(e, m);
		localStorage.setItemEntity(e);
	}
	public void putMeta(Entity e, Scriptable m) {
		Object o=ScriptableObject.getProperty(m, KEY_TRASHED);
		if (o.equals(true)) {
			e.setProperty(KEY_TRASHED, true);
		} else {
			e.removeProperty(KEY_TRASHED);
		}
		Object l=ScriptableObject.getProperty(m, KEY_LAST_UPDATE);
		if (l instanceof Number) {
			Number n = (Number) l;
			e.setProperty(KEY_LAST_UPDATE, new Date(n.longValue()));
		}
	}

	public GLSFile rel(String relPath) {
		String np=path+relPath;
		return new GLSFile(localStorage, np);
	}


	public boolean exists() {
	    Entity e = getItemEntity(false);
	    if (e==null) return false;
	    return !e.hasProperty(KEY_TRASHED);
	}
	private Entity getItemEntity(boolean cine) {
	    if (cine) {
	        if (gotEnt && ent!=null) return ent;
	        ent=localStorage.getItemEntity(path, true);
	    } else {
	        if (gotEnt) return ent;
	        ent=localStorage.getItemEntity(path, false);
	    }
        gotEnt=true;
	    return ent;
	}


	public String relPath(GLSFile base) {
		if (equals(base)) {
			return "";
		}
		if (parent() == null)
			throw new RuntimeException(this + " is not in " + base);
		return parent().relPath(base) + name();
	}


	public String text() throws IOException {
		Object item = getItem();
		if (item instanceof byte[]) {
		    byte[] b = (byte[]) item;
            System.out.println("text(): Convert blob to text");
            return new String(b,UTF_8);
        }
        return 	item+"";
	}

	public void textMeta(String content, Scriptable meta) {
		mkdirs(true);
		Entity e = getItemEntity(true);
		putValue(e, content);
		putMeta(e, meta);
		localStorage.setItemEntity(e);
	}

	public void text(String content) throws FileNotFoundException {
		mkdirs();
		setItem(content);
	}


	public boolean equals(Object obj) {
		if (obj instanceof GLSFile) {
			GLSFile s = (GLSFile) obj;
			return path.equals(s.path);
		}
		return false;
	}


	public int hashCode() {
		return path.hashCode();
	}


	public boolean mkdirs() {
		return mkdirs(false);
	}
	public boolean mkdirs(boolean checkParents) {
		System.out.println("mkdirs "+path);
		if (!checkParents && exists()) {
			return true;
		}
		GLSFile p = parent();
		if (p!=null) p.mkdirs(checkParents);
		if (isDir() && !exists()) {
			setItem(IS_DIR);
		}
		return true;
	}
	public boolean mkdir() {
		return mkdirs();
	}

	public boolean isDir() {
		return path.endsWith(LSEmulator.SEP);
	}


	public Iterable<GLSFile> order(Comparator<GLSFile> comp) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}


	public Iterable<GLSFile> orderByName() {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}


    public void each(final Function f) {
        each(f, null);
    }
    RQ convertOptions(Scriptable options) {
        RQ res=$(options);
        Object exo=res.attr(EXCLUDES);
        if (exo instanceof NativeArray) {
            RQ nex=$("{}");
            RQ ar = $(exo);
            boolean has=false;
            for (Object expath: ar.values()) {
                if ((expath+"").startsWith("/")) {
                    nex.attr(expath, true);
                } else {
                    nex.attr(path+expath, true);
                }
                has=true;
            }
            if (has) res.attr(EXCLUDES, nex);
            else res.remove(EXCLUDES);
        }
        /*for (Object ex:res.attr$(EXCLUDES)) {
            System.out.println("Excludes - "+ex);
        }*/
        return res;
    }
    public void each(final Function f, Scriptable options) {
		ContextHolder h=SafeJSSession.newContextHolder();
		RQ o=convertOptions(options);
		//RQ exc=o.attr$(EXCLUDES);
		try {
			for (GLSFile s:lsFile(o)) {
				//GLSFile e=GLSFile.this.rel(s.getProperty(LSEmulator.KEY_NAME)+"");
                //if (exc.has(e.path())) continue;
				f.call(h.get(),  new BlankScriptableObject(),
						new BlankScriptableObject(), new Object[]{s});
			}
		} finally {
			h.release();
		}
	}


    public String name() {
		if (isRoot()) return path;
		String []s=LSEmulator.splitPath(path);
		return s[1];
	}


	public InputStream inputStream() throws IOException {
		byte []b=bytes();
		if (b==null) throw new FileNotFoundException(path);
		return new ByteArrayInputStream(b);
	}


	public OutputStream outputStream() throws FileNotFoundException {
		return outputStream(false);
	}


	public OutputStream outputStream(boolean append)
			throws FileNotFoundException {
		ByteArrayOutputStream st=new ByteArrayOutputStream() {
			@Override
			public void close() throws IOException {
				super.close();
				bytes( toByteArray());
			}
		};
		return st;
	}


	public String fullPath() {
		return path;
	}
    public Iterator<GLSFile> iterator(Scriptable options) {
        return iterator(convertOptions(options));
    }
	public Iterator<GLSFile> iterator(RQ options) {
	    return lsFile(options).iterator();
	    /*final Iterable<Entity> files = lsEntity( options);
        final Iterator<Entity> it=files.iterator();
        return new Iterator<GLSFile>() {
            //int i = 0;

            @Override
            public boolean hasNext() {
                return it.hasNext(); //i < files.size();
            }

            @Override
            public GLSFile next() {
                Entity e = it.next();
                return rel(e.getProperty(LSEmulator.KEY_NAME)+"");
            }

            @Override
            public void remove() {
            }

        };*/
	}
	@Override
	public Iterator<GLSFile> iterator() {
		return iterator(RQ.$(null));
	}
	public long size() {
		if (!exists()) return 0;
		try {
			return bytes().length;
		} catch (IOException e) {
			return 0;
		}
	}


	public String[] lines() throws IOException {
		String text = text();
		if (text==null) return new String[0];
        return text.split("[\\r\\n]+");
	}


	public void copyDirTo(GLSFile dst, boolean createNewFolder)
			throws IOException {
		if (!isDir()) throw new RuntimeException(this + " is not a dir");
		GLSFile folder = (createNewFolder ? dst.rel(name()) : dst);
		copyDir(this, folder);
	}

	public static void copyDir(GLSFile curSrc, GLSFile curDst) throws IOException {
		curDst.mkdirs();
		for (GLSFile f : curSrc) {
			GLSFile dstFile = curDst.rel(f.name());
			if (f.isDir()) {
				copyDir(f, dstFile);
			} else {
				f.copyTo(dstFile);
			}
		}
	}

	public void copyTo(GLSFile dst) throws IOException {
		dst.bytes(bytes());
	}

	public void backup(String dir) throws IOException {
		// TODO 自動生成されたメソッド・スタブ

	}


	public boolean moveAsBackup(String dir) {
		// TODO 自動生成されたメソッド・スタブ
		return false;
	}


	public GLSFile backupFile(String dir) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}
	/*public Iterable<Entity> lsEntity(Scriptable options) {
	    return lsEntity(convertOptions(options));
	}*/

	/*private Iterable<Entity> lsEntity(RQ options) {
        //System.out.println(CountingEntityIterable.getCount()+": ls "+path);
        Iterable<Entity> ls = localStorage.ls(path);
        //System.out.println(CountingEntityIterable.getCount()+": end ls "+path);
        if (options.has("includeTrashed")) return ls;
        jp.tonyu.util.col.Filter<Entity> f = jp.tonyu.util.col.Filter.start(ls);
        for (Entity e:f) {
            f.exclude(e.hasProperty(KEY_TRASHED)  );
        }
        return f.result();
    }*/
    public Iterable<GLSFile> lsFile(RQ o) {
        boolean includeTrashed=o.has(INCLUDE_TRASHED);
        RQ exc=o.attr$(EXCLUDES);
        Vector<GLSFile> res=new Vector<GLSFile>();
        for (Entity e:localStorage.ls(path)) {
            GLSFile f= new GLSFile(localStorage,e); //GLSFile.this.rel(s.getProperty(LSEmulator.KEY_NAME)+"");
            if (!includeTrashed && f.isTrashed()) continue;
            if (exc.has(f.path())) continue;
            res.add(f);
        }
        return res;
    }
    public String[] ls() {
        return ls(null);
    }
	public String[] ls(Scriptable options) {
		Iterable<GLSFile> ls = lsFile(convertOptions(options));
		Vector<String> v=new Vector<String>();
        for (GLSFile e:ls) {
            String epath = e.name();//  e.getProperty(LSEmulator.KEY_NAME)+"";
            v.add(epath);
        }
        return v.toArray(new String[0]);
	}
	public GLSFile parent() {
		if (isRoot()) return null;
		String[] p=LSEmulator.splitPath(path);
		return new GLSFile(localStorage, p[0]);
	}


	private boolean isRoot() {
		return LSEmulator.SEP.equals(path);
	}


	public boolean moveTo(GLSFile dest) {
		try {
			copyTo(dest);
			trash();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}



	public byte[] bytes() throws IOException {
		Object o=getItem();
		byte[] b=null;
		if (o instanceof String) {
			String s = (String) o;
			try {
				b=s.getBytes(UTF_8);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		if (o instanceof byte[]) {
			b = (byte[]) o;
		}
		return b;
	}


	public void bytes(byte[] b) throws IOException {
		mkdirs();
		setItem(b);
	}


	public void writeTo(OutputStream out) throws IOException {
		Streams.redirect( inputStream(), out);
	}


	public void readFrom(InputStream in) throws IOException {
		Streams.redirect( in, outputStream());
	}

	public void rm() {
	    trash();
	}
	public void trash() {
		trashItem();
	}
    public void rmdir() {
        trashDir();
    }
	public void trashDir() {
	    if (isDir() && ls().length>0) {
            throw new RuntimeException("Directory not empty: "+path);
        }
        trashItem();
	}
	public void removeWithoutTrash() {
	    if (isDir()) {
	        Iterable<GLSFile> files = lsFile(RQ.$("{}").attr(INCLUDE_TRASHED, true));
	        for (GLSFile f:files) {
	            f.removeWithoutTrash();
	        }
	    }
	    localStorage.removeItemEntity(getItemEntity(false));

	}
    public void recursive(final Function a) {
        recursive(a, RQ.$(null));
    }
	public void recursive(final Function a, Scriptable options) {
	    RQ op = convertOptions(options);
	    recursive(a, op);
	}
    public void recursive(final Function a, RQ op) {
	    ContextHolder h=SafeJSSession.newContextHolder();
	    //RQ exc=op.attr$(EXCLUDES);

		try {
		    //Iterator<GLSFile> it = iterator(op);
			//while (it.hasNext()) {
			for (GLSFile f:lsFile(op)) { // =it.next();
			    //if (exc.has(f.path())) continue;
				if (f.isDir()) {
					f.recursive(a,op);
				} else {
					a.call(h.get(), new BlankScriptableObject(),
							new BlankScriptableObject(), new Object[]{f});
				}
			}
		} finally {
			h.release();
		}
	}

	@Override
	public String toString() {
		return "ls:"+path;
	}
}
