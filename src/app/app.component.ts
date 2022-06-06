import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EmployeeService} from './services/employees/employee.service';
import {Observable} from 'rxjs';
import {MatesModel} from './models/mates.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  employees: Observable<MatesModel[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employees = this.employeeService.loadEmployeesData();
  }
}
