import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public static cssGetTopPx(element: HTMLElement): number {
    const top = window.getComputedStyle(element).top;
    return +top.slice(0, top.length - 2);
  }
}
