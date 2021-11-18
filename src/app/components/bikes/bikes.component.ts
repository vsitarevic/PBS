import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'

import { Bicycle } from 'src/app/interfaces/Bicycle';
import { Dock } from 'src/app/interfaces/Dock';
import { Person } from 'src/app/interfaces/Person';

import { BicycleService } from 'src/app/services/bicycle.service';
import { DockService } from 'src/app/services/dock.service';
import { PersonService } from 'src/app/services/person.service';

import { DialogConfirmComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  bicycles: Bicycle[] = [];
  allBicycles: Bicycle[] = [];
  selectedBicycles: Bicycle[] = [];
  selectedRentDock: number | undefined = undefined;
  loading: boolean = false;

  search: string = '';
  @Input() searchDock: string = '';
  @Input() searchClient: string = '';

  isAdmin: boolean = false;

  clientCode: number = 1000;
  clientValidateError: string = '';
  selectedClient: Person | null = null;

  dockCode: number = 1000;
  dockValidateError: string = '';

  constructor(private bicycleService: BicycleService, private personService: PersonService, private dockService:DockService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.getBicycleList();

  }

  checkIfAdmin(): void {
    this.router.url === '/admin' ? this.isAdmin = true : this.isAdmin = false;
  }

  getBicycleList(): void {
    this.loading = true;
    this.bicycleService.getBicycleList().then(res => {this.bicycles = res.Response; this.allBicycles = res.Response; this.searchBikes()});
    this.loading = false;
  }

  searchBikes() {
    this.bicycles = this.allBicycles.filter((bike: Bicycle) => RegExp(this.search).test(bike.Code.toString()) || RegExp(this.search).test(bike.Color) || RegExp(this.search).test(bike.Status));
    if (this.searchDock) 
      this.bicycles = this.bicycles.filter((bike: Bicycle) => bike.Dock && RegExp(this.searchDock).test(bike.Dock.toString()));
    if(this.searchClient)
      this.bicycles = this.bicycles.filter((bike: Bicycle) => bike.Client && RegExp(this.searchClient).test(bike.Client.toString()));
  }

  submitNewBike(obj: any): void {
    if (this.validateBicycleInput(obj)) {
      this.bicycleService.createBicycle(obj)
        .then(res => {
          console.log(res);
          this.getBicycleList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  editBike(obj: any, reset: boolean = true, validate: boolean = true): void {
    if (validate ? this.validateBicycleInput(obj) : true) {
      this.bicycleService.editBicycle(obj)
        .then(res => {
          console.log(res);
          if(reset)
            this.getBicycleList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  removeBike(code: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.bicycleService.removeBicycle(code)
          .then(res => {
            console.log(res);
            this.getBicycleList();
          }, err => {
            console.log("Error:", err.Message);
          });
      }
    });
  }

  validateBicycleInput(obj: any): boolean {
    console.log(obj)
    let valid = true;

    if (obj.Color.length < 3 || obj.Color.length > 100)
      valid = false;

    if (obj.Status == '')
      valid = false;

    return valid;
  }

  selectBike(obj: any) {
    this.selectedBicycles.push(obj);
  }

  deselectBike(obj: any): void {
    this.selectedBicycles = this.selectedBicycles.filter(bike => bike.Code != obj.Code);
    if(this.selectedBicycles.length == 0)
      this.selectedRentDock = undefined;
  }

  setRentDock(dockCode: number): void {
    this.selectedRentDock = dockCode;
  }

  verifyClient(): void {
    this.clientValidateError = '';
    var personsList: Person[];

    this.personService.getPersonList().then(res => {

      personsList = res.Response;
      var clients = personsList.filter(person => person.Role == "CLIENT");
      var searchResult = clients.find(client => client.Code == this.clientCode);
      if (searchResult == undefined){
        this.clientValidateError = 'WRONG CLIENT CODE';
      } else {
        this.clientValidateError = '';
        this.selectedClient = searchResult;
      }

    });
  }

  verifyDock() {
    this.dockService.getDockById(this.dockCode).then(dock => {
      if(this.selectedClient?.BicycleCount && dock.BicycleCount && dock.BicycleDockNumber - dock.BicycleCount > this.selectedClient?.BicycleCount) {
        this.dockValidateError = 'Dock Available!';
      }
    });
    this.dockValidateError = 'Invalid Dock';
  }

  returnBikes(): void {
    var tempClientBicycleCount = this.selectedClient?.BicycleCount;
    var promiseDock = this.dockService.getDockById(this.dockCode);
    promiseDock.then(dock => {
      if(tempClientBicycleCount){
        this.dockService.addBikesToDock(dock, tempClientBicycleCount);
      }
    })

    if (this.selectedClient){
      this.personService.removeBikesFromClient(this.selectedClient);
    }

    var selectedBicycles;

    this.bicycleService.getSelectedBikes(this.selectedClient?.Code).then(bikes => {
      selectedBicycles = bikes;
      if (Array.isArray(selectedBicycles) ){
        selectedBicycles.forEach(bike => {
          this.bicycleService.dockBike(bike, this.dockCode).then(res => this.getBicycleList());
        })
      } else {
        this.bicycleService.dockBike(selectedBicycles, this.dockCode).then(res => this.getBicycleList());
      }
    });

    this.dockValidateError = '';
  }

  rentBikes(): void {
    var promiseDock = this.dockService.getDockById(this.selectedRentDock);
    console.log(this.selectedBicycles.length)
    promiseDock.then(dock => this.dockService.setBikeCountToDock(dock, this.selectedBicycles.length))

    if (this.selectedClient){
      this.personService.setBikeCount(this.selectedClient, this.selectedBicycles.length);       
    }

    this.selectedBicycles.forEach(bicycle => {
      bicycle.Dock = undefined;
      bicycle.Client = this.selectedClient?.Code
      this.editBike(bicycle);
    })
  }
}
