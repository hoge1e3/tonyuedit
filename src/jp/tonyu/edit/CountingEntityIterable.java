package jp.tonyu.edit;

import java.util.Iterator;

import jp.tonyu.fs.LSEmulator;

import com.google.appengine.api.datastore.Entity;

public class CountingEntityIterable implements Iterable<Entity> {
    Iterable<Entity> src;
    @Override
    public Iterator<Entity> iterator() {
        final Iterator<Entity> it=src.iterator();
        return new Iterator<Entity>() {

            @Override
            public boolean hasNext() {
                return it.hasNext();
            }

            @Override
            public Entity next() {
                countup();
                Entity e = it.next();
                //System.out.println(getCount()+": path="+e.getProperty(LSEmulator.KEY_DIR)+e.getProperty(LSEmulator.KEY_NAME));
                return e;
            }

            @Override
            public void remove() {
                it.remove();
            }

        };
    }
    public CountingEntityIterable(Iterable<Entity> src) {
        super();
        this.src = src;
    }
    static ThreadLocal<Integer> counter=new ThreadLocal<Integer>();
    public static void countup() {
        counter.set(getCount()+1);
    }
    public static void reset() {
        counter.set(0);
    }
    public static int getCount() {
        Integer c=counter.get();
        if (c==null) c=0;
        return c;
    }

}
