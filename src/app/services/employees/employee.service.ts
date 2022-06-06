import { Injectable } from '@angular/core';
import {first, map, Observable, ReplaySubject, tap} from 'rxjs';
import {EmployeeModel, MatesModel} from '../../models/mates.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _employees: ReplaySubject<EmployeeModel[]> = new ReplaySubject<EmployeeModel[]>();

  get employees(): ReplaySubject<EmployeeModel[]> {
    return this._employees;
  }

  constructor(private http: HttpClient) { }

  /**
   * Загрузить данные из mates.json и смапить новое поле
   */
  loadEmployeesData(): Observable<EmployeeModel[]> {
    return this.http.get<MatesModel[]>('./assets/json/mates.json').pipe(
        map((matesArr) => matesArr
          .map((mate) => (
            {...mate, initials: `${mate.name.first.charAt(0)}.${mate.name.last.charAt(0)}. - ${mate.email}`})
        )));
  }

  /**
   * Поместить новые данные в Subject _employees
   * @param employees
   */
  setEmployees(employees: EmployeeModel[]): void {
    this._employees.next(employees);
  }

}
