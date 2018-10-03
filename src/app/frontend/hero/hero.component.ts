import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  bgImages = ['empty.jpg', 'js.png', 'node-wallpaper.jpg', 'node.png', 'ximage.jpg', 'maxresdefault.jpg'];
  bgImage = null;
  constructor() { }

  ngOnInit() {
    this.bgImage = `url(/assets/img/covers/empty.jpg)`; // ${this.bgImages[Math.floor(Math.random() * 5)]})`;
  }

}
