import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResellerService, RoleService,NasService } from '../../_service/indexService';
@Component({
  selector: 'editnas',
  templateUrl: './editnas.component.html',

})

export class EditNasComponent implements OnInit {
  submit: boolean = false; AddNasForm; datas; id; modalHeader; config;anas;
  item;
  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private ser: ResellerService,
    private nasser : NasService,
    private router: Router,
    public role : RoleService,
  ) { this.id = JSON.parse(localStorage.getItem('details')) }

  closeModal() {
    this.activeModal.close();
  }
  async ngOnInit() {
    await this.shownas();
    this.createForm();

  }

  async shownas($event=''){
    this.anas = await this.nasser.showGroupNas({ like: $event,bus_id:this.item['bus_id'],groupid:this.item['groupid']  });
  }

  async editreselNas() {
    if (this.AddNasForm.invalid) {
      this.submit = true;
      return;
    }
    this.AddNasForm.value['id'] = this.item['id']
    let result = await this.ser.updateResellerNas(this.AddNasForm.value)
    this.datas = result;

    const toast: Toast = {
      type: result[0]['error_msg'] == 0 ? 'success' : 'warning',
      title: result[0]['error_msg'] == 0 ? 'Success' : 'Failure',
      body: result[0]['msg'],
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
    if (result[0]['error_msg'] == 0) {
      await this.closeModal();

    }
  }

  createForm() {
    this.AddNasForm = new FormGroup({
      nas_id: new FormControl(this.item ? this.item['nas_id']:'',Validators.required),
    });
  }
}