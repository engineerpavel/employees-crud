import {ModifyEnum} from './modify.enum';

export interface MatesModel {
  guid: string;
  age: number;
  name: MateName;
  email: string;
}

export interface MateName {
  first: string;
  last: string;
}

export interface EmployeeModel extends MatesModel {
  initials: string;
}

export interface IModify {
  action: ModifyEnum,
  employee: EmployeeModel | null,
  employees: EmployeeModel[]
}
