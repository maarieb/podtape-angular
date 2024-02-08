import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[podcastBorderCard]'
})
export class BorderCardDirective {

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
    var colors = ["#EEC170", "#F2A65A", "#F58549", "#AB3428", "#656d4a", "#335c67", "#83bca9", "#ef4e57", "#8a9cb8", "#52b788"];
    var colorChosen = this.chooseColor(colors);
    this.elementRef.nativeElement.style.border = `4px solid ${colorChosen}`;
  }

  removeBorder(){
    this.elementRef.nativeElement.style.border = "none";
  }

  chooseColor(colors : string[]){
    var index = Math.floor(Math.random()*colors.length);
    return colors[index];
  }
}
