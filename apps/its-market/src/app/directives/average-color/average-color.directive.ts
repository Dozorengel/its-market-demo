import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import FastAverageColor from 'fast-average-color';

@Directive({
  selector: '[appAverageColor]',
})
export class AverageColorDirective implements AfterViewInit {
  @Input('appAverageColor') explicitImage?: string;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngAfterViewInit(): void {
    const fac = new FastAverageColor();
    const container = this.el.nativeElement;
    const image = container.querySelector('img') || this.explicitImage;
    fac
      .getColorAsync(image)
      .then((color) => {
        this.r.setProperty(container.style, 'backgroundColor', color.rgba);
      })
      .catch((e) => console.log(e));
  }
}
