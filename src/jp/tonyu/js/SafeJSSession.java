/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package jp.tonyu.js;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import jp.tonyu.debug.Log;
import jp.tonyu.js.BuiltinFunc;
import jp.tonyu.js.ContextRunnable;
import jp.tonyu.js.Wrappable;
import jp.tonyu.util.col.MapAction;
import jp.tonyu.util.col.Maps;

import org.mozilla.javascript.ClassShutter;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeJavaObject;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

public class SafeJSSession {
	public final Scriptable root;
	public static boolean optimize=false;
	private Scriptable initObject(Context cx) {
		ScriptableObject o=cx.initStandardObjects();
		removeNonStandards(o);
		ScriptableObject.putProperty(o, "session", o);
		return o;
	}
	public static ScriptableObject removeNonStandards(ScriptableObject o) {
		String[] builtinsa=new String[] {"String","Boolean","Number","Function","Object","Array","RegExp","undefined","null","true","false"
				,"NaN","Infinity","Date","Math","parseInt","parseFloat", "TypeError","InternalError","JSON"};
		Set<String> builtins=new HashSet<String>();
		for (String s:builtinsa) {
			builtins.add(s);
		}
		for (Object i: o.getAllIds()) {
			if (!builtins.contains(i)) {
				o.delete((String)i);
			} else {
				Object object = o.get(i.toString(),null);
				if (object instanceof NativeJavaObject) {
					NativeJavaObject j = (NativeJavaObject) object;
					//Log.w("Runscript","Native java Object:"+j);
				}
			}
		}
		return o;
	}
	public SafeJSSession() {
		Context c=Context.enter();
		root=initObject(c);
		funcFactory=(Function) ScriptableObject.getProperty(root, "Function");
		objFactory=(Function) ScriptableObject.getProperty(root, "Object");
		aryFactory=(Function) ScriptableObject.getProperty(root, "Array");
		Context.exit();
	}
	static BuiltinFunc bindings=new BuiltinFunc() {
		@Override
		public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
			return scope;
		}
	};
	Function objFactory, aryFactory, funcFactory;
	public void putToRoot(String name, Object val) {
		ScriptableObject.putProperty(root, name, val);
	}
	public Object getFromRoot(String name) {
		return ScriptableObject.getProperty(root, name);
	}
	public Scriptable newObject() {
		ContextHolder h=newContextHolder();
		try {
			return objFactory.construct(h.get(), root, new Object[0]);
		} finally {
			h.release();
		}
	}
	public Scriptable newArray() {
		ContextHolder h=newContextHolder();
		try {
			return aryFactory.construct(h.get(), root, new Object[0]);
		} finally {
			h.release();
		}
	}
	public Object eval(String name, String s) {
		return eval(name, s, new HashMap<String, Object>());
	}
	/**
	 * Warning! scope must have root as parent scope
	 *
	 * @param name
	 * @param s
	 * @param scope
	 *            scope must have root as parent scope
	 * @return
	 */
	public Object eval(final String name, final String s, final Scriptable scope) {
		ContextHolder h=newContextHolder();
		try {
			Object result=h.evaluateString(scope, s, name, 1, null);
			return result;
		} catch (EvaluatorException e) {
			e.printStackTrace();
			Log.die("JS -error at ||"+e.lineSource()+"|| "+e.details());
			return null;
		} finally {
			h.release();
		}
	}
	@SuppressWarnings("serial")
	public Object eval(final String name, final String s, final Map<String, Object> scope) {
		ContextHolder h=newContextHolder();
		try {
			final Scriptable s2=new ScriptableObject(root, null) {
				@Override
				public String getClassName() {
					return "Scope";
				}
			};
			Maps.entries(scope).each(new MapAction<String, Object>() {
				@Override
				public void run(String key, Object value) {
					s2.put(key, s2, value);
				}
			});
			Object result=h.evaluateString(s2, s, name, 1, null);
			return result;
		} catch (EvaluatorException e) {
			Log.die("JS -error at ||"+e.lineSource()+"|| "+e.details());
			return null;
		} finally {
			h.release();
		}
	}
	public Object call(final Function f, final Object[] args) {
		return call(f, root, args);
	}
	public Object call(final Function f, final Scriptable thisObject, final Object[] args) {
		ContextHolder h=newContextHolder();
		try {
			Object result=f.call(h.get(), root, thisObject, args);
			return result;
		} finally {
			h.release();
		}
	}
	public Object construct(final Function f,  final Object[] args) {
		ContextHolder h=newContextHolder();
		try {
			Object result=f.construct(h.get(), root, args);
			return result;
		} finally {
			h.release();
		}
	}


	/*public static Object withContext(ContextRunnable action) {
		Context cx=Context.getCurrentContext();
		if (cx!=null) {
			return action.run(cx);
		}
		cx = newContext();
		try {
			return action.run(cx);
		} finally {
			Context.exit();
		}
	}*/
	public static ContextHolder newContextHolder() {
		ContextHolder h = new ContextHolder() {
			@Override
			public void onEnter(Context c) {
				initContext(c);
			}
		};
		return h;
	}
	private static Context initContext(Context cx) {
		if (!optimize) cx.setOptimizationLevel(-1);
		cx.setClassShutter(new ClassShutter() {
			Map<String, Boolean> cache=new HashMap<String, Boolean>();
			@Override
			public boolean visibleToScripts(String fullClassName) {
				if (cache.containsKey(fullClassName)) {
					return cache.get(fullClassName);
				}
				try {
					boolean res=false;
					Class<?> c=Class.forName(fullClassName);
					res=(Object.class.equals(c))||(Wrappable.class.isAssignableFrom(c))
							||(Exception.class.isAssignableFrom(c));
					//Log.d("ClassShutter", fullClassName+" - "+res);
					cache.put(fullClassName, res);
					return res;
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
				return false;
			}
		});
		cx.setWrapFactory(new SafeWrapFactory());
		return cx;
	}
}