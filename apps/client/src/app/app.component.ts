import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, take } from 'rxjs';
import { SentenceService } from './services/sentence.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fullstack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sentences: any[] = [];
  wordsGroups$!: Observable<{ label: string; words: string[] }[]>;

  constructor(
    private sentenceService: SentenceService,
    private _snackBar: MatSnackBar
  ) {
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

  submitSentence(e: string) {
    return firstValueFrom(this.sentenceService.addSentence(e)).then((x) => {
      this.getSentences();
      this._snackBar.open('Sentence added', 'Close', {
        duration: 2000,
      });
    });
  }

  removeSentence(e: string) {
    return firstValueFrom(this.sentenceService.removeSentence(e)).then((x) => {
      this.getSentences();
      this._snackBar.open('Sentence removed', 'Close', {
        duration: 2000,
      });
    });
  }
}
