/*-
 * ========================LICENSE_START=================================
 * O-RAN-SC
 * %%
 * Copyright (C) 2019 AT&T Intellectual Property
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================LICENSE_END===================================
 */
package org.oransc.ric.portal.dashboard.model;

import java.time.Instant;

public abstract class AbstractModelTest {

	// Values for properties
	final boolean b1 = true;
	final boolean b2 = false;
	final byte[] by1 = { 0, 1, 2, 3 };
	final Instant t1 = Instant.now().plusSeconds(1);
	final Instant t2 = Instant.now().plusSeconds(2);
	final Instant t3 = Instant.now().plusSeconds(3);
	final Instant t4 = Instant.now().plusSeconds(4);
	final Instant t5 = Instant.now().plusSeconds(5);
	final Instant t6 = Instant.now().plusSeconds(6);
	final Integer i1 = 1;
	final Integer i2 = 2;
	final Integer i3 = 3;
	final Integer i4 = 4;
	final Integer i5 = 5;
	final Long l1 = 1L;
	final Long l2 = 2L;
	final Long l3 = 3L;
	final Long l4 = 4L;
	final String s1 = "string1";
	final String s2 = "string2";
	final String s3 = "string3";
	final String s4 = "string4";
	final String s5 = "string5";
	final String s6 = "string6";
	final String s7 = "string7";
	final String s8 = "string8";
	final String s9 = "string9";
	final String s10 = "string10";
	final String s11 = "string11";
	final String s12 = "string12";
	final String s13 = "string13";
	final String u1 = "http://foo.com";
	final String u2 = "http://bar.com";

}
