import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {EmployeeService} from './services/employees/employee.service';
import {Observable, Subscription} from 'rxjs';
import {EmployeeModel} from './models/mates.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  employees: Observable<EmployeeModel[]>;

  subscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService) {
    this.appInit();
    this.employees = this.employeeService.employees;
  }

  appInit() {
    this.subscription.add(
      this.employeeService.loadEmployeesData().subscribe(
        (employees) => this.employeeService.setEmployees(employees)
      )
    )
  }

  ngOnDestroy() {
    //отписочка от подписочек
    this.subscription.unsubscribe();
  }
}
