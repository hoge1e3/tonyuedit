package jp.tonyu.edit;

import jp.tonyu.js.Wrappable;

public class Console implements Wrappable {
	public void log(Object value) {
		System.out.println("console.log: "+value+(value!=null?"("+value.getClass()+")":""));
	}
}
