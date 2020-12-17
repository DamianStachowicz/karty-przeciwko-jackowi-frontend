import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomsMock: Room[] = [
    {
      id: '001',
      players: [],
    },
    {
      id: '002',
      players: [],
    },
    {
      id: '003',
      players: [],
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return new Observable<Room[]>((observer) => {
      setTimeout(() => {
        observer.next(this.roomsMock);
        observer.complete();
      }, 700);
    });
    // return this.httpClient.get<Room[]>('');
  }
}
