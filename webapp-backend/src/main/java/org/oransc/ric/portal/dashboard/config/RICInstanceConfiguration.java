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

package org.oransc.ric.portal.dashboard.config;

import java.util.ArrayList;
import java.util.List;

import org.oransc.ric.portal.dashboard.model.RicInstance;
import org.oransc.ric.portal.dashboard.model.RicInstanceList;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Publishes a list of RIC instances from configuration, written as a YAML list
 * in application properties like this:
 * 
 * <pre>
 * ric-instance-list:
    instances:
        -
          key: key1
          name: Friendly Name One
          urlPrefix: http://foo.bar.one/
        -
          key: key2
          name: Friendly Name Two
          urlPrefix: http://foo.bar.two/
 * </pre>
 */
@Configuration
@ConfigurationProperties(prefix = "ric-instance-list")
@Profile("!test")
public class RICInstanceConfiguration {

	private List<RicInstance> instances = new ArrayList<>();

	// Called by spring with config data
	public void setInstances(List<RicInstance> instances) {
		this.instances = instances;
	}

	@Bean
	public RicInstanceList ricInstanceList() {
		return new RicInstanceList(instances);
	}

}