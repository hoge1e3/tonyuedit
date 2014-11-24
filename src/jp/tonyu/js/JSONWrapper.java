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

import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import net.arnx.jsonic.JSON;
import jp.tonyu.js.BlankScriptableObject;
import jp.tonyu.js.Scriptables;
import jp.tonyu.js.Wrappable;
import jp.tonyu.util.col.MapAction;
import jp.tonyu.util.col.Maps;

public class JSONWrapper implements Wrappable{
	SafeJSSession jsSession;
	public JSONWrapper(SafeJSSession jsSession) {
		super();
		this.jsSession = jsSession;
	}
	JSON json=new JSON() {
		protected Object preformat(Context context, Object value) throws Exception {
			//System.out.println("preform "+value);
			if (value instanceof NativeArray) {
				NativeArray ar = (NativeArray) value;
				return Scriptables.toArray(ar);
			} else if (value instanceof Scriptable) {
				Scriptable s = (Scriptable) value;
				return Scriptables.toStringKeyMap(s);
			}
			return super.preformat(context, value);
		}

	};
	public void setPrettyPrint(boolean p) {
		json.setPrettyPrint(p);
	}
	protected Object postparse(Object value, final SafeJSSession jssession) {
		if (value instanceof Map) {
			Map<Object,Object> m=(Map<Object,Object>)value;
			//final BlankScriptableObject res = new BlankScriptableObject();
			final Scriptable res=jssession.newObject();
			Maps.entries(m).each(new MapAction<Object, Object>() {
				@Override
				public void run(Object key, Object value) {
					Scriptables.put(res, key+"", postparse(value,jssession));
				}
			});
			return res;
		}
		if (value instanceof List<?>) {
			//Vector<Object> rv=new Vector<Object>();
			Scriptable a = jssession.newArray();
			int i=0;
			for (Object o:(List<?>)value) {
				ScriptableObject.putProperty(a, i, postparse(o,jssession));
				i++;
			}
			return a;
		}
		return value;
	}

	public String format(Object s) {
		return 	json.format(s);
	}
	public String stringify(Object s) {
		return 	json.format(s);
	}
	public Object parse(String source) {
		Object r=json.parse(source);
		return postparse(r,jsSession);
	}
}