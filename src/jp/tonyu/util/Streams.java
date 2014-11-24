package jp.tonyu.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class Streams {
	public static String stream2str(InputStream in) throws IOException {
		InputStreamReader rd= new InputStreamReader(in,"utf8");
		StringBuffer buf=new StringBuffer();
    	char[] c=new char[1024];
    	while (true) {
    		int len=rd.read(c);
    		if (len<=0) break;
    		buf.append(c,0,len);
    	}
    	rd.close();
    	return buf.toString();
	}

	public static void redirect(InputStream in, OutputStream out)
			throws IOException {
		byte[] b = new byte[1024];
		while (true) {
			int r = in.read(b);
			if (r <= 0) break;
			out.write(b, 0, r);
		}
		//in.close();  not suitable if in is a ZipInputStream.
	}

}
