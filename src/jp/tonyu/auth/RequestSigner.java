package jp.tonyu.auth;

import java.security.NoSuchAlgorithmException;

import jp.tonyu.edit.EQ;
import jp.tonyu.util.MD5;

public class RequestSigner {
    OAuthKeyDB okb;

    public RequestSigner(OAuthKeyDB okb) {
        super();
        this.okb = okb;
    }
    public String sum(String param) {
        try {
            return MD5.crypt(param+getSalt());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";
        }

    }
    public boolean chk(String param, String chk) {
        try {
            return MD5.crypt(param+getSalt()).equals(chk);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return false;
        }
    }
    String salt=null;
    public String getSalt() {
        if (salt!=null) return salt;
        EQ eq = okb.get("tonyu_comm", false);
        if (eq.isEmpty()) throw new RuntimeException("tonyu_comm not set");
        salt=eq.attr(OAuthKeyDB.KEY_SECRET)+"";
        return salt;
    }

}
