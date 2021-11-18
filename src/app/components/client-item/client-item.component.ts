import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Person } from 'src/app/interfaces/Person';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.css'],
  host: { class: 'flex flex-row bg-white client-item mx-auto lg:m-8 xl:m-10' }
})
export class ClientItemComponent implements OnInit {

  @Input() client: Person = {} as Person;

  isEdit: boolean = false;

  newClientName: string = '';
  newClientSurname: string = '';
  newClientState: string | undefined = '';
  newClientCity: string | undefined = '';
  newClientAddress: string | undefined = '';
  newClientEmail: string = '';
  newClientMobileNumber: string = '';

  @Output() editClient = new EventEmitter();
  @Output() removeClient = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /* NEED TO BE ABLE TO SELECT BUT FOR SEARCH PURPOSES
   toggleSelect(): void {
    this.selected = !this.selected;
  } 
  */

  toggleEdit(): void {
    this.newClientName = this.client.Name;
    this.newClientSurname = this.client.Surname;
    this.newClientState = this.client.State;
    this.newClientCity = this.client.City
    this.newClientAddress = this.client.Address;
    this.newClientEmail = this.client.Email;
    this.newClientMobileNumber = this.client.MobileNumber

    this.isEdit = !this.isEdit;
  }

  submitEditClient(): void {
    var newClient = {
      Code: this.client.Code,
      Name: this.newClientName,
      Surname: this.newClientSurname,
      State: this.newClientState,
      City: this.newClientCity,
      Address: this.newClientAddress,
      Email: this.newClientEmail,
      MobileNumber: this.newClientMobileNumber,
      BicycleCount: this.client.BicycleCount
    }
    
    this.editClient.emit(newClient);
  }

  submitRemoveClient(): void {
    this.removeClient.emit(this.client.Code);
  }

}
