import { I18nService } from './i18n.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('I18nService', () => {
  let service: I18nService;
  const text = { test: 'I\' am a test.' };

  const initModuleWithoutError = () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: url => new Observable(observer => {
          observer.next(text);
          observer.complete();
        }) } }
      ]
    });
    service = TestBed.inject(I18nService);
  };
  const initModuleWithError = () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: url => new Observable(observer => {
          observer.error('There\'s been an error');
          observer.complete();
        }) } }
      ]
    });
    service = TestBed.inject(I18nService);
  };

  it('should be created', () => {
    initModuleWithoutError();
    expect(service).toBeTruthy();
  });

  it('should not assign texts', () => {
    initModuleWithError();
    expect(service.get('test')).toEqual('');
  });

  it('should return text', () => {
    initModuleWithoutError();
    expect(service.get('test')).toEqual(text.test);
  });

  it('should return an empty sting', () => {
    initModuleWithoutError();
    expect(service.get('invalidValue')).toEqual('');
  });
});
