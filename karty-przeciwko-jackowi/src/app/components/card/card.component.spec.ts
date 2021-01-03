import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card, CardType } from '../../interfaces/card.interface';
import { CardComponent } from './card.component';
import { DebugElement } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { I18nMockService } from 'src/app/services/i18n/i18n.service.mock';

describe('CardComponent', () => {
  const card: Card = {
    id: 0,
    text: 'Pudel Ciastek',
    type: CardType.ANSWER
  };

  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [
        { provide: I18nService, useClass: I18nMockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = card;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the cards text', () => {
    const cardContainer: DebugElement = fixture.debugElement.query(By.css('.card-container'));
    console.log('=================================================================================================');
    console.log({ cardContainer });
    console.log('=================================================================================================');
    expect(cardContainer.nativeElement.innerHTML).toContain(card.text);
  });
});
