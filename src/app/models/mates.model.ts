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

export interface IModify {
  action: ModifyEnum,
  employee: MatesModel | null,
}

export interface IFormFields {
  firstName: string,
  lastName: string,
  age: number,
  email: string;
  guid?: string;
}

export interface IFormResult {
  action: ModifyEnum,
  formValue: IFormFields;
}
