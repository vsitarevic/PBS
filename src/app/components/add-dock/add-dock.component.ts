import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dock',
  templateUrl: './add-dock.component.html',
  styleUrls: ['./add-dock.component.css']
})
export class AddDockComponent implements OnInit {

  newDockCode: number = 1000;
  newDockState: string = '';
  newDockCity: string = '';
  newDockAddress: string = '';
  newBicycleDockNumber: number = 1;
  newBicycleCount: number = 0;

  @Output() submitNewDock = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    var newDock = {
      Code: String(this.newDockCode),
      State: this.newDockState,
      City: this.newDockCity,
      Address: this.newDockAddress,
      BicycleDockNumber: String(this.newBicycleDockNumber),
      BicycleCount: this.newBicycleCount
    }
    
    this.submitNewDock.emit(newDock);
  }

}
