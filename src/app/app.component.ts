import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {EmployeeService} from './services/employees/employee.service';
import {Observable, Subscription} from 'rxjs';
import {IFormResult, IModify, MatesModel} from './models/mates.model';
import {ModifyEnum} from './models/modify.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  employees: Observable<MatesModel[] | null> = this.employeeService.employees;

  subscription: Subscription = new Subscription();

  modifyEnum = ModifyEnum;

  dialogType: ModifyEnum;

  isShowDialog = false;

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    guid: ['']
  });

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
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
    switch (action) {
      case this.modifyEnum.ADD:
        this.openCreateDialog();
        break;
      case this.modifyEnum.EDIT:
        if (employee) {
          this.openEditDialog(employee);
        }
        break;
      case this.modifyEnum.DELETE:
        if (employee) {
          this.employeeService.deleteEmployee(employee);
        }
        break;
      default:
        break;
    }
  }

  onDialogClosed(res?: IFormResult): void {
    this.isShowDialog = false;
    if (res) {
      switch (res.action) {
        case ModifyEnum.ADD:
          this.employeeService.addEmployee(res.formValue);
          break;
        case ModifyEnum.EDIT:
          this.employeeService.editEmployee(res.formValue);
          break;

      }
    }

  }

  openCreateDialog(): void {
    this.form.reset();
    this.dialogType = this.modifyEnum.ADD;
    this.isShowDialog = true;
  }

  openEditDialog(employee: MatesModel): void {
    this.form = this.fb.group({
      firstName: [employee.name.first, Validators.required],
      lastName: [employee.name.last, Validators.required],
      age: [employee.age, [Validators.required, Validators.min(1)]],
      email: [employee.email, [Validators.required, Validators.email]],
      guid: [employee.guid]
    });

    this.dialogType = this.modifyEnum.EDIT;
    this.isShowDialog = true;
  }

  openDeleteDialog(employee: MatesModel): void {
    this.dialogType = this.modifyEnum.DELETE;
    this.isShowDialog = true;
  }

  ngOnDestroy() {
    //отписочка от подписочек
    this.subscription.unsubscribe();
  }
}
