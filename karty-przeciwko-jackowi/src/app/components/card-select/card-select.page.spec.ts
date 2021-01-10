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

    component.cards = [{
      id: 0,
      text: 'Pudel Ciastek',
      type: CardType.ANSWER
    }, {
      id: 1,
      text: 'Kopytko',
      type: CardType.ANSWER
    }, {
      id: 2,
      text: 'Sucha ryba',
      type: CardType.ANSWER
    }];

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first cards text', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));
    expect(slider.nativeElement.innerHTML).toContain(component.cards[0].text);
  });

  it('should slide to the next card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(component.cards[1].text);
  });

  it('should not slide left of the first card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slidePrev();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(component.cards[0].text);
  });

  it('should slide to the last card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(component.cards[2].text);
  });

  it('should not slide right of the last card', () => {
    const slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    slider.componentInstance.slideNext();
    fixture.detectChanges();

    expect(slider.nativeElement.innerHTML).toContain(component.cards[2].text);
  });

  it('should select a card', () => {
    component.active = true;
    let slider: DebugElement = fixture.debugElement.query(By.css('ion-slides'));

    slider.componentInstance.slideNext();
    fixture.detectChanges();

    let card = component.cards[1];
    slider.nativeElement.getElementsByTagName('app-card')[1].click();

    fixture.detectChanges();
    slider = fixture.debugElement.query(By.css('ion-slides'));

    expect(slider.nativeElement.innerHTML).not.toContain(card.text);

    component.active = false;
    card = component.cards[0];
    slider.nativeElement.getElementsByTagName('app-card')[0].click();

    expect(slider.nativeElement.innerHTML).toContain(card.text);

    component.active = true;
    card = {
      id: -20,
      text: 'Lorem ipsum dolor sit amet',
      type: CardType.DRAW_2_PICK_3
    };
    component.select(card);

    expect(slider.nativeElement.innerHTML).toContain(component.cards[0].text);
    expect(slider.nativeElement.innerHTML).toContain(component.cards[1].text);
  });
});
