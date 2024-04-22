import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFieldService extends BaseService {



  createNewList(body: any): Observable<any>{
    return this.post<any>(body)

  }

  fetchJSON(): Observable<any> {
    return this.get<any>()
  }
}
