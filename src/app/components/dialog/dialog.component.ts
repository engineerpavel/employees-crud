import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModifyEnum} from '../../models/modify.enum';
import {FormBuilder, Validators} from '@angular/forms';
import {IFormResult} from '../../models/mates.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent {

  @Input()
  type: ModifyEnum;

  @Input()
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    guid: ['']
  });

  @Output()
  formValue = new EventEmitter<IFormResult | undefined>();

  modifyEnum = ModifyEnum;

  constructor(private fb: FormBuilder) { }

  /**
   * Нажата кнопка
   */
  onBtnClicked(action: ModifyEnum): void {
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
