import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { Dock } from 'src/app/interfaces/Dock';

@Component({
  selector: 'app-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.css'],
  host: { class: 'flex flex-row bg-white dock-item mx-auto lg:m-8 xl:m-10' }
})
export class DockItemComponent implements OnInit {

  @Input() dock: Dock = {} as Dock;

  @HostBinding('class.item-outline') selected: boolean = false;

  canSelect: boolean = false;
  isAdmin: boolean = false;
  isEdit: boolean = false;

  newDockState: string = '';
  newDockCity: string = '';
  newDockAddress: string = '';
  newBicycleDockNumber: number = 1;

  @Output() editDock = new EventEmitter();
  @Output() removeDock = new EventEmitter();
  @Output() findDock = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.url == '/admin' ? this.isAdmin = true : this.isAdmin = false;
  }

  toggleFind(): void {
    this.findDock.emit(this.dock.Code);
  }

  toggleEdit(): void {
    this.newDockState = this.dock.State;
    this.newDockCity = this.dock.City
    this.newDockAddress = this.dock.Address;
    this.newBicycleDockNumber = this.dock.BicycleDockNumber;

    this.isEdit = !this.isEdit;
  }

  submitEditDock(): void {
    var newDock = {
      Code: String(this.dock.Code),
      State: this.newDockState,
      City: this.newDockCity,
      Address: this.newDockAddress,
      BicycleDockNumber: String(this.newBicycleDockNumber),
      BicycleCount: this.dock.BicycleCount
    }
    
    this.editDock.emit(newDock);
  }

  submitRemoveDock(): void {
    this.removeDock.emit(this.dock.Code);
  }

}
