import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

const apiURL= "http://localhost:4600/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || JSON.stringify(false))
  private username:string;
  private cid:string;

  constructor(private http: HttpClient) { }

  setLoggedInStatus(value:boolean){
    this.loggedInStatus = value
    localStorage.setItem('loggedIn', JSON.stringify(this.loggedInStatus))
  }
  
  getLoggedInStatus(){
    console.log(this.loggedInStatus)
    return this.loggedInStatus
  }

  setCID(cid:string){
    this.cid=cid;
  }

  getUserDetails(username:string, password:string){
    this.username = username;
    var URL = apiURL+"auth";
    return this.http.post(URL,{
      username,password
    })
  }

  getStatsDetails()
  {
    var statsURL = apiURL+"stats";
    console.log("Reached till this point getStatDetails "+statsURL);
    return this.http.get<any[]>(statsURL);
  }

  getUserAccountDetails()
  {
    var useraccountURL = apiURL+"useraccount";
    console.log("Reached till this point getUserAccountDetails "+useraccountURL);
    return this.http.get<any[]>(useraccountURL);
  }

  getCustomerFeedbackDetails()
  {
    var customerfbURL = apiURL+"customerfb";
    console.log("Reached till this point getUserAccountDetails "+customerfbURL);
    return this.http.get<any[]>(customerfbURL);
  }

  getPassword(emailID:string)
  {
    var fpwdURL = apiURL+"fpwd";
    console.log("Reached getPassword: "+fpwdURL);
    return this.http.post(fpwdURL, {emailID});
  }

  sendReply(emailID:string, response:string)
  {
    var sendmailURL = apiURL+"customermail";
    console.log("Reached getPassword: "+sendmailURL);
    return this.http.post(sendmailURL, {emailID, response});
  }

  addAdminApi(emailID:string, password:string)
  {
    var addadminURL = apiURL+"addadmin";
    console.log("Reached addAdminApi"+ addadminURL);
    return this.http.post(addadminURL, {emailID, password});
  }

  getFinanceDetails()
  {
    var financeDetailsURL = apiURL+"financial";
    console.log("Reached getFinanceDetails"+ financeDetailsURL);
    return this.http.get<any[]>(financeDetailsURL);
  }

  getPieDetails()
  {
    var pieDetailsURL = apiURL+"piedetails";
    console.log("Reached getPieDetails"+pieDetailsURL);
    return this.http.get<any[]>(pieDetailsURL);
  }

}
