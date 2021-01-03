import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I18nService } from './i18n.service';
import { TestBed } from '@angular/core/testing';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
