import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormGroup, FormControl } from '@angular/forms';


import * as _moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataList: any = [];
  pageSize: number = 6;
  total: number =0;
  page:number = 1;
  addNewForm: FormGroup;

  constructor(public dashService: DashboardService) { }

  ngOnInit() {
    this.resetForm();
    this.getDataList();

  }
  getDataList(){
    this.dashService.getDataList().subscribe((list) => {
      this.dataList = list;
      this.total = this.dataList.length; 
    });
  }

  get countries(): [] {
    return this.dataList
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSubmit = (formData) => {
    if(formData.valid){
      console.log(formData.value);
      console.log(_moment(formData.date).format("MMM Do YY"));// use any format u want
     /* this.dashService.addData(formData.value).subscribe((data) => {
        this.resetForm();
        this.getDataList();
      },
      (err)=> {
        console.log(err);
        this.resetForm();
      });*/
      
    }
  }

  resetForm = (edit?) => {
    console.log(edit);
    this.addNewForm = new FormGroup({
      "in1": new FormControl(edit? edit.area:'',[]),
      "in2": new FormControl(edit? edit.in2:'',[]),
      "in3": new FormControl(edit? edit.in3:'',[]),
      "in4": new FormControl(edit? edit.in4:'',[]),
      "in5": new FormControl(edit? edit.in5:'',[]),
      "date": new FormControl(edit? new Date(edit.date):'',[])
      
    })
  }

  click(event){
    //console.log(_moment(event.date).format("MMM Do YY"));
    console.log(event);
    event.date = _moment().toISOString();
    //console.log(_moment(event.date).format("MMM Do YY"));
    this.resetForm(event);
  }


}
