import { CardComponent } from './card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from '../interfaces/card.interface';
import { DebugElement } from '@angular/core';
import { IonicModule } from '@ionic/angular';

describe('CardComponent', () => {
  const card: Card = {
    id: 0,
    text: 'Pudel Ciastek',
    type: 'answer'
  };

  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [
        IonicModule.forRoot()
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
    expect(cardContainer.nativeElement.innerHTML).toContain(card.text);
  });
});
