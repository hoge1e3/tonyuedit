package jp.tonyu.edit;

import jp.tonyu.fs.GLSFile;
import jp.tonyu.fs.LSEmulator;
import jp.tonyu.js.Wrappable;

public class FS implements Wrappable {
	/**
	 *
	 */
	private final LSEmulator localStorage;

    /**
	 * @param jsRun
	 */
	public FS(LSEmulator ls) {
		this.localStorage = ls;
	}

	public GLSFile get(String path) {
		return new GLSFile(localStorage, path);
	}
}