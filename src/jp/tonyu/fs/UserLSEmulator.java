package jp.tonyu.fs;

import java.util.Vector;

import jp.tonyu.auth.Auth;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;

public class UserLSEmulator extends LSEmulator {
	//PathResolver resolver;
	static final String projectsPath="/Tonyu/Projects/";
	static final String homePrefix="/home/";
	Auth auth;
	public UserLSEmulator(DatastoreService sv, MemCache c, Auth a) {
		super(sv,c);
		this.auth=a;
		/*this.resolver = new PathResolver() {

			@Override
			public String resolve(String path) {
				if (path.startsWith(projectsPath)) {
					String rest=path.substring(projectsPath.length());
					return home()+rest;
				}
				return path;
			}
		};*/
	}
	public String home() {
		return homePrefix+auth.currentUserId()+LSEmulator.SEP;
	}

	@Override
	public void setItemEntity(Entity e) {
		String realDir=e.getProperty(KEY_DIR)+"";
		if (auth.isRoot() || inMyHome(realDir) || realDir.startsWith("/tmp/") || realDir.startsWith("/Tonyu/doc/")) {
			super.setItemEntity(e);
		} else {
			throw new RuntimeException("Write Permission denied: "+e.getProperty(KEY_DIR)+e.getProperty(KEY_NAME));
		}
	}

	@Override
	public Entity getItemEntity(String path, boolean cine) {
	    if ((!auth.isRoot()) && inOthersHome(path)) {
             throw new RuntimeException("Read Permission denied: "+path);
	    }
		return super.getItemEntity(path, cine);
	}
    public boolean inOthersHome(String path) {
        return (!path.equals(homePrefix)) && path.startsWith(homePrefix) && !inMyHome(path);
    }
    public boolean inMyHome(String path) {
        return path.startsWith(home());
    }

	@Override
	public Iterable<Entity> ls(String path) {
		if ((!auth.isRoot()) && inOthersHome(path)) throw new RuntimeException("Read Permission denied: "+path);
		//if (path.equals(homePrefix)) return new String[]{auth.userId()+LSEmulator.SEP};
		return super.ls(path);
	}

}
