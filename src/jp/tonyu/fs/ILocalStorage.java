package jp.tonyu.fs;

import com.google.appengine.api.datastore.Entity;

public interface ILocalStorage {
	//public abstract Object getItem(String key);
	//public abstract String getItem(String key);
	//public abstract void setItem(String path, Object value);
	//public abstract void trashItem(String key);
	public Entity getItemEntity(String path,boolean createIfNotExist);
	public void setItemEntity(Entity e);
	public abstract Iterable<Entity> ls(String path);
	public void removeItemEntity(Entity e);

}