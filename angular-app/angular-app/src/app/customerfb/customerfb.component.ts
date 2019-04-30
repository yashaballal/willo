import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerfb',
  templateUrl: './customerfb.component.html',
  styleUrls: ['./customerfb.component.css']
})
export class CustomerfbComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router) 
  {
  }

  private gridApi;
  private gridColumnApi;
  public feedbackArr = [];
  public rowData = [];
  displayFlag:boolean = false;
  displayText:boolean = false;
  public emailID:string;
  public currentFocused;
  private rowSelection;
  private getRowHeight;

  columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true},
      {headerName: 'Email', field: 'email', sortable: true, filter:true},
      {headerName: 'Feedback', field: 'feedback', sortable: true, filter:true, cellStyle: {'white-space': 'normal'}},
      {headerName: 'Date', field: 'feedback_ts', sortable: true, filter:true},
      {headerName: 'Response', field: 'admin_feedback', sortable: true, filter:true, cellStyle: {'white-space': 'normal'}}      
  ];


  ngOnInit() {
    if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

    this.rowSelection = "single"

    this.getRowHeight = function(params) {
      console.log("Reached the getRowHeight function"+params.data.admin_feedback.length)
      return 28 * (Math.floor(params.data.feedback.length / 30) + 1);
    };


  	this.Auth.getCustomerFeedbackDetails().subscribe(data=>{
    var self = this;
    console.log(data);
    data.forEach(function(value){
      self.feedbackArr.push(value);
    });
      self.rowData = data;
    });
  }

  onGridReady(params) 
  {
    this.displayText = false;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }

  onSelectionChanged() {
    this.displayText = false;
    console.log("Reached onSelectionChanged");
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      console.log("Reached the forEach function");
      if (index !== 0) {
        console.log("Reached the if condition inside forEach"); 
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.email;
    });
    this.emailID = selectedRowsString;
    console.log("The email ID is:" +this.emailID);
    this.displayFlag = true;
  }

  sendEmailFunction()
  {
    var textAreaValue = "yashaash@buffalo.edu" //document.getElementById("textAreaId").value;
    console.log(textAreaValue+ " to emailID "+ this.emailID);
    this.Auth.sendReply(this.emailID, textAreaValue).subscribe(data=>{
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
}
