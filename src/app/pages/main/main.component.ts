import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor() {
    AOS.init();
  }

  ngOnInit() {
    AOS.init();
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
