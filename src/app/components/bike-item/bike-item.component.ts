import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { Bicycle } from 'src/app/interfaces/Bicycle';
import { BicycleStatus } from 'src/app/enums/BicycleStatus';

@Component({
  selector: 'app-bike-item',
  templateUrl: './bike-item.component.html',
  styleUrls: ['./bike-item.component.css'],
  host: { class: 'flex flex-row bg-white bike-item mx-auto lg:m-8 xl:m-10' }
})
export class BikeItemComponent implements OnInit {

  @Input() bicycle: Bicycle = {} as Bicycle;
  @Input() selectedRentDock: number | undefined = undefined;

  @HostBinding('class.item-outline') selected: boolean = false;

  statuses: string[] = this.decodeStatuses(BicycleStatus);

  canSelect: boolean = true;
  isAdmin: boolean = false;
  isEdit: boolean = false;
  deleteWarning: boolean = false;

  newBikeColor: string = '';
  newBikeStatus: string = '';
  newBikeDock: number | undefined = 1000;

  @Output() editBike = new EventEmitter();
  @Output() removeBike = new EventEmitter();
  @Output() selectBike = new EventEmitter();
  @Output() deselectBike = new EventEmitter();
  @Output() setRentDock = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.url == '/admin' ? this.isAdmin = true :
      this.bicycle.Client == null ? this.canSelect = true : this.canSelect = false;
  }

  decodeStatuses(parEnum: any): string[] {
    return Object.keys(parEnum)
    .filter(value => isNaN(Number(value)) === false && value != '0')
    .map(key => parEnum[key]);
  }

  toggleSelect(): void {

    if (this.selectedRentDock == undefined) {
      this.selectedRentDock = this.bicycle.Dock;
      this.setRentDock.emit(this.selectedRentDock);
    }
    
    if (!this.selected && this.bicycle.Dock == this.selectedRentDock) {
      this.selected = true;
      this.selectBike.emit(this.bicycle);
    } else if (this.selected) {
      this.selected = false;
      this.deselectBike.emit(this.bicycle);
    }
  }


  toggleEdit(): void {
    this.newBikeColor = this.bicycle.Color;
    this.newBikeStatus = this.bicycle.Status.replace("_", " ");
    this.newBikeDock = this.bicycle.Dock;

    this.isEdit = !this.isEdit;
  }

  submitEditBike(): void {
    var newBike = {
      Code: String(this.bicycle.Code),
      Color: this.newBikeColor,
      Status: this.newBikeStatus.replace(" ", "_"),
      Dock: this.newBikeDock
    }
    
    this.editBike.emit(newBike);
  }

  submitRemoveBike(): void {
    if (this.bicycle.Status == BicycleStatus[BicycleStatus.WRECKED]) {
      this.removeBike.emit(this.bicycle.Code);
      return;
    }

    this.deleteWarning = true;
    setTimeout(() => {this.deleteWarning = false}, 1000);
  }

}
