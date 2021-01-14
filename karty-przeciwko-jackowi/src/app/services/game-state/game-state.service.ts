import { environment } from 'src/environments/environment';
import { GameState } from 'src/app/interfaces/game-state.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(private httpClient: HttpClient) {}

  getState(playerId: number): Observable<GameState> {
    const params = new HttpParams().set('player-id', playerId.toString());
    return this.httpClient.get<GameState>(`${environment.baseAPI}/game/state-views`, { params });
  }

  makeAMove(playerId: number, move: Move, picks: number[]): Observable<any> {
    const params = new HttpParams().set('player-id', playerId.toString());
    return this.httpClient.post(`${environment.baseAPI}/game/moves`, { move, picks }, { params });
  }
}

export enum Move {
  PICK = 'PICK',
  AWARD = 'AWARD'
}
