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
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { XappControlRow } from '../interfaces/app-mgr.types';
import { RicInstance } from '../interfaces/dashboard.types';
import { AppMgrService } from '../services/app-mgr/app-mgr.service';
import { InstanceSelectorService } from '../services/instance-selector/instance-selector.service';
import { ConfirmDialogService } from '../services/ui/confirm-dialog.service';
import { ErrorDialogService } from '../services/ui/error-dialog.service';
import { LoadingDialogService } from '../services/ui/loading-dialog.service';
import { NotificationService } from '../services/ui/notification.service';
import { AppControlAnimations } from './app-control.animations';
import { AppControlDataSource } from './app-control.datasource';

@Component({
  selector: 'rd-app-control',
  templateUrl: './app-control.component.html',
  styleUrls: ['./app-control.component.scss'],
  animations: [AppControlAnimations.messageTrigger]
})
export class AppControlComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['xapp', 'name', 'status', 'ip', 'port', 'action'];
  dataSource: AppControlDataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private instanceChange: Subscription;
  private instanceKey: string;

  constructor(
    private appMgrSvc: AppMgrService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private errorDialogService: ErrorDialogService,
    private loadingDialogService: LoadingDialogService,
    public instanceSelectorService: InstanceSelectorService,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.dataSource = new AppControlDataSource(this.appMgrSvc, this.sort, this.notificationService);
    this.instanceChange = this.instanceSelectorService.getSelectedInstance().subscribe((instance: RicInstance) => {
      if (instance.key) {
        this.instanceKey = instance.key;
        this.dataSource.loadTable(instance.key);
      }
    });
  }

  ngOnDestroy() {
    this.instanceChange.unsubscribe();
  }

  controlApp(app: XappControlRow): void {
    // TODO: identify apps without hardcoding to names
    const acAppPattern0 = /[Aa][Dd][Mm][Ii][Nn]/;
    const acAppPattern1 = /[Aa][Dd][Mm][Ii][Ss]{2}[Ii][Oo][Nn]/;
    if (acAppPattern0.test(app.xapp) || acAppPattern1.test(app.xapp)) {
      this.router.navigate(['/ac']);
    } else {
      this.errorDialogService.displayError('No control available for ' + app.xapp + ' (yet)');
    }
  }

  onUndeployApp(app: XappControlRow): void {
    this.confirmDialogService.openConfirmDialog('Are you sure you want to undeploy App ' + app.xapp + '?')
      .afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.loadingDialogService.startLoading('Undeploying ' + app.xapp);
          this.appMgrSvc.undeployXapp(this.instanceKey, app.xapp)
            .pipe(
              finalize(() => this.loadingDialogService.stopLoading())
            )
            .subscribe(
              (httpResponse: HttpResponse<Object>) => {
                // Answers 204/No content on success
                this.notificationService.success('App undeployed successfully!');
                this.dataSource.loadTable(this.instanceKey);
              },
              ((her: HttpErrorResponse) => {
                // the error field should have an ErrorTransport object
                let msg = her.message;
                if (her.error && her.error.message) {
                  msg = her.error.message;
                }
                this.notificationService.warn('App undeploy failed: ' + msg);
              })
            );
        }
      });
  }

}
