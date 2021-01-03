import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card, CardType } from '../../interfaces/card.interface';
import { CardComponent } from '../card/card.component';
import { CardSelectComponent } from './card-select.page';
import { DebugElement } from '@angular/core';
import { I18nMockService } from 'src/app/services/i18n/i18n.service.mock';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { IonicModule } from '@ionic/angular';

describe('CardSelectComponent', () => {
  const cards: Card[] = [{
    id: 0,
    text: 'Pudel Ciastek',
    type: CardType.ANSWER
  }, {
    id: 1,
    text: 'Karty Przeciwko Jackowi',
    type: CardType.ANSWER
  }, {
    id: 2,
    text: 'Sucha ryba',
    type: CardType.ANSWER
  }];

  let component: CardSelectComponent;
  let fixture: ComponentFixture<CardSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardSelectComponent,
        CardComponent
      ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [
        { provide: I18nService, useClass: I18nMockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSelectComponent);
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
