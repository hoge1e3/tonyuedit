package jp.tonyu.util.col;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.Vector;

public class Filter<E> implements Iterable<E>{
    Iterable<E> target;
    Collection<E> res;
    public Filter(Iterable<E> collection, Collection<E> result) {
        target=collection;
        res=result;
    }
    boolean judged=true;
    public void include(boolean i) {
        if (judged) throw new RuntimeException("Already judged");
        judged=true;
        if (i) res.add(cur);
    }
    E cur;
    public static <E> Filter<E> start(Iterable<E> collection) {
        return new Filter<E>(collection, new Vector<E>());
    }
    @Override
    public Iterator<E> iterator() {
        judged=true;
        return new Iterator<E>() {
            Iterator<E> it = target.iterator();
            @Override
            public boolean hasNext() {
                boolean hasNext = it.hasNext();
                return hasNext;
            }

            @Override
            public E next() {
                if (!judged) throw new RuntimeException(Filter.this+": Not judged");
                judged=false;
                return cur=it.next();
            }


            @Override
            public void remove() {
                // TODO 自動生成されたメソッド・スタブ

            }
        };
    }
    public Collection<E> result() {
        return res;
    }
    public E[] toArray(Class<E> c) {
        E[] p=(E[])Array.newInstance(c, 0);
        return res.toArray(p);
    }
    public void exclude(boolean e) {
        include(!e);
    }
}
