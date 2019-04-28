import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerfb',
  templateUrl: './customerfb.component.html',
  styleUrls: ['./customerfb.component.css']
})
export class CustomerfbComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router) { }

  private gridApi;
  private gridColumnApi;
  public feedbackArr = [];
  public rowData = [];
  displayFlag:boolean = false;
  displayText:boolean = false;
  public emailID:string;
  public currentFocused;

  columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true },
      {headerName: 'Email', field: 'email', sortable: true, filter:true },
      {headerName: 'Feedback', field: 'feedback', sortable: true, filter:true},
      {headerName: 'Date', field: 'feedback_ts', sortable: true, filter:true},
      {headerName: 'Response', field: 'admin_feedback', sortable: true, filter:true}      
  ];

  // rowData = [
  //     { make: 'Toyota', model: 'Celica', price: 35000 },
  //     { make: 'Ford', model: 'Mondeo', price: 32000 },
  //     { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  ngOnInit() {
    if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

  	this.Auth.getCustomerFeedbackDetails().subscribe(data=>{
    var self = this;
    console.log(data);
    data.forEach(function(value){
      self.feedbackArr.push(value);
    });
      self.rowData = data;
    });
  }

  sendEmailFunction(response:string)
  {
    console.log(response+ " to emailID "+ this.emailID);
    this.Auth.sendReply(this.emailID, response).subscribe(data=>{
    if(data['result']){
      this.displayFlag = false;
      this.displayText = true;

          this.Auth.getCustomerFeedbackDetails().subscribe(data=>{
          var self = this;
          console.log(data);
          data.forEach(function(value){
            self.feedbackArr.push(value);
          });
            self.rowData = data;
          });

    }
    else{
      window.alert("Oops! something went wrong! Please try again")
    }
    });

  }

  onCellClicked(event)
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
