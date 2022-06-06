import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../../models/mates.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTableComponent {

  @Input()
  employees: Observable<EmployeeModel[]>;

  getImagePath(email?: string): string {
    const path = './assets/images/userpics/';
    return email ? `${path}${email}.svg` : `${path}default.svg`;
  }
}
