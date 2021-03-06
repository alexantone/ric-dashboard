/*-
 * ========================LICENSE_START=================================
 * O-RAN-SC
 * %%
 * Copyright (C) 2020 AT&T Intellectual Property
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
package org.oransc.ric.portal.dashboard.config.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.oransc.ric.e2mgr.client.api.HealthCheckApi;
import org.oransc.ric.e2mgr.client.api.NodebApi;
import org.oransc.ric.portal.dashboard.config.E2ManagerApiBuilder;
import org.oransc.ric.portal.dashboard.config.RICInstanceMockConfiguration;

public class E2ManagerConfigTest extends AbstractConfigTest {

	@Test
	public void builderTest() {
		E2ManagerApiBuilder builder = new E2ManagerApiBuilder(instanceConfig, "suffix");
		HealthCheckApi healthApi = builder.getHealthCheckApi(RICInstanceMockConfiguration.INSTANCE_KEY_1);
		Assertions.assertNotNull(healthApi);
		NodebApi nodebApi = builder.getNodebApi(RICInstanceMockConfiguration.INSTANCE_KEY_1);
		Assertions.assertNotNull(nodebApi);
	}

}
