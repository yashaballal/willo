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
    return this.http.get<any[]>(statsURL);
  }

  getUserAccountDetails()
  {
    var useraccountURL = apiURL+"useraccount";
    return this.http.get<any[]>(useraccountURL);
  }

  getCustomerFeedbackDetails()
  {
    var customerfbURL = apiURL+"customerfb";
    return this.http.get<any[]>(customerfbURL);
  }

  getPassword(emailID:string)
  {
    var fpwdURL = apiURL+"fpwd";
    return this.http.post(fpwdURL, {emailID});
  }

  sendReply(emailID:string, response:string)
  {
    var sendmailURL = apiURL+"customermail";
    return this.http.post(sendmailURL, {emailID, response});
  }

  addAdminApi(emailID:string, password:string)
  {
    var addadminURL = apiURL+"addadmin";
    return this.http.post(addadminURL, {emailID, password});
  }

  getFinanceDetails()
  {
    var financeDetailsURL = apiURL+"financial";
    return this.http.get<any[]>(financeDetailsURL);
  }

  getPieDetails()
  {
    var pieDetailsURL = apiURL+"piedetails";
    return this.http.get<any[]>(pieDetailsURL);
  }
  
  getSubModelDetails()
  {
    var subModelDetailsURL = apiURL+"submodel";
    return this.http.get<any[]>(subModelDetailsURL);    
  }

  // setSubModelDetails(subInput:string, discInput:string)
  // {
  //   var subModelDetailsURL = apiURL+"submodel";
  //   console.log("Reached setSubModelDetails"+ subModelDetailsURL);
  //   return this.http.post(subModelDetailsURL,{subInput,discInput});    
  // }
  setSubModelDetails(subInput:string)
  {
    var subModelDetailsURL = apiURL+"submodel";
    return this.http.post(subModelDetailsURL,{subInput});    
  }
  getDiscountDetails()
  {
    var discountlDetailsURL = apiURL+"discount";
    return this.http.get<any[]>(discountlDetailsURL);    
  }
  setDiscountDetails(promoCode:string,discountVal:string,discountType:string,activityType:string,typed:string){
    var discountlDetailsURL = apiURL+"discount";
    return this.http.post(discountlDetailsURL,{promoCode,discountVal,discountType,activityType,typed});
  }
  updateDiscountDetails(selectedPromo:string,activitySelected:string,typed:string){
    var discountlDetailsURL = apiURL+"discount";
    return this.http.post(discountlDetailsURL,{selectedPromo,activitySelected,typed});
  }
}
