package jp.tonyu.util;

public class Convert {
    public static int toIntDef(Object o, int def) {
        if (o instanceof Number) {
            Number n = (Number) o;
            return n.intValue();
        }
        if (o instanceof String) {
            String str = (String) o;
            try {
                return Integer.parseInt(str);
            } catch(NumberFormatException e) {
            }
        }
        return def;
    }
}
