import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SentenceService } from './services/sentence.service';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentsModule } from './components/components.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sentenceService: SentenceService;

  beforeEach(async () => {
    const mockSentenceService = {
      getWords: () =>
        of([
          { type: 'A', word: 'apple' },
          { type: 'B', word: 'banana' },
        ]),
      getSentences: () => of([{ id: 1, words: ['apple'] }]),
      addSentence: () => of(null),
    };

    // const mockSentenceService = {
    //   getWords: jest.fn().mockReturnValue(of(['word1', 'word2', 'word3'])),
    // };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, ComponentsModule, RouterTestingModule],
      providers: [
        { provide: SentenceService, useValue: mockSentenceService },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: MatSnackBar, useValue: { dismiss: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sentenceService = TestBed.inject(SentenceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get words and group them', () => {
    expect(component.wordsGroups$).toBeDefined();
  });

  it('should get sentences on initialization', () => {
    expect(component.sentences).toEqual([{ id: 1, words: ['apple'] }]);
  });
});
