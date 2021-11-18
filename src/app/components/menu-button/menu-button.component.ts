import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css'],
  host: { class: 'flex-grow text-center bg-white py-2' }
})
export class MenuButtonComponent implements OnInit {

  @Input() text: string = '';
  @HostBinding('class.disabled-btn') @Input() disabled: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
