import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expression } from './Expression';
import { DataMem } from './DataMem';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  url: string = '';

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5020/api/values/';
  }

  getExpressionResult(aExpression: Expression) {
    var a = this.url + 'GetData';
    console.log(aExpression);

    return this.http.post<any>(a, aExpression);
  }

  setMemory(aDataMem: DataMem) {
    var a = this.url + 'SetData';
    console.log(aDataMem);

    return this.http.post<any>(a, aDataMem);
  }
}
