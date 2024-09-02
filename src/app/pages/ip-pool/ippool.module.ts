import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { IpPoolRoutingModule,routedComponents } from './ippool.routing';
import { ToasterModule } from 'angular2-toaster';
import { AddSuccessComponent } from './success/add-success.component';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { GroupService,BusinessService, SelectService ,IppoolService,NasService } from '../_service/indexService';
import { RenewIpComponent } from './renew-ip/renew-ip.component';
@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
  	IpPoolRoutingModule,
    AutoCompleteNModule,
  ],
  declarations: [
   routedComponents,
   AddSuccessComponent,
   RenewIpComponent,
    
  
  ],
   entryComponents : [
    AddSuccessComponent,   RenewIpComponent,

  ],
  providers:[IppoolService,BusinessService,GroupService,NasService,SelectService]
})
export class IpPoolModule { }