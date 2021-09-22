import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { LogEquipoData } from '../models/LogEquipoData';

@Injectable({
  providedIn: 'root'
})
export class LogEquipoRegService {

  private action:any = {
    url:'',
    apiUrl:'',
  }

  constructor(
  	public http:          HttpClient,
    public config:        ConfigService,
    public router:        Router,
  ) {
    this.action.url    = this.config.getConfigData().logEquipoRegAction;
    this.action.apiUrl = this.config.getConfigData().apiBaseUrl;
  }

  ///////////////////////////////////////////
  /// GET ALL
  public GetAllOK = new Subject();
  public GetAllE = new Subject();

  getAll( expand:string = '' ){

    this.http.get(this.action.apiUrl + this.action.url + expand ).subscribe(
        data => {  this.GetAllOK.next(data); },
        err =>  {  this.GetAllE.next(err);  }
      );
  }

  ///////////////////////////////////////////
  /// GET
  public GetOK = new Subject();
  public GetE = new Subject();
  public LastElement:any;
  public getExpand = '';

  get(id){
    this.http.get(this.action.apiUrl + this.action.url + '/' + id + this.getExpand).subscribe(
        data => {
                  this.LastElement = data;
                  this.GetOK.next(data);
        },
        err =>  {  this.GetE.next(err);  }
      );
  }

  ///////////////////////////////////////////
  /// POST
  public PostOk = new Subject();
  public PostE = new Subject();

  public responseLastPost:any;

  post(model:LogEquipoData){
    this.http.post(this.action.apiUrl + this.action.url, model ).subscribe(
        data => {
          this.responseLastPost = data;
          this.PostOk.next(data);
        },
        err =>  {  this.PostE.next(err);  }
      );
  }

  ///////////////////////////////////////////
  /// PUT
  public PutOk = new Subject();
  public PutE = new Subject();

  put(model:LogEquipoData){
    this.http.put(this.action.apiUrl + this.action.url + '/' + model.id, model).subscribe(
        data => {  this.PutOk.next(data); },
        err =>  {  this.PutE.next(err);  }
      );
  }

  //////////////////////////////////////////
  /// DELETE
  public DeleteOK = new Subject();
  public DeleteE = new Subject();

  delete(id){
    
    this.http.delete(this.action.apiUrl + this.action.url + '/' + id).subscribe(
        data => {  this.DeleteOK.next(data); },
        err =>  {  this.DeleteE.next(err);  }
      );
  }
}