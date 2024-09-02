import { Component, OnInit } from '@angular/core';
import { CustService, PagerService, ReportService, ResellerService, S_Service,RoleService } from '../../_service/indexService';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { DatePipe } from '@angular/common';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'ngx-service-count-rpt',
  templateUrl: './service-count-rpt.component.html',
  styleUrls: ['./service-count-rpt.component.scss']
})
export class ServiceCountRptComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  data; count;profile;
  res_name = ''; cust_name = ''; sername = ''; start_date = ''; end_date = '';
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;
  pack; resel_type; res1; custname;
  constructor(
    private rpt: ReportService,
    private packser: S_Service,
    private custser: CustService,
    private reselser: ResellerService,
    public pageservice: PagerService,
    public role: RoleService,
    private datePipe: DatePipe

  ) { }

  ngOnInit() {
    this.list();
    this.showProfileReseller();
  }

  async list() {
    this.loading = true;
    let result = await this.rpt.serviceCountReport({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      resel_id: this.res_name,
      uid: this.cust_name,
      srvid: this.sername,
      start_date: this.start_date,
      end_date: this.end_date,
    })
    this.loading = false;
    this.data = result[0];
    this.count = result[1]['count'];
    this.setPage();


  }

  async showProfileReseller($event = '') {
    this.profile = await this.reselser.showProfileReseller({ bus_id: 12, like: $event })
    // console.log("prof:", result)
  }

  async showService($event = '') {
    this.pack = await this.packser.showService({ resel_id: this.res_name, res_flag: 1, like: $event })
  }
  async showResellerName($event = '') {
    if (this.resel_type) {
      this.res1 = await this.reselser.showResellerName({ role: this.resel_type, like: $event })
    }
  }

  async showUser($event = '') {
    this.custname = await this.custser.showUser({ resel_id: this.res_name, srvid: this.sername, like: $event })

  }

  async refresh() {
    this.resel_type = ''; this.res_name = ''; this.cust_name = '';
    this.start_date = ''; this.end_date = ''; this.sername = '';
    this.res1 = ''; this.pack = ''; this.custname = '';
    this.page=1;
    this.list();
    this.showProfileReseller();
  }

  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.list();
    }
  }
  setPage() {
    // console.log(this.data);
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }


  changeclear(item) {

    if (item == 1) {
      this.res_name = ''; this.sername = ''; this.cust_name = '';
      this.start_date = ''; this.end_date = '';
    }
    if (item == 2) {
      this.sername = ''; this.cust_name = '';
      this.start_date = ''; this.end_date = '';
    }
 
    if (item == 3) {
      this.cust_name = '';
      this.start_date = ''; this.end_date = '';
    }
    if (item == 4) {
      this.cust_name = ''; this.start_date = ''; this.end_date = '';
    }
  }

  async download() {
    this.loading = true;
    let result = await this.rpt.serviceCountReport({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      resel_id: this.res_name,
      uid: this.cust_name,
      srvid: this.sername,
      start_date: this.start_date,
      end_date: this.end_date,
    })
    this.loading = false;
    if (result) {
      let tempdata = [], temp: any = result[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};
     
        param['RESELLER'] = temp[i]['company'];
        param['PROIFLE ID'] = temp[i]['cust_profile_id'];
        param['SERVICE NAME'] = temp[i]['srvname'];
        param['COUNT'] = temp[i]['cnt'];
       temp[i]['c_date'] = this.datePipe.transform(temp[i]['c_date'], 'd MMM y hh:mm:ss a')
        param['CREATED DATE'] =  temp[i]['c_date'];
        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Collection Report' + EXCEL_EXTENSION);
    }
  }

}
