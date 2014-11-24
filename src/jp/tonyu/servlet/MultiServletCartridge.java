package jp.tonyu.servlet;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MultiServletCartridge implements ServletCartridge {
	Vector<ServletCartridge> cartridges=new Vector<ServletCartridge>();
	public Vector<ServletCartridge> getCartridges() {
		return cartridges;
	}
	public MultiServletCartridge(ServletCartridge... cs) {
		for (ServletCartridge c:cs) {
			insert(c);
		}
	}
	@Override
	public boolean get(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		for (ServletCartridge c:cartridges) {
			if (c.get(req, resp)) return true;
		}
		return false;
	}

	@Override
	public boolean post(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		for (ServletCartridge c:cartridges) {
			if (c.post(req, resp)) return true;
		}
		return false;
	}
	public void insert(ServletCartridge c) {
		cartridges.add(c);
	}
}
