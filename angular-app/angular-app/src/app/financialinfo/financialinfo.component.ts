import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-financialinfo',
  templateUrl: './financialinfo.component.html',
  styleUrls: ['./financialinfo.component.css']
})

export class FinancialinfoComponent implements OnInit {

  constructor( private Auth:AuthService, private router: Router) { }

  private gridApi;
  private gridColumnApi;
  public rowData;
  public subscriptionPrice = 0;
  public subscriptionDiscount = 0;
  public conditionFlag:boolean = false;
  public displayPass:boolean = false;
  public displayFail:boolean = false;
  public priceVal:string;
  public discVal:string;

  columnDefs = [
      {headerName: 'Will ID', field: 'will_id', sortable: true, filter:true },
      {headerName: 'Last Payment Date', field: 'last_payment_dt', sortable: true, filter:true },
      {headerName: 'Amount', field: 'amount', sortable: true, filter:true},
      {headerName: 'Account Status', field: 'account_status', sortable: true, filter:true},
      {headerName: 'Due Date', field: 'due_date', sortable: true, filter:true}
  ];


  ngOnInit() {
  	if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

    this.Auth.getFinanceDetails().subscribe(data=>{
            var self = this;
            console.log(data);
            this.rowData = data;
    });

    this.Auth.getSubModelDetails().subscribe(data=>{
            var self = this;
            this.subscriptionPrice = data[0].annual_sub_price;
            this.subscriptionDiscount = data[0].discount_percent;

    });

  }

  onClickingReset(){
    this.priceVal="";
    this.discVal="";
  }

  onClickingUpdate()
  {

    this.Auth.setSubModelDetails(this.priceVal, this.discVal).subscribe(data=>{
        if(data['result']){
          console.log("Got a positive result"); 
          this.displayPass = true;
          this.displayFail = false;
        }
        else{
          this.displayFail = true;
          this.displayPass = false;
          }

          this.Auth.getSubModelDetails().subscribe(data=>{
          this.subscriptionPrice = data[0].annual_sub_price;
          this.subscriptionDiscount = data[0].discount_percent;          
    });

    });
    this.priceVal="";
    this.discVal="";

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }
}
