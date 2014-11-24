package jp.tonyu.util.col;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.Vector;

public class Mapper<E,T> implements Iterable<E>{
    Iterable<E> target;
    Collection<T> res;
    public Mapper(Iterable<E> collection, Collection<T> result) {
        target=collection;
        res=result;
    }
    public void add(T t) {
        res.add(t);
    }
    public static <E,T> Mapper<E,T> start(Iterable<E> collection, Class<T> to) {
        return new Mapper<E,T>(collection, new Vector<T>());
    }
    @Override
    public Iterator<E> iterator() {
        return target.iterator();
    }
    public Collection<T> result() {
        return res;
    }
    public T[] toArray(Class<E> c) {
        T[] p=(T[])Array.newInstance(c, 0);
        return res.toArray(p);
    }
}
