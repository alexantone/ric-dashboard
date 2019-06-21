/*-
 * ========================LICENSE_START=================================
 * O-RAN-SC
 * %%
 * Copyright (C) 2019 AT&T Intellectual Property and Nokia
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
package org.oransc.ric.portal.dashboard.controller;

import java.lang.invoke.MethodHandles;

import org.oransc.ric.portal.dashboard.DashboardApplication;
import org.oransc.ric.portal.dashboard.DashboardConstants;
import org.oransc.ric.portal.dashboard.model.DashboardUser;
import org.oransc.ric.portal.dashboard.model.SuccessTransport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

/**
 * Answers REST requests for admin services like version, health etc.
 */
@RestController
@RequestMapping(value = DashboardConstants.ENDPOINT_PREFIX + "/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {

	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	private final DashboardUser[] users;

	public AdminController() {
		// Mock data
		users = new DashboardUser[] { //
				new DashboardUser(1, "John", "Doe", "Active"), //
				new DashboardUser(2, "Alice", "Nolan", "Active"), //
				new DashboardUser(3, "Pierce", "King", "Inactive"), //
				new DashboardUser(4, "Paul", "Smith", "Inactive"), //
				new DashboardUser(5, "Jack", "Reacher", "Active") };
	}

	@ApiOperation(value = "Gets the Dashboard MANIFEST.MF property Implementation-Version.", response = SuccessTransport.class)
	@RequestMapping(value = DashboardConstants.VERSION_PATH, method = RequestMethod.GET)
	public SuccessTransport getVersion() {
		logger.debug("getVersion");
		return new SuccessTransport(200,
				DashboardApplication.getImplementationVersion(MethodHandles.lookup().lookupClass()));
	}

	@ApiOperation(value = "Checks the health of the application.", response = SuccessTransport.class)
	@RequestMapping(value = DashboardConstants.HEALTHCHECK_PATH, method = RequestMethod.GET)
	public SuccessTransport getHealth() {
		logger.debug("getHealth");
		return new SuccessTransport(200, "Dashboard is healthy!");
	}

	@ApiOperation(value = "Gets the list of application users.", response = DashboardUser.class, responseContainer = "List")
	@RequestMapping(value = DashboardConstants.USER_PATH, method = RequestMethod.GET)
	public DashboardUser[] getUsers() {
		logger.debug("getUsers");
		return users;
	}

}