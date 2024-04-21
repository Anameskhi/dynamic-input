import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

 apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }
  

  post<T>(body: any ): Observable<T>{
    return this.http.post<T>(this.apiUrl, body)
  }

  get<T>(): Observable<T>{
    return this.http.get<T>(this.apiUrl)
  }

  delete<T>(url: string): Observable<T>{
    return this.http.delete<T>(this.apiUrl + url)
  }
}
