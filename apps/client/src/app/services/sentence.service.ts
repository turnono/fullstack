// src/app/sentence.ts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  private apiUrl = 'https://sentences-1oek.onrender.com';

  constructor(private http: HttpClient) {}

  getWords() {
    return this.http
      .get(`${this.apiUrl}/words/get/`)
      .pipe(map(({ words }: any) => words));
  }

  addSentence(text: string) {
    return this.http.post(`${this.apiUrl}/sentences/create/`, {
      text,
    });
  }

  getSentences() {
    return this.http
      .get(`${this.apiUrl}/sentences/get/`)
      .pipe(map(({ sentences }: any) => sentences));
  }
}
