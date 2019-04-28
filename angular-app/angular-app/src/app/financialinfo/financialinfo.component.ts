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
  public emailID;
  displayFlag:boolean = false;
  displayText:boolean = false;
  public rowData;
  public rowDataDisc;
  public subscriptionPrice = 0;
  public subscriptionDiscount = 0;
  public displayPass:boolean = false;
  public displayFail:boolean = false;
  public displayPassDisc:boolean = false;
  public displayFailDisc:boolean = false;
  public displayFailPrimDisc:boolean = false;
  public priceVal:string;
  public promoCode:string;
  public discountVal:string;
  public discountType:string;
  public activityType:string;
  public conditionFlag:boolean = false;
  public clickConditionFlag:boolean = false;
  public selectedPromo:string;
  public typed;
  public activitySelected:string="Valid";

  

  columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true },
      {headerName: 'Email', field: 'email', sortable: true, filter:true },
      {headerName: 'Last Payment Date', field: 'last_payment_dt', sortable: true, filter:true},
      {headerName: 'Due Date', field: 'due_date', sortable: true, filter:true}
  ];

  columnDefsDisc =[

      {headerName: 'Promo Code', field: 'promo_code', sortable: true, filter:true },
      {headerName: 'Discount Value', field: 'discount_value', sortable: true, filter:true },
      {headerName: 'Discount Type', field: 'discount_type', sortable: true, filter:true},
      {headerName: 'Activity', field: 'valid_flag', sortable: true, filter:true}

  ];

  ngOnInit() {
  	if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

    this.Auth.getFinanceDetails().subscribe(data=>{
            var self = this;
            //console.log(data);
            this.rowData = data;
    });

    this.Auth.getSubModelDetails().subscribe(data=>{
            var self = this;
            this.subscriptionPrice = data[0].annual_sub_price;

    });

    this.Auth.getDiscountDetails().subscribe(data=>{
            var self = this;
            //console.log(data);
            this.rowDataDisc = data;

    });

  }

  onClickingReset(){
    this.promoCode="";
    this.discountVal="";
  }

  onClickingConfirm(){
    this.clickConditionFlag=false;
    this.typed="Update"
    this.Auth.updateDiscountDetails(this.selectedPromo,this.activitySelected,this.typed).subscribe(data=>{
      if(data['result']){
          window.alert("Discount promo updated");
          this.Auth.getDiscountDetails().subscribe(data=>{
          var self = this;
          //console.log(data);
          this.rowDataDisc = data;

    });
        }
        else{
          window.alert("Update unsuccessful");
          }

    });

  }

  onClickingCancel(){

    this.clickConditionFlag=false;

  }

  onClickingSubmit(){
    this.typed="Insert"

    this.Auth.setDiscountDetails(this.promoCode,this.discountVal,this.discountType,this.activityType,this.typed).subscribe(data=>{

      if(data['result']){
          this.displayPassDisc = true;
          this.displayFailPrimDisc=false;
          this.displayFailDisc = false;
          this.conditionFlag=false;
          this.Auth.getDiscountDetails().subscribe(data=>{
          var self = this;
          //console.log(data);
          this.rowDataDisc = data;

    });
        }
        else{
          if(data['code']===210){
            this.displayFailDisc = true;
            this.displayPassDisc = false;
            this.displayFailPrimDisc = false;
          }
          else{
            this.displayFailPrimDisc=true;
            this.displayFailDisc = false;
            this.displayPassDisc = false;
          }

          }

    });

  }

  onClickingUpdate()
  {

    this.Auth.setSubModelDetails(this.priceVal).subscribe(data=>{
        if(data['result']){
          //console.log("Got a positive result"); 
          this.displayPass = true;
          this.displayFail = false;
          this.Auth.getSubModelDetails().subscribe(data=>{
          this.subscriptionPrice = data[0].annual_sub_price;          
    });
        }
        else{
          this.displayFail = true;
          this.displayPass = false;
          }



    });
    this.priceVal="";

  }

  onClickingAddPromo(){
    this.conditionFlag=true;
    this.clickConditionFlag=false;
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
  public search(emailId, characters){
    for (var i=0; i < characters.length; i++) {
        if (characters[i].email === emailId) {
            return characters[i];
        }
      }
  }


onGridReadyDisc(params) {
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

  public loadMailBox(event)
  {
    this.displayText = false;
    //console.log("The emailID to which mail would be sent: "+(event.target as Element).innerHTML);
    this.emailID = (event.target as Element).innerHTML;  
    if(this.emailID.includes("@") && this.emailID.includes("."))
    {
          this.displayFlag = true;
    }
    else
    {
      this.displayFlag = false;
    }
  }

  public sendEmailFunction(response:string)
  {
    //console.log(response+ " to emailID "+ this.emailID);
    this.Auth.sendReply(this.emailID, response).subscribe(data=>{
    if(data['result']){
      this.displayFlag = false;
      this.displayText = true;
    }
    else{
      window.alert("Oops! something went wrong! Please try again")
    }
    });
  }

  public loadCourseReview(event){
    this.clickConditionFlag=true;
    this.conditionFlag=false;
    this.displayFailPrimDisc=false;
    this.displayFailDisc=false;
    this.displayPassDisc=false;
    this.selectedPromo = (event.target as Element).innerHTML;
  }
}
