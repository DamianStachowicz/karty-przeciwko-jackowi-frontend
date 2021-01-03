import { GameStateService } from './game-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I18nMockService } from '../i18n/i18n.service.mock';
import { I18nService } from '../i18n/i18n.service';
import { TestBed } from '@angular/core/testing';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: I18nService, useClass: I18nMockService }
      ]
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
