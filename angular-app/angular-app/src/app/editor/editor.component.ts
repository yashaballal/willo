import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Quill } from 'quill'
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editorForm : FormGroup; 
  formText : String;
  formTextAppend : String;
  user_id:string;
  public beneficiaryData = [];
  public witnessData = [];
  public executorData = [];
  public assetData = [];
  public ownerData;
  public displayData;
  public quill;
  conditionFlagAsset:boolean;


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

    this.user_id = localStorage.getItem('userid');
    console.log("User ID", this.user_id)

    this.Auth.getUserAccountDetails1(this.user_id).subscribe(data =>{
    this.displayData = data;
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

      console.log("Owner Data");
      console.log(this.ownerData);


      console.log("Beneficiary Data");
      console.log(this.beneficiaryData);

      console.log("Witness Data");
      console.log(this.witnessData);

      console.log("Executor Data");
      console.log(this.executorData);



      });

    this.quill = new Quill('#editor-container', {
    modules: {
    toolbar: []
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
    });

    this.quill.setText("I, {{name}}, a resident in the city of {{city}}, County of {{county}}, State of {{state}},\
    \ndeclare that this is my will.\
    \n\n1. Revocation. I revoke all wills that I have previously made.\
    \n\n2. Marital Status. [I am not married] OR  [I am married to ______ ]\
    \n\n3. Children. [If the answer is NO CHILDREN, section 3 is omitted]\
    \n\n3. Children. [If answer is YES]:\
    \n\n3. Children. I have the following child(ren):\
    \n\nName  Date of Birth\
    \n\n[CHILD NAME 1]  [CHILD DOB 1]\
    \n\n[CHILD NAME 2]  [CHILD DOB 2]\
    \n\n[CHILD NAME 3]  [CHILD DOB 3]\
    \nIf I do not leave property to one or more of the children or grandchildren whom I have identified above,\
    \n my failure to do so is intentional.\
    \n4. [If the answer from section 3 is NO CHILDREN, section 4 is omitted]\
    \n4. Personal Guardian. If at my death any of my children are minors and a personal guardian is needed,\
    \nI name [GUARDIAN NAME] as the personal guardian, to serve without bond. \
    \nIf this person is unable or unwilling to serve as personal guardian, I name [ALTERNATIVE GUARDIAN NAME] \
    \nas personal guardian, also to serve without bond.\
    \n5. [If the answer from section 3 is NO CHILDREN, section 5 is omitted]\
    \n5. Property Guardian. If at my death any of my children are minors and a property guardian is needed, \
    \nI name [PROPERTY GUARDIAN NAME] as the property guardian, to serve without bond. If this person is unable\
    \n or unwilling to serve as property guardian, I name [ALTERNATIVE PROPERTY GUARDIAN NAME] as property guardian,\
    \n also to serve without bond.\
    \n6. Disposition of Property. I make the following specific gifts of property:\
    \nTo {{bname}}, I leave:\
    \n[BELONGING A]\
    \n[BELONGING B]\
    \n[BELONGING C]\
    \n[BELONGING D]\
    \nor, if such beneficiary(ies) do(es) not survive me, to [ALTERNATE BENEFICIARY].\
    \n\nTo [BENEFICIARY NAME], I leave:\
    \n\n[BELONGING A]\
    \n[BELONGING B]\
    \n[BELONGING C]\
    \n[BELONGING D]\
    \n\nor, if such beneficiary(ies) do(es) not survive me, to [ALTERNATE BENEFICIARY].\
    \nTo [BENEFICIARY NAME], I leave:\
    \n\n[BELONGING A]\
    \n[BELONGING B]\
    \n[BELONGING C]\
    \n[BELONGING D]\
    \nor, if such beneficiary(ies) do(es) not survive me, to [ALTERNATE BENEFICIARY].\
    \nAny specific gift made in this will to two or more beneficiaries shall be shared equally among them,\
    \nunless unequal shares are specifically indicated. All shared gifts must be sold, and the net proceeds\
    \ndistributed as the will directs, unless all beneficiaries for a particular gift agree in writing,\
    \nafter my death, that the gift need not be sold.\
    \nIf I name two or more primary beneficiaries to receive a specific gift of property and any of them\
    \ndo not survive me,all surviving primary beneficiaries to that gift shall equally divide the deceased\
    \nprimary beneficiary's share, unless I have specifically provided otherwise.\
    \nIf I name two or more alternate beneficiaries to receive a specific gift of property and any of \
    \nthem do not survive me,all surviving alternate beneficiaries to that gift shall equally divide the\
    \ndeceased alternate beneficiary\'s share.\
    \n7. Residuary Estate. I leave my residuary estate, that is, the rest of my property not otherwise\
    \nspecifically and validly disposed of by this will or in any other manner, including lapsed or failed\
    \ngifts, to [RESIDUARY BENEFICIARY NAME] , or, \
    \nif such residuary beneficiary(ies) do(es) not survive me, to [ALTERNATE RESIDUARY BENEFICIARY NAME].\
    \nAny residuary gift made in this will to two or more beneficiaries shall be shared equally among them,\
    \nunless unequal shares are specifically indicated. All shared residuary gifts must be sold, and the net\
    \nproceeds distributed as the will directs, unless all beneficiaries for a particular gift agree in writing,\
    \nafter my death, that the gift need not be sold.\
    \nIf I name two or more alternate residuary beneficiaries to receive property and any of \
    \nthem do not survive me,all surviving alternate residuary beneficiaries shall equally divide the \
    \ndeceased alternate residuary beneficiary's share.\
    \nAs used in any section of this will, the word \"survive\" means to outlive me by at least 45 days.\
    \n\n8. Executor. I appoint [EXECUTOR NAME] as executor, to serve without bond. If that executor does not\
    \nqualify,or ceases to serve, I name [ALTERNATIVE EXECUTOR NAME] as executor, also to serve without bond.\
    \nI direct that my executor take all actions legally permissible to probate this will, including filing a\
    \npetition inthe appropriate court for the independent administration of my estate.\
    \nI grant to my executor the following powers, to be exercised as the executor deems to be in the\
    \nbest interests of my estate:\
    \n(1) To retain property, without liability for loss or depreciation resulting from such retention.\
    \n(2) To sell, lease, or exchange property, and to receive or administer the proceeds as a part of my estate.\
    \n(3) To vote stock; convert bonds, notes, stocks, or other securities belonging to my estate into other securities,\
    \nand exercise all other rights and privileges of a person owning similar property.\
    \n(4) To deal with and settle claims in favor of or against my estate.\
    \n(5) To continue, maintain, operate, or participate in any business that is a part of my estate,\
    \nand to incorporate,dissolve, or otherwise change the form of organization of the business.\
    \n(6) To pay all debts and taxes that may be assessed against my estate, as provided under state law.\
    \n(7) To do all other acts which in the executor\'s judgment may be necessary or appropriate for the \
    \nproper and advantageous management, investment, and distribution of my estate.\
    \nThese powers, authority, and discretion are in addition to the powers, authority, and discretion vested\
    \nin an executor by operation of law, and may be exercised as often as deemed necessary, without approval\
    \nby any court in any jurisdiction.\
    \n\n\n\nI subscribe my name to this will this [DAY] day of [MONTH], 20[YEAR], at [COUNTY], State of [STATE],\
    \nand declare it is my will,that I sign it willingly, that I execute it as my free and voluntary act for the\
    \npurposes expressed, and that I am of the age of majority or otherwise legally empowered to make a will and\
    \nunder no constraint or undue influence.\
    \n\nSignature: ____________________________\
    \nWitnesses\
    \nOn this [DAY] day of [MONTH], 20[YEAR], the testator, [TESTATOR NAME], declared to us, the undersigned,\
    \nthat this instrument was his or her will and requested us to act as witnesses to it. The testator signed\
    \nthis will in our presence, all of us being present at the same time. We now, at the testator’s request,\
    \nin the testator’s presence and in the presence of each other,subscribe our names as witnesses and each \
    \ndeclare that we are of sound mind and of proper age to witness a will.\
    \nWe further declare that we understand this to be the testator’s will, and that to the best of our knowledge\
    \nthe testator is of the age of majority, or is otherwise legally empowered to make a will,\
    \nand appears to be of sound mind and under no constraint or undue influence.\
    \n\nWe declare under penalty of perjury that the foregoing is true and correct, this [DAY] day of [MONTH], 20[YEAR],\
    \nat [COUNTY], State of [STATE].\
    \n\n\nWitness’s Signature:\
    \nTyped or Printed Name: _________________________\
    \nStreet Address, City: ____________________________\
    \nCounty, State: _________________________________\
    \n\nWitness’s Signature: ____________________________\
    \n\nTyped or Printed Name: _________________________\
    \n\nStreet Address, City: ____________________________\
    \n\nCounty, State: _________________________________");

  }

  public onSubmit()
   {
      console.log("Reached onSubmit")
      this.formText = this.quill.getText();
      console.log("Reached here again");
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.setFontSize(8);
      this.formText = this.formText.replace(/{{name}}/g, this.ownerData["name"]);
      this.formText = this.formText.replace(/{{city}}/g, this.ownerData["city"]);
      this.formText = this.formText.replace(/{{county}}/g, this.ownerData["county"]);
      this.formText = this.formText.replace(/{{state}}/g, this.ownerData["state"]);
      this.formText = this.formText.replace(/<p>/g,'');
      this.formText = this.formText.replace(/<\/p>/g,'\n');
      this.formText = this.formText.replace(/<br>/g, '\n');

      console.log(num_lines);
      doc.text(this.formText,10 ,10);

      console.log(startIndx);
      var startIndx = 0;
      var endIndx = 0;
      var iteration = 1;
      var lastIteration = 0;
      var num_lines = 0;
      while(lastIteration != 1)
      {
        num_lines = (this.formText.match(new RegExp("\n","g")) || []).length;
        if(num_lines<40)
        {
          lastIteration = 1;
        }

        if(iteration != 1)
        {
          doc.addPage();
        }
        endIndx = this.getPosition(this.formText, "\n", 40);
        console.log("The value of endIndx is:"+endIndx);
        this.formTextAppend = this.formText.substring(startIndx, endIndx);
        this.formText = this.formText.substring(endIndx);
        console.log(this.formTextAppend);
        doc.text(this.formTextAppend, 10, 10);      
        iteration = iteration + 1;

      }
      doc.save("CustomWill.pdf");
   }

  getPosition(string, subString, index) {
     return string.split(subString, index).join(subString).length;
  }


}
