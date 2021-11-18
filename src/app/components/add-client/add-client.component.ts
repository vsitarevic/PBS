import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  newClientCode: number = 1000;
  newClientName: string = '';
  newClientSurname: string = '';
  newClientState: string = '';
  newClientCity: string = '';
  newClientAddress: string = '';
  newClientEmail: string = '';
  newClientMobileNumber: string = '';
  newBicycleCount: number = 0;

  @Output() submitNewClient = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    var newClient = {
      Code: String(this.newClientCode),
      Name: this.newClientName,
      Surname: this.newClientSurname,
      State: this.newClientState,
      City: this.newClientCity,
      Address: this.newClientAddress,
      Email: this.newClientEmail,
      MobileNumber: this.newClientMobileNumber,
      BicycleCount: this.newBicycleCount
    }
    
    this.submitNewClient.emit(newClient);
  }

}
