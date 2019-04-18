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
  conditionFlag:boolean = true;

  public rowData;
  columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true },
      {headerName: 'Email', field: 'email', sortable: true, filter:true },
      {headerName: 'Last Payment Date', field: 'last_payment_dt', sortable: true, filter:true},
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


  public loadMailBox(event)
  {
    this.displayText = false;
    console.log("The emailID to which mail would be sent: "+(event.target as Element).innerHTML);
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
    console.log(response+ " to emailID "+ this.emailID);
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

}
