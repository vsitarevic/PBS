import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Person } from 'src/app/interfaces/Person';
import { PersonService } from 'src/app/services/person.service';

import { DialogConfirmComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  loading: boolean = false;
  clients: Person[] = [];
  search: string = '';

  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPersonsList();
  }

  getPersonsList(): void {
    this.loading = true;

    //TODO: Filter out admin
    this.personService.getPersonList().then(res => this.clients = res.Response);
    
    this.loading = false;
  }

  submitNewClient(obj: any): void {
    if (this.validateClientInput(obj)) {
      this.personService.createPerson(obj)
        .then(res => {
          console.log(res);
          this.getPersonsList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  editClient(obj: any): void {
    if (this.validateClientInput(obj)) {
      this.personService.editPerson(obj)
        .then(res => {
          console.log(res);
          this.getPersonsList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  removeClient(code: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.personService.removePerson(code)
          .then(res => {
            console.log(res);
            this.getPersonsList();
          }, err => {
            console.log("Error:", err.Message);
          });
      }
    });
  }

  validateClientInput(obj: any): boolean {
    let valid = true;

    if (obj.Name.length < 1 || obj.Name.length > 100)
      valid = false;

    if (obj.Surname.length < 1 || obj.Surname.length > 100)
      valid = false;

    if (obj.State != '' && obj.State.length < 3 || obj.State.length > 200)
      valid = false;

    if (obj.City != '' && obj.City.length < 3 || obj.City.length > 200)
      valid = false;
    
    if (obj.Address != '' && obj.Address.length < 3 || obj.Address.length > 200)
      valid = false;

    if (obj.Email.length < 10 || obj.Email.length > 200)
      valid = false;

    if (obj.MobileNumber.length < 10 || obj.MobileNumber.length > 30)
      valid = false;

    return valid;
  }
}
