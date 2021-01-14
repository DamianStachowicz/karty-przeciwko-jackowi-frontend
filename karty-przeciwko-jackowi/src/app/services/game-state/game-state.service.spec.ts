import { GameState } from 'src/app/interfaces/game-state.interface';
import { GameStateService } from './game-state.service';
import { HttpClient } from '@angular/common/http';
import { I18nMockService } from '../i18n/i18n.service.mock';
import { I18nService } from '../i18n/i18n.service';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

describe('GameStateService', () => {
  let service: GameStateService;
  const gameState: GameState = {
    tsarId: 0,
    players: [],
    black: null,
    hand: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: I18nService, useClass: I18nMockService },
        { provide: HttpClient, useValue: { get: url => new Observable(observer => {
          observer.next(gameState);
          observer.complete();
        }) } }
      ]
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the game\'s state', () => {
    service.getState(0).subscribe(
      state => expect(JSON.stringify(state)).toEqual(JSON.stringify(gameState))
    );
  });
});
