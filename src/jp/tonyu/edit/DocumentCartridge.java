package jp.tonyu.edit;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.tonyu.fs.GLSFile;
import jp.tonyu.servlet.ServletCartridge;

public class DocumentCartridge implements ServletCartridge {

    private static final String DOC = "/doc/";
    FS fs;
    public DocumentCartridge(FS fs) {
        super();
        this.fs = fs;
    }

    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u = req.getPathInfo();
        if (u.startsWith(DOC)) {
            String path=u.substring(DOC.length());
            path="/Tonyu/doc/html/"+path;
            GLSFile file = fs.get(path);
            resp.setContentType("text/html; charset=utf8");
            resp.getWriter().print(         file.text());
            return true;
        }
        return false;
    }

    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        // TODO 自動生成されたメソッド・スタブ
        return false;
    }

}
