import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-sentence-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.scss'],
})
export class SentenceBuilderComponent {
  @Input() wordsGroups$!: Observable<{ label: string; words: string[] }[]>;
  @Output() sentenceAdded = new EventEmitter<string>();

  sentence: string = '';

  constructor() {}

  onSelect(option: any): void {
    if (option?.value) {
      this.sentence += `${option.value} `;
      option.source.value = null;
    }
  }

  onSubmit(): void {
    this.sentenceAdded.emit(this.sentence);
    this.sentence = '';
  }
}
