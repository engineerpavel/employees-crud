import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModifyEnum} from '../../models/modify.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IFormResult} from '../../models/mates.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  @Input()
  type: ModifyEnum;

  @Input()
  form: FormGroup;

  @Output()
  formValue = new EventEmitter<IFormResult | undefined>();

  actionBtnPressed = false;

  modifyEnum = ModifyEnum;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.actionBtnPressed = false;
  }

  /**
   * Нажата кнопка
   */
  onBtnClicked(action: ModifyEnum): void {
    this.actionBtnPressed = true;

    if (this.form.valid) {
      this.formValue.emit({
        action: action,
        formValue: {
          firstName: this.form.get('firstName')?.value,
          lastName: this.form.get('lastName')?.value,
          age: this.form.get('age')?.value,
          email: this.form.get('email')?.value,
          guid: this.form.get('guid')?.value
        }
      });
    } else if (action === this.modifyEnum.CLOSE) {
      this.formValue.emit();
    }

  }

}
