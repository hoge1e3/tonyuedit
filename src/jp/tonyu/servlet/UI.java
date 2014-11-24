package jp.tonyu.servlet;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import jp.tonyu.util.Html;

public class UI {
    String tag;
    Map<String, String> attrs=new HashMap<String, String>();
    List<Object> elements=new Vector<Object>();
    public UI(String tag,Object...e) {
        this.tag=tag;
        e(e);
    }
    public UI e(Object...e) {
        for (Object ee:e) {
            elements.add(ee);
        }
        return this;
    }
    @Override
    public String toString() {
        StringBuffer buf=new StringBuffer();
        toString(buf);
        return buf+"";
    }
    static Set<String> alwaysClose=new HashSet<String>();
    static {
        alwaysClose.add("textarea");
        alwaysClose.add("button");
        alwaysClose.add("div");
        alwaysClose.add("span");
    }
    private void toString(StringBuffer buf) {
        if (tag==null) return;
        buf.append("<"+tag);
        for (Map.Entry<String, String> e:attrs.entrySet()) {
            buf.append(Html.p(" %t=%a", e.getKey(), e.getValue() ));
        }
        if (!alwaysClose.contains(tag.toLowerCase()) && elements.size()==0) {
            buf.append("/>");
            return;
        }
        buf.append(">");
        for (Object el:elements) {
            if (el instanceof UI) {
                UI u = (UI) el;
                u.toString(buf);
            } else if (el!=null){
                buf.append(el);
            }
        }
        buf.append("</"+tag+">");
        return;
    }
    public static UI t(String t,Object...e) {
        return new UI(t,e);
    }
    public UI a(String key,Object value) {
        attrs.put(key, value+"");
        return this;
    }
}
