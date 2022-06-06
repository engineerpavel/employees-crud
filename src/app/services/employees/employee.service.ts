import { Injectable } from '@angular/core';
import {first, map, Observable, ReplaySubject, tap} from 'rxjs';
import {EmployeeModel, MatesModel} from '../../models/mates.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //единый источник правды
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

  /**
   * Добавить данные нового сотрудника
   * @param newEmployee
   * @param employees
   */
  addEmployee(newEmployee: EmployeeModel, employees: EmployeeModel[]): void {
    employees.push(newEmployee);
    this.setEmployees(employees);
  }

  /**
   * Редактировать данные сотрудника
   * @param editedEmployee
   * @param employees
   */
  editEmployee(editedEmployee: EmployeeModel, employees: EmployeeModel[]): void {
    const idx = EmployeeService.getIndex(editedEmployee, employees);
    if (idx !== -1) {
      employees[idx] = editedEmployee;
      this.setEmployees(employees);
    }
  }

  /**
   * Удалить данные сотрудника
   * @param toDeleteEmployee
   * @param employees
   */
  deleteEmployee(toDeleteEmployee: EmployeeModel, employees: EmployeeModel[]): void {
    const idx = EmployeeService.getIndex(toDeleteEmployee, employees);
    if (idx !== -1) {
      employees.splice(idx, 1);
      this.setEmployees(employees);
    }
  }

  /**
   * Найти индекс сотрудника
   * @param employee
   * @param employees
   */
  static getIndex(employee: EmployeeModel, employees: EmployeeModel[]): number {
    return employees.findIndex((item) => item.guid === employee.guid);
  }

  /**
   * Получить урл для аватарки
   * @param email
   */
  static getImagePath(email?: string): string {
    const path = './assets/images/userpics/';
    return email ? `${path}${email}.svg` : `${path}default.svg`;
  }

}
