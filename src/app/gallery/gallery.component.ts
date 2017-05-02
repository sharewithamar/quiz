import { Component, OnInit, HostBinding } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger, slideInDownAnimation } from "./../shared/route-animation";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [slideInDownAnimation]
})
export class GalleryComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
