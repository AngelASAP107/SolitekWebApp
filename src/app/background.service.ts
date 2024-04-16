import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private defaultBackground = '/assets/images/26800 1.png'; // Ruta de la imagen de fondo predeterminada
  backgroundImagePath$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultBackground);

  constructor() { }

  updateBackground(imagePath: string): void {
    this.backgroundImagePath$.next(imagePath);
  }
}
