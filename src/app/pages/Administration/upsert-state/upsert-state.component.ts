import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { SelectService } from '../../_service/selectservice';

@Component({
  selector: 'ngx-upsert-state',
  templateUrl: './upsert-state.component.html',
  styleUrls: ['./upsert-state.component.scss']
})
export class UpsertStateComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes; servtype; custname;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  form!: FormGroup;
  data;
  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private service:SelectService
  ) {
    this.createForm()
  }

  ngOnInit() {
    if (this.data) this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data? this.data.name :'', Validators.required),
      gstno: new FormControl(this.data?this.data.gstno : '')
    })
  }

  get val() {
    return this.form.value
  }

  get ctrl() {
    return this.form.controls
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    const method = this.data.id ? 'updateState' : 'addState'
    const value = this.data.id ? { ...this.val, id: this.data.id } : { ...this.val };
    let result = await this.service[method](value)
    if (result[0]['error_msg'] == 0) {
      this.closeModal();
      this.toastalert(result[0]['msg'],result[0]['error_msg'])
    } else {
      this.toastalert(result[0]['msg'],result[0]['error_msg'])
    }
  }

  closeModal() {
    this.activeModal.close();
    // this.router.navigate(['/pages/Accounts/listreceipt']);
  }

  toastalert(msg, status = 0) {
    const toast: Toast = {
      type: status == 0 ? 'success' : 'warning',
      title: status == 0 ? 'Success' : 'Failure',
      body: msg,
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
  }

}
