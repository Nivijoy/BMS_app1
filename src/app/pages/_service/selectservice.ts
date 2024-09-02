import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SelectService {
  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  async showState(params) {
    return await this.http.post("/api/select/showState", params).toPromise();
  }
  async showDistrict(params) {
    return await this.http.post("/api/select/showDistrict", params).toPromise();
  }
  async listDistrict(params){
    return await this.http.post("/api/select/listDistrict",params).toPromise();
  }
  async listState(params){
    return await this.http.post("/api/select/listState",params).toPromise();
  }
  async addState(body){
    return await this.http.post("/api/select/addState",body).toPromise();
  }
  async updateState(body){
    return await this.http.put("/api/select/updateState/"+body.id+"",body).toPromise();
  }
}