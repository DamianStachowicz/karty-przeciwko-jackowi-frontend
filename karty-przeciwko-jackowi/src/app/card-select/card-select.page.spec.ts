import { AnswerCardComponent } from '../answer-card/answer-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from '../interfaces/card.interface';
import { CardSelectPage } from './card-select.page';
import { DebugElement } from '@angular/core';
import { IonicModule, IonSlides } from '@ionic/angular';

describe('CardSelectPage', () => {
  const cards: Card[] = [{
    id: 0,
    text: 'Pudel Ciastek'
  }, {
    id: 1,
    text: 'Karty Przeciwko Jackowi'
  }, {
    id: 2,
    text: 'Sucha ryba'
  }];

  let component: CardSelectPage;
  let fixture: ComponentFixture<CardSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardSelectPage,
        AnswerCardComponent
      ],
      imports: [
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSelectPage);
    component = fixture.componentInstance;
    component.cards = cards;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first cards text', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));
    expect(slider.nativeElement.innerHTML).toContain(cards[0].text);
  });

  it('should slide to the next card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(cards[1].text);
  });

  it('should not slide left of the first card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slidePrev();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(cards[0].text);
  });

  it('should slide to the last card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(cards[2].text);
  });

  it('should not slide right of the last card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(cards[2].text);
  });
});
