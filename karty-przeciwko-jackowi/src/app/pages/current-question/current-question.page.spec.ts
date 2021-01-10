import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentQuestionPage } from './current-question.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

describe('CurrentQuestionPage', () => {
  let component: CurrentQuestionPage;
  let fixture: ComponentFixture<CurrentQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentQuestionPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentQuestionPage);
    component = fixture.componentInstance;
    component.interval$.unsubscribe();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
