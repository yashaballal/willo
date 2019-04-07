import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})

export class UseraccountComponent implements OnInit {

  constructor(private Auth:AuthService, private router:Router) { }

  public columns = ["email","name"];
  public characters = [];
  public conditionFlag = false;
  public displayData;
  public index;

  ngOnInit()
  {
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

    });

  }

   public onClickPDF()
   {
      console.log("Reached here again");
      const doc = new jsPDF();
      doc.text("Some text", 10, 10);
      doc.save("Will.pdf");
   }

  public loadCourseReview(email_id)
  {
    this.conditionFlag=true;
    console.log("Email is: "+email_id);
    this.displayData = this.search(email_id, this.characters);

    console.log("This is stored in displayData:"+this.displayData.email);
  }

}


