import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {EmployeeModel, IModify} from '../../models/mates.model';
import {EmployeeService} from '../../services/employees/employee.service';
import {ModifyEnum} from '../../models/modify.enum';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.less']
})
export class EmployeeTableComponent {

  @Input()
  employees: EmployeeModel[];

  @Output()
  modify = new EventEmitter<IModify>();

  modifyEnum = ModifyEnum;

  getImagePath(email: string): string {
    return EmployeeService.getImagePath(email);
  }

  onModify(action: ModifyEnum, employee: EmployeeModel, employees: EmployeeModel[]): void {
    this.modify.emit({action, employee, employees});
  }
}
