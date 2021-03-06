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

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ACAdmissionIntervalControl } from '../interfaces/ac-xapp.types';
import { RicInstance } from '../interfaces/dashboard.types';
import { ACXappService } from '../services/ac-xapp/ac-xapp.service';
import { InstanceSelectorService } from '../services/instance-selector/instance-selector.service';
import { ErrorDialogService } from '../services/ui/error-dialog.service';
import { NotificationService } from '../services/ui/notification.service';

@Component({
  selector: 'rd-ac-xapp',
  templateUrl: './ac-xapp.component.html',
  styleUrls: ['./ac-xapp.component.scss']
})
export class AcXappComponent implements OnInit, OnDestroy {

  //declare acForm as Public variable. Private variables should not be used in template HTML
  acForm: FormGroup;
  private instanceChange: Subscription;
  private instanceKey: string;

  constructor(
    private acXappService: ACXappService,
    private errorDialogService: ErrorDialogService,
    private notificationService: NotificationService,
    public instanceSelectorService: InstanceSelectorService, ) { }

  ngOnInit() {
    this.acForm = new FormGroup({
      // Names must match the ACAdmissionIntervalControl interface
      enforce: new FormControl(true, [Validators.required]),
      class: new FormControl('', [Validators.required, Validators.min(1), Validators.max(256)]),
      window_length: new FormControl('', [Validators.required, Validators.min(15), Validators.max(300)]),
      blocking_rate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      trigger_threshold: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.instanceChange = this.instanceSelectorService.getSelectedInstance().subscribe((instance: RicInstance) => {
      if (instance.key) {
        // TODO: show pending action indicator
        this.instanceKey = instance.key;
        this.acXappService.getPolicy(instance.key).subscribe((res: ACAdmissionIntervalControl) => {
          this.acForm.controls['class'].setValue(res.class);
          this.acForm.controls['enforce'].setValue(res.enforce);
          this.acForm.controls['window_length'].setValue(res.window_length);
          this.acForm.controls['blocking_rate'].setValue(res.blocking_rate);
          this.acForm.controls['trigger_threshold'].setValue(res.trigger_threshold);
          // TODO: clear pending action indicator
        },
          (error: HttpErrorResponse) => {
            // TODO: clear pending action indicator
            this.errorDialogService.displayError(error.message);
          });
      }
    });
  }

  ngOnDestroy() {
    this.instanceChange.unsubscribe();
  }

  updateAc = (acFormValue: ACAdmissionIntervalControl) => {
    if (this.acForm.valid) {
      // convert strings to numbers using the plus operator
      const acFormValueConverted = {
        class: +acFormValue.class,
        enforce: acFormValue.enforce,
        window_length: +acFormValue.window_length,
        blocking_rate: +acFormValue.blocking_rate,
        trigger_threshold: +acFormValue.trigger_threshold
      };
      this.acXappService.putPolicy(this.instanceKey, acFormValueConverted).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationService.success('AC update policy succeeded!');
          }
        },
        (error => {
          this.errorDialogService.displayError('AC update policy failed: ' + error.message);
        })
      );
    }
  }

  hasError(controlName: string, errorName: string) {
    if (this.acForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  validateControl(controlName: string) {
    if (this.acForm.controls[controlName].invalid && this.acForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

}
