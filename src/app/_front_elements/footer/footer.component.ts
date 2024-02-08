import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    var footer = document.getElementById("footer");
    if (footer){
      if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        footer.style.display="none";
      } else {
        footer.style.display="flex";
      }
    }
  }

}
