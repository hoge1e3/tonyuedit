package jp.tonyu.fs;

import java.io.IOException;

import javax.servlet.ServletContext;

import jp.tonyu.edit.JSRun;
import jp.tonyu.js.Wrappable;
import jp.tonyu.util.Streams;

public class RS implements Wrappable {
    ServletContext ctx;
    JSRun jsrun;
    public String text(String path) throws IOException {
        return Streams.stream2str(ctx.getResourceAsStream(path));
    }
    public Object require(String path) throws IOException {
        return jsrun.eval(path, text(path));
    }
}
