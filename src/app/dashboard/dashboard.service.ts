import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }


  getDataList(){
    return this.httpClient.get('assets/mock/getlist.json');

  }

  addData(data){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    console.log(data);
    return this.httpClient.post('', data, httpOption)
  }
}
