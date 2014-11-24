package jp.tonyu.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import javax.servlet.http.HttpServletRequest;

public interface ServletCartridge {
	public boolean get(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	public boolean post(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
