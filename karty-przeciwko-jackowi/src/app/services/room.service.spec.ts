import { HttpClientModule } from '@angular/common/http';
import { RoomService } from './room.service';
import { TestBed } from '@angular/core/testing';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
