import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModifyEnum} from '../../models/modify.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  @Output()
  btnClicked = new EventEmitter<ModifyEnum>();

  @Input()
  type: ModifyEnum;

  modifyEnum = ModifyEnum;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Нажата кнопка "Закрыть"
   */
  onBtnClicked(action: ModifyEnum): void {
    this.btnClicked.emit(action);
  }

}
