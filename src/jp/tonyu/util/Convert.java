package jp.tonyu.util;

public class Convert {
    public static int toIntDef(Object o, int def) {
        if (o instanceof Number) {
            Number n = (Number) o;
            return n.intValue();
        }
        return def;
    }
}
