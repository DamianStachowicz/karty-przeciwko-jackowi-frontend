import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomSelectPage } from './room-select.page';

describe('RoomSelectPage', () => {
  let component: RoomSelectPage;
  let fixture: ComponentFixture<RoomSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
