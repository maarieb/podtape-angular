import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGenreCard]'
})
export class GenreCardDirective {

  constructor(private elementRef : ElementRef) {
    this.removeBorder();
   }

   @HostListener('mouseenter') onMouseEnter(){
    this.setBorder();
   }
   @HostListener('mouseleave') onMouseLeave(){
    this.removeBorder();
   }

  setBorder(){
    this.elementRef.nativeElement.style.backgroundColor = "#EEC170";
  }

  removeBorder(){
    this.elementRef.nativeElement.style.backgroundColor = "#ffffff";
  }

}
