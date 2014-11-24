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

import jp.tonyu.debug.Log;
import jp.tonyu.js.Wrappable;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.WrapFactory;


public class SafeWrapFactory extends WrapFactory {
	public SafeWrapFactory() {
		setJavaPrimitiveWrap(false);
	}

	@Override
	public Scriptable wrapAsJavaObject(Context cx, Scriptable scope,
			Object javaObject, Class<?> staticType) {
		/*if (javaObject instanceof String ||
				javaObject instanceof Number ||
				javaObject instanceof Boolean ||
				javaObject instanceof org.mozilla.javascript.EvaluatorException ||
				javaObject instanceof org.mozilla.javascript.EcmaError ||
				javaObject instanceof org.mozilla.javascript.JavaScriptException ||
				//javaObject instanceof org.mozilla.javascript.JavaException ||
					javaObject instanceof Wrappable ) {
			return super.wrapAsJavaObject(cx, scope, javaObject, staticType);
		}*/
	    //System.out.println("Wrap "+javaObject+"("+javaObject.getClass()+") in scope "+scope);
		if (javaObject instanceof Map) {
			return new MapScriptable((Map)javaObject);
		}
		/*if (javaObject instanceof List) {
            List ls = (List) javaObject;
            NativeArray na = new NativeArray(ls.toArray());
            System.out.println("shift="+ScriptableObject.getProperty(na, "shift"));

            return na;
        }
		if (javaObject instanceof Object[]) {
            Object[] ar = (Object[]) javaObject;
            return new NativeArray(ar);
        }*/
		return super.wrapAsJavaObject(cx, scope, javaObject, staticType);
		//Log.die(javaObject.getClass()+": Only Wrappable can be wrapped.");
		//return null;
	}
}