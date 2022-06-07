import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IFormFields, MatesModel} from '../../models/mates.model';
import {HttpClient} from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //единый источник правды
  private _employees: BehaviorSubject<MatesModel[] | null> = new BehaviorSubject<MatesModel[] | null>(null);

  get employees(): BehaviorSubject<MatesModel[] | null> {
    return this._employees;
  }

  constructor(private http: HttpClient) { }

  /**
   * Загрузить данные из mates.json и смапить новое поле
   */
  loadEmployeesData(): Observable<MatesModel[]> {
    return this.http.get<MatesModel[]>('./assets/json/mates.json');
  }

  /**
   * Поместить новые данные в Subject _employees
   * @param employees
   */
  setEmployees(employees: MatesModel[]): void {
    this._employees.next(employees);
  }

  /**
   * Добавить данные нового сотрудника
   * @param formFields
   */
  addEmployee(formFields: IFormFields): void {
    const employees = this._employees.getValue();
    const newEmployee = this.createEmployee(formFields);
    if (employees) {
      employees.push(newEmployee);
      this.setEmployees(employees);
    }
  }

  createEmployee(formFields: IFormFields): MatesModel {
    return {
      guid: formFields.guid ? formFields.guid : uuidv4(),
      age: formFields.age,
      name: {
        first: formFields.firstName,
        last: formFields.lastName
      },
      email: formFields.email
    }
  }

  /**
   * Редактировать данные сотрудника
   * @param editedEmployee
   */
  editEmployee(editedEmployee: MatesModel): void {
    const employees = this._employees.getValue();
    if (employees) {
      const idx = EmployeeService.getIndex(editedEmployee, employees);
      if (idx !== -1) {
        employees[idx] = editedEmployee;
        this.setEmployees(employees);
      }
    }
  }

  /**
   * Удалить данные сотрудника
   * @param toDeleteEmployee
   */
  deleteEmployee(toDeleteEmployee: MatesModel): void {
    const employees = this._employees.getValue();
    if (employees) {
      const idx = EmployeeService.getIndex(toDeleteEmployee, employees);
      if (idx !== -1) {
        employees.splice(idx, 1);
        this.setEmployees(employees);
      }
    }
  }

  /**
   * Найти индекс сотрудника
   * @param employee
   * @param employees
   */
  static getIndex(employee: MatesModel, employees: MatesModel[]): number {
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
