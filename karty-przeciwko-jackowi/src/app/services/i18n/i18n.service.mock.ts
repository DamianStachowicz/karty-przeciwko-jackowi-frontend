import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nMockService {
  constructor() {}

  get(id: string): string {
    return id;
  }
}
