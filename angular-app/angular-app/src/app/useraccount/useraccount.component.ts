import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})

export class UseraccountComponent implements OnInit {

  constructor(private Auth:AuthService, private router:Router) { }

  public colDisplay = ["Email ID", "Name"]
  public columns = ["email","name"];
  public characters = [];
  public beneficiaryData = [];
  public witnessData = [];
  public executorData = [];
  public assetData = [];
  public displayData;
  public ownerData;
  public conditionFlag:boolean = false;
  public conditionFlagAsset:boolean = false;
  public displayEditor:boolean = false;
  public index;
  editorForm : FormGroup; 
  formText : String;
  public rowData;
  public emailID;
  public user_id
  private gridApi;
  private gridColumnApi;
  private rowSelection;

  private message:string;

  parentMessage = "message from parent"

    columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true, resizable:true },
      {headerName: 'Email', field: 'email', sortable: true, filter:true, resizable:true}
  ];


  ngOnInit()
  {
    this.rowSelection = "single";
    if(!this.Auth.getLoggedInStatus())
    {
      console.log("Reached this part in getLoggedInStatus")
      this.router.navigate(['/login'])
    }
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
    this.plotOnRecord();
  }

  public search(emailId, characters){
    for (var i=0; i < Object.keys(characters).length; i++) {
        if (characters[i].email === emailId) {
            console.log(characters[i])
            return characters[i].user_id;
        }
      }
  }

  public plotOnRecord()
  {
    this.Auth.getUserAccountDetails().subscribe(data=>{
    var self = this;
    console.log(data);
    data.forEach(function(value){
      self.characters.push(value);
    });
    self.rowData = data;
    });
  }

  onSelectionChanged() {
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
    console.log(selectedRowsString);

    this.beneficiaryData = [];
    this.witnessData = [];
    this.executorData = []; 
    this.user_id = this.search(selectedRowsString, this.characters);
    console.log(this.user_id)
    
    localStorage.setItem('userid', this.user_id);

    this.Auth.getUserAccountDetails1(this.user_id).subscribe(data =>{
    this.displayData = data;
    this.conditionFlag=true;
    for (var i=0; i < Object.keys(this.displayData).length; i++) {
        if (this.displayData[i].party_type === "owner") {
          this.ownerData = this.displayData[i];    
        }
        else if(this.displayData[i].party_type === "beneficiary")
        {
          this.beneficiaryData.push(this.displayData[i]);
        }
        else if(this.displayData[i].party_type.includes("witness"))
        {
          this.witnessData.push(this.displayData[i]);
        }
        else if(this.displayData[i].party_type.includes("executor"))
        {
          this.executorData.push(this.displayData[i]);
        }
      }

      this.Auth.getAssetData(this.displayData[0].will_id).subscribe(data1=>{
          this.conditionFlagAsset = true;
          this.assetData = data1;
      });


      });

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

   public onClickPDF()
   {
      console.log("Reached here again");
      const doc = new jsPDF();
      doc.setFontSize(12);
      this.formText = this.formText.replace(/{{name}}/g, this.displayData["name"]);
      this.formText = this.formText.replace(/{{city}}/g, this.displayData["city"]);
      this.formText = this.formText.replace(/<p>/g,'');
      this.formText = this.formText.replace(/<\/p>/g,'\n');
      this.formText = this.formText.replace(/<br>/g, '\n');

      doc.text(this.formText, 10, 10);
      doc.save("Will.pdf");
   }

   createCustomWill()
   {
      window.open('#/editor');
   }

   viewFeedbackInfo()
   {
      localStorage.setItem('useridfeedback', this.user_id);
      console.log("Reached this part in getLoggedInStatus")
      this.router.navigate(['/customerfb'])    
   }
}
