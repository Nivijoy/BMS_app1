import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResellerService, BusinessService, RoleService, PagerService, IppoolService } from '../../_service/indexService';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AddSuccessComponent } from './../success/add-success.component';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-list-renew-publicip',
  templateUrl: './list-renew-publicip.component.html',
  styleUrls: ['./list-renew-publicip.component.scss']
})
export class ListRenewPublicipComponent implements OnInit {
  data; totalpage = 10; pages = [1, 2, 3, 4, 5]; count; bus; bus_name; search; pro; res_name = '';
  resel_type = ''; stat_ip='';res1; start_date = ''; end_date = '';ipdata;
  pager: any = {}; page: number = 1; pagedItems: any = []; limit: number = 25;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;

  constructor(
    private nasmodel: NgbModal,
    private busser: BusinessService,
    private resser: ResellerService,
    public role: RoleService,
    public pageservice: PagerService,
    private poolser: IppoolService,
    private datePipe:DatePipe
  ) { }

  async ngOnInit() {
    await this.initiallist();
    await this.showBusName();
    if (this.role.getroleid() <= 777) {
      this.bus_name = this.role.getispid();
      await this.profile();
      await this.showResellerName();
    }
    if(this.role.getroleid()<775){
      // this.res_name = this.role.getresellerid();
      await this.showip();
    }
  }

  async showBusName($event = '') {
    this.bus = await this.busser.showBusName({ like: $event });
  }

  async profile($event = '') {
    this.pro = await this.resser.showProfileReseller({ rec_role: 1, bus_id: this.bus_name, like: $event });
    // console.log(res)
  }

  async showResellerName($event = '') {
    // console.log('inside', this.resel_type)
    this.res1 = await this.resser.showResellerName({ bus_id:this.bus_name,role: this.resel_type, like: $event });
    // console.log("resellername",result)
  }

  async showip($event =''){
    this.ipdata = await this.poolser.showPublicIp({ static:1,bus_id:this.bus_name,resel_id:this.res_name,like:$event})
    // console.log("ipadd",this.ipdata);
    
  }

  changeclear(item){
    if(item == 1){
      this.resel_type = '';
      this.res_name = '';
      this.stat_ip = '';
      this.start_date = '';
      this.end_date = '';
    }
    if(item == 2){
      this.res_name = '';
      this.stat_ip = '';
      this.start_date = '';
      this.end_date = '';
    }
    if(item == 3){
      this.stat_ip = '';
      this.start_date = '';
      this.end_date = '';
    }
    if(item == 4){
      this.start_date = '';
      this.end_date = '';
    }
  }

  async refresh(){
    this.bus_name='';
    this.resel_type='';
    this.res_name='';
    this.stat_ip='';
    this.start_date='';
    this.end_date='';
    this.pro='';
    this.res1='';
    this.ipdata='';
    if(this.role.getroleid()<=777){
      await this.profile();
      await this.showResellerName();
      await this.showip();
    }
    this.page=1;
    await this.initiallist();
  }

  async initiallist() {
    let result = await this.poolser.listRenewPublicIp({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      bus_id: this.bus_name,
      role: this.resel_type,
      resel_id: this.res_name,
      ip_add:this.stat_ip,
      start_date:this.start_date,
      end_date:this.end_date,
    });
    console.log(result)
    if (result) {
      this.data = result[0];
      this.count = result[1]["count"];
      // console.log("naslist : ", result)
      this.setPage();

    }
  }

  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initiallist();
    }
  }

  setPage() {
    // console.log(this.data);
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
    // console.log('asdfg',this.pagedItems)
  }

  async download(){
    let res = await this.poolser.listRenewPublicIp({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      bus_id: this.bus_name,
      role: this.resel_type,
      resel_id: this.res_name,
      ip_add:this.stat_ip,
      start_date:this.start_date,
      end_date:this.end_date,
    });
    if(res){
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};
        if (this.role.getroleid() > 777) {
          param['ISP NAME'] = temp[i]['busname'];
        }
       param['RESELLER_TYPE'] = temp[i]['menu_name']
        param['RESELLER COMPANY'] = temp[i]['company'];
        param['CUSTOMER PROFILEID'] = temp[i]['cust_profile_id'];
        param['CUSTOMER NAME'] = temp[i]['custname'];
        param['IP ADDRESS'] = temp[i]['ipaddr'];
        param['NO.OF IP'] = temp[i]['num_ip'];
        param['TIME UNIT TYPE'] = temp[i]['unit_type'] == 1 ? temp[i]['units'] + " " + 'Month' : temp[i]['unit_type'] + " " + 'Year';
        param['TAX TYPE'] = temp[i]['tax_type'] == 1 ? 'Inclusive' : 'Exclusive';
        param['PRICE'] = temp[i]['amt'];
        param['TAX'] = temp[i]['tax_amt'];
        param['TOTAL'] = temp[i]['amt'] + temp[i]['tax_amt'];
        param['START DATE']= temp[i]['start_date'] != null ? this.datePipe.transform(temp[i]['start_date'], 'dd-MM-yyyy', 'es-ES') : '-';
        param['EXPIRATION']= temp[i]['expiration'] != null ? this.datePipe.transform(temp[i]['expiration'], 'dd-MM-yyyy', 'es-ES') : '-';
        param['DAYS LEFT'] = temp[i]['daysremain'];
        param['STATE'] = temp[i]['stname'];
        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'IP_RENEWAL_List' + EXCEL_EXTENSION);
    }
  }

 


  result_pop(item) {
    const activemodal = this.nasmodel.open(AddSuccessComponent, { size: 'lg', container: 'nb-layout' });
    activemodal.componentInstance.modalHeader = 'Result';
    activemodal.componentInstance.item = item;
    activemodal.result.then((data) => {
      this.initiallist()
    });
  }

  
}