import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editorForm : FormGroup; 
  formText : String;
  constructor(private Auth:AuthService, private router:Router){ }

  ngOnInit() {
  if(!this.Auth.getLoggedInStatus())
   {
       console.log("Reached this part in getLoggedInStatus")
       this.router.navigate(['/login'])
   }

    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })

  }

}
