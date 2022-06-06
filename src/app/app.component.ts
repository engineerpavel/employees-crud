import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {EmployeeService} from './services/employees/employee.service';
import {Observable, shareReplay, Subscription} from 'rxjs';
import {EmployeeModel, IModify} from './models/mates.model';
import {ModifyEnum} from './models/modify.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  employees: Observable<EmployeeModel[]> = this.employeeService.employees;

  subscription: Subscription = new Subscription();

  modifyEnum = ModifyEnum;

  dialogType: ModifyEnum;

  isShowDialog = false;

  constructor(private employeeService: EmployeeService) {
    this.appInit();
  }

  appInit() {
    this.subscription.add(
      this.employeeService.loadEmployeesData().subscribe(
        (employees) => this.employeeService.setEmployees(employees)
      )
    )
  }

  /**
   * Пользователь изменил данные сотрудника
   * @param args action, employee, employees
   */
  modify(args: IModify): void {
    const action = args.action;
    const employee = args.employee;
    const employees = args.employees;
    switch (action) {
      case this.modifyEnum.ADD:
        this.openCreateDialog();
        // this.employeeService.addEmployee(employee, employees);
        break;
      case this.modifyEnum.EDIT:
        if (employee) {
          this.employeeService.editEmployee(employee, employees);
        }
        break;
      case this.modifyEnum.DELETE:
        if (employee) {
          this.employeeService.deleteEmployee(employee, employees);
        }
        break;
      default:
        break;
    }
  }

  onDialogClosed(action: ModifyEnum): void {
    console.log('onDialogClosed', action);
    this.isShowDialog = false;
  }

  openCreateDialog(): void {
    this.dialogType = this.modifyEnum.ADD;
    this.isShowDialog = true;
  }

  ngOnDestroy() {
    //отписочка от подписочек
    this.subscription.unsubscribe();
  }
}
