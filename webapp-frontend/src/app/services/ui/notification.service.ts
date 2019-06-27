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

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  successConfig: MatSnackBarConfig = {
    duration: 10000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  warningConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  errorConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  success(msg: string) {
    this.successConfig['panelClass'] = ['notification', 'success', 'default'];
    this.snackBar.open(msg, '', this.successConfig);
  }

  warn(msg: string) {
    this.warningConfig['panelClass'] = ['notification', 'warn', 'default'];
    this.snackBar.open(msg, 'Dismiss', this.warningConfig);
  }

  error(msg: string) {
    this.errorConfig['panelClass'] = ['notification', 'error', 'default'];
    this.snackBar.open(msg, 'Dismiss', this.errorConfig);
  }
}
