import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AOS from 'aos';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {
    this.scroll();
    //this.navbar();
  }
  @Input() isExpanded: boolean ;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    AOS.init();

    // Element that holds the text
    this._ELEMENT = document.getElementById('text') as HTMLInputElement;

    // Cursor element
    this._CURSOR = document.getElementById('cursor') as HTMLInputElement;
    // Start the typing effect on load
    this._INTERVAL_VAL = setInterval(() => this.typeScript(), 100);
    this.breakpointObserver
      .observe(['(min-width: 400px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isExpanded = true;
        } else {
          this.isExpanded = false;
        }
      });
  }
  // List of sentences
  _CONTENT = ['Developer', 'Junior', 'Cloud Ingineer'];

  // Current sentence being processed
  _PART = 0;

  // Character number of the current sentence being processed
  _PART_INDEX = 0;

  // Holds the handle returned from setInterval
  _INTERVAL_VAL;

  _ELEMENT;
  _CURSOR;

  text = '';
  scroll() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbar').style.top = '0px';
      } else {
        document.getElementById('navbar').style.top = '-50px';
      }
      prevScrollpos = currentScrollPos;
    };
  }
  // Implements typing effect
  typeScript() {
    this._CURSOR.style.animationPlayState = 'paused';
    // Get substring with 1 characater added
    this.text = this._CONTENT[this._PART].substring(0, this._PART_INDEX + 1);
    this._ELEMENT.innerHTML = this.text;
    this._PART_INDEX++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (this.text === this._CONTENT[this._PART]) {
      clearInterval(this._INTERVAL_VAL);
      this._CURSOR.style.animationPlayState = 'running';
      setTimeout(() => {
        this._INTERVAL_VAL = setInterval(() => this.deleteScript(), 50);
      }, 3000);
    }
  }

  // Implements deleting effect
  deleteScript() {
    this._CURSOR.style.animationPlayState = 'paused';
    // Get substring with 1 characater deleted
    this.text = this._CONTENT[this._PART].substring(0, this._PART_INDEX - 1);
    this._ELEMENT.innerHTML = this.text;
    this._PART_INDEX--;

    // If sentence has been deleted then start to display the next sentence
    if (this.text === '') {
      clearInterval(this._INTERVAL_VAL);

      // If current sentence was last then display the first one, else move to the next
      if (this._PART == this._CONTENT.length - 1) this._PART = 0;
      else this._PART++;

      this._PART_INDEX = 0;

      // Start to display the next sentence after some time
      setTimeout(() => {
        this._CURSOR.style.display = 'inline-block';
        this._INTERVAL_VAL = setInterval(() => this.typeScript(), 100);
      }, 200);
    }
  }
  handleSidebarToggle() {
    this.toggleSidebar.emit(!this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }
}
