import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  mode: string = 'bikes';
  searchDockParam: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  changeToBikes(dock: string) {
    this.mode = 'bikes';
    this.searchDockParam = dock;
  }
}
