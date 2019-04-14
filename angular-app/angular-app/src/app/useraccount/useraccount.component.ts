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
  public conditionFlag:boolean = false;
  public displayData;
  public displayEditor:boolean = false;
  public index;
  editorForm : FormGroup; 
  formText : String;
  public rowData;
  public emailID;

    columnDefs = [
      {headerName: 'Name', field: 'name', sortable: true, filter:true },
      {headerName: 'Email', field: 'email', sortable: true, filter:true },
  ];


  ngOnInit()
  {
    if(!this.Auth.getLoggedInStatus())
    {
      console.log("Reached this part in !getLoggedInStatus")
      this.router.navigate(['/login'])
    }
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
    this.plotOnRecord();
  }

  public search(emailId, characters){
    for (var i=0; i < characters.length; i++) {
        if (characters[i].email === emailId) {
            return characters[i];
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

   public onSubmit()
   {
      this.formText = this.editorForm.get('editor').value;
      console.log("Reached here again");
      const doc = new jsPDF();
      doc.setFontSize(12);
      this.formText = this.formText.replace(/{{name}}/g, this.displayData["name"]);
      this.formText = this.formText.replace(/{{city}}/g, this.displayData["city"]);
      this.formText = this.formText.replace(/<p>/g,'');
      this.formText = this.formText.replace(/<\/p>/g,'\n');
      this.formText = this.formText.replace(/<br>/g, '\n');

      doc.text(this.formText, 10, 10);
      doc.save("CustomWill.pdf");
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
      this.displayEditor = true;
   }

  public loadCourseReview(event)
  {
    this.conditionFlag=true;
    this.emailID = (event.target as Element).innerHTML; 
    console.log("Email is: "+this.emailID);
    this.displayData = this.search(this.emailID, this.characters);

    console.log("This is stored in displayData:"+this.displayData.email);
  }

}
