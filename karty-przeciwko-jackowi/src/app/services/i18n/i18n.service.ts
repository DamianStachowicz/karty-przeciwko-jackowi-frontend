import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private texts: { [id: string]: string };

  constructor(
    private http: HttpClient
  ) {
    this.http.get<{ [id: string]: string }>(`assets/i18n/${environment.lang}.json`).subscribe(
      texts => this.texts = texts,
      err => console.error(err)
    );
  }

  get(id: string): string {
    return (this.texts && this.texts[id]) || '';
  }
}
