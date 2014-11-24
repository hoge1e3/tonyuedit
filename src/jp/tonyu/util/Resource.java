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

package jp.tonyu.util;

import java.util.Scanner;


public class Resource {
	public static String text(Class klass,String ext) {
		Scanner in= new Scanner(
				klass.getResourceAsStream(klass.getSimpleName()+ext)
				);
		StringBuilder buf=new StringBuilder();
		while (in.hasNextLine()) {
			buf.append(in.nextLine()+"\n");
		}
		in.close();
		return buf+"";
	}

}