import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BicycleStatus } from 'src/app/enums/BicycleStatus';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {

  statuses: string[] = this.decodeStatuses(BicycleStatus);

  newBikeCode: number = 1000;
  newBikeColor: string = '';
  newBikeStatus: string = '';
  newBikeDock: number = 1000;

  @Output() submitNewBike = new EventEmitter();
  
  submit(): void {
    var newBike = {
      Code: String(this.newBikeCode),
      Color: this.newBikeColor,
      Status: this.newBikeStatus.replace(" ", "_"),
      Client: null,
      Dock: this.newBikeDock
    }
    
    this.submitNewBike.emit(newBike);
  }

  constructor() { }

  ngOnInit(): void {
  }

  decodeStatuses(parEnum: any): string[] {
    return Object.keys(parEnum)
    .filter(value => isNaN(Number(value)) === false && value != '0')
    .map(key => parEnum[key]);
  }

}
