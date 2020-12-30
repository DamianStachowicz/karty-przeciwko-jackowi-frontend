import { GameState } from 'src/app/interfaces/game-state.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(private httpClient: HttpClient) {}

  getState(playerId: number): Observable<GameState> {
    return this.httpClient.get<GameState>(`${environment.baseAPI}/test/${playerId}`);
  }
}
