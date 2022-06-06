import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MatesModel} from '../../models/mates.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  loadEmployeesData(): Observable<MatesModel[]> {
    return this.http.get<MatesModel[]>('./assets/json/mates.json');
  }
}
