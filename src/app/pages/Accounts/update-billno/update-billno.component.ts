import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../_service/indexService';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-update-billno',
  templateUrl: './update-billno.component.html',
  styleUrls: ['./update-billno.component.scss']
})
export class UpdateBillnoComponent implements OnInit {
  form; invid; config; item;

  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private ser: AccountService,
  ) { }

  closeModal() {
    this.activeModal.close();
  }
  ngOnInit() {
    this.createForm();

  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    let result = await this.ser.updateGstBillNo(this.form.value)
    const toast: Toast = {
      type: result['error_msg'] == 0? 'success' : 'warning',
      title: result['error_msg'] == 0 ? 'Success' : 'Failure',
      body: result['msg'],
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
    if (result['error_msg'] == 0) {
      this.closeModal();
      // this.router.navigate(['/pages/cust/viewcust'])
    }
  }

  createForm() {
    this.form = new FormGroup({
      invid: new FormControl(this.invid, Validators.required),
      billno: new FormControl('', Validators.required),

    });
  }
}