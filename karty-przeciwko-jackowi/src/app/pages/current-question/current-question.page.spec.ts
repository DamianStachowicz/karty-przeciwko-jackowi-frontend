import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardType } from 'src/app/interfaces/card.interface';
import { CurrentQuestionPage } from './current-question.page';
import { GameState } from 'src/app/interfaces/game-state.interface';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { cpuUsage } from 'process';

describe('CurrentQuestionPage', () => {
  let component: CurrentQuestionPage;
  let fixture: ComponentFixture<CurrentQuestionPage>;
  const gameState: GameState = {
    czarId: -1,
    players: [{
      id: 0,
      name: 'Jack',
      points: 10,
      pickedACard: false
    }, {
      id: 1,
      name: 'Peter',
      points: 5,
      pickedACard: false
    }, {
      id: 2,
      name: 'Gollum',
      points: 12,
      pickedACard: false
    }],
    currentBlack: null,
    hand: [{
      id: 0,
      text: 'Lorem ipsum',
      type: CardType.ANSWER
    }, {
      id: 1,
      text: 'dolor sit amaet',
      type: CardType.ANSWER
    }, {
      id: 2,
      text: 'Shrek is love, Shrek is life',
      type: CardType.ANSWER
    }]
  };
  const gameStateServiceMock = { getState: playerId => new Observable(observer => {
      observer.next(gameState);
      observer.complete();
    })
  };
  const gameStateTsar0 = { getState: playerId => new Observable(observer => {
      observer.next({ ...gameState, czarId: 0 });
      observer.complete();
    })
  };
  const gameStateTsar1 = { getState: playerId => new Observable(observer => {
      observer.next({ ...gameState, czarId: 1 });
      observer.complete();
    })
  };

  const createTestBed = gameStateService => {
    TestBed.configureTestingModule({
      declarations: [ CurrentQuestionPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: GameStateService, useValue: gameStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentQuestionPage);
    component = fixture.componentInstance;
    component.yourId = 0;
    setTimeout(() => component.interval$.unsubscribe(), jasmine.DEFAULT_TIMEOUT_INTERVAL - 100);
    fixture.detectChanges();
  };

  it('should create', () => {
    createTestBed(gameStateTsar0);
    expect(component).toBeTruthy();
  });

  it('should display error if there\'s no tsar', async(() => {
    createTestBed(gameStateServiceMock);
    expect(component).toBeTruthy();
  }));

  it('should display who\'s a current tsar', async(() => {
    createTestBed(gameStateTsar1);
    expect(component).toBeTruthy();
  }));
});
