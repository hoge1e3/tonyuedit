package jp.tonyu.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


public class OnMemorySession<E> {
	public static <S> OnMemorySession<S> create(Class<S> klass, long timeout) {
		return new OnMemorySession<S>(klass, timeout);
	}
	long timeout;
	class Entry {
		long start;
		E data;
		public Entry(E data) {
			this.data=data;
			start=System.currentTimeMillis();
		}
	}
	Class<E> klass;
	public OnMemorySession(Class<E> klass, long timeout) {
		this.klass=klass;
		this.timeout=timeout;
	}
	Map<String, Entry> instances=new HashMap<String, Entry>();
	public synchronized E get(HttpServletRequest req) {
		clean(timeout);
		HttpSession s = req.getSession();
		Entry res=instances.get(s.getId());
		if (res!=null) return res.data;
		try {
			res = new Entry(klass.newInstance());
			instances.put(s.getId(), res );
			return res.data;
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}
	public synchronized void clean(long timeout) {
		Iterator<String> it = instances.keySet().iterator();
		long cur=System.currentTimeMillis();
		while (it.hasNext()) {
			String key=it.next();
			Entry e=instances.get(key);
			if (e.start+timeout<cur) {
				it.remove();
			}
		}
	}
}
