import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appPlaceholderSelect]'
})
export class PlaceholderSelectDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.updateSelectColor();
    this.renderer.listen(this.el.nativeElement, 'change', () => this.updateSelectColor());
  }

  updateSelectColor() {
    const select = this.el.nativeElement as HTMLSelectElement;
    if (select.value === '') {
      this.renderer.setStyle(select, 'color', '#9e9e9e'); // Color del placeholder
    } else {
      this.renderer.setStyle(select, 'color', '#000000'); // Color del texto seleccionado
    }
  }
}
