// src/app/sentences-list/sentences-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SentenceService } from '../../services/sentence.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sentences-list',
  templateUrl: './sentences-list.component.html',
  styleUrls: ['./sentences-list.component.scss'],
})
export class SentencesListComponent implements OnInit {
  sentences!: Observable<any[]>;

  constructor(private sentenceService: SentenceService) {}

  ngOnInit() {
    this.sentences = this.sentenceService.getSentences();
  }
}
