// src/app/sentences-list/sentences-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sentences-list',
  templateUrl: './sentences-list.component.html',
  styleUrls: ['./sentences-list.component.scss'],
})
export class SentencesListComponent {
  @Input() sentences: any[] = [];
  @Output() remove = new EventEmitter();

  constructor() {}

  removeSentence(_id: string) {
    this.remove.emit(_id);
  }
}
