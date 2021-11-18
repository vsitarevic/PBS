import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mode: string = 'bikes';

  constructor() { }

  ngOnInit(): void {
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
