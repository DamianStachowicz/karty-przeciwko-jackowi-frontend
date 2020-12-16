import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.page.html',
  styleUrls: ['./room-select.page.scss'],
})
export class RoomSelectPage implements OnInit {
  constructor(public roomService: RoomService) {}

  ngOnInit() {}
}
