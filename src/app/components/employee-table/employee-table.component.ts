import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {IModify, MatesModel} from '../../models/mates.model';
import {EmployeeService} from '../../services/employees/employee.service';
import {ModifyEnum} from '../../models/modify.enum';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.less']
})
export class EmployeeTableComponent {

  @Input()
  employees: MatesModel[];

  @Output()
  modify = new EventEmitter<IModify>();

  modifyEnum = ModifyEnum;

  getImagePath(email: string): string {
    return EmployeeService.getImagePath(email);
  }

  onModify(action: ModifyEnum, employee: MatesModel): void {
    this.modify.emit({action, employee});
  }

  getInitials(mate: MatesModel): string {
    return `${mate.name.first.charAt(0)}.${mate.name.last.charAt(0)}. - ${mate.email}`
  }
}
