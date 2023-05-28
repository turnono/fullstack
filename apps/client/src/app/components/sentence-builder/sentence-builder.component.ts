// src/app/sentence.ts-builder/sentence.ts-builder.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentenceService } from '../../services/sentence.service';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-sentence.ts-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.scss'],
})
export class SentenceBuilderComponent {
  sentence: string = '';
  sentences: any[] = [];
  wordsGroups$!: Observable<{ label: string; words: string[] }[]>;

  constructor(
    private fb: FormBuilder,
    private sentenceService: SentenceService
  ) {}

  ngOnInit(): void {
    // each word is an object with a word and a type. We need to group them all by type
    // this.sentenceService.getWords().subscribe();
    this.wordsGroups$ = this.sentenceService.getWords().pipe(
      map((words) => {
        const groups: any = {};
        words.forEach((word: any) => {
          if (groups[word.type]) {
            groups[word.type].push(word.word);
          } else {
            groups[word.type] = [word.word];
          }
        });
        return Object.keys(groups).map((key) => ({
          label: key,
          words: groups[key],
        }));
      })
    );

    this.getSentences();
  }

  getSentences(): void {
    this.sentenceService
      .getSentences()
      .pipe(take(1))
      .subscribe((x) => {
        this.sentences = x;
      });
  }

  onSelect(option: any): void {
    console.log({ option });
    if (option?.value) {
      this.sentence += `${option.value} `;
      option.source.value = null;
    }
  }

  onSubmit(): void {
    // Handle the submit logic here
    console.log(this.sentence);
    this.sentenceService
      .addSentence(this.sentence)
      .pipe(take(1))
      .subscribe((x) => {
        console.log({ x });
        this.getSentences();
        this.sentence = '';
      });
  }
}
