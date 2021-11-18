import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'

import { Dock } from 'src/app/interfaces/Dock';
import { DockService } from 'src/app/services/dock.service';

import { DialogConfirmComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-docks',
  templateUrl: './docks.component.html',
  styleUrls: ['./docks.component.css']
})
export class DocksComponent implements OnInit {

  loading: boolean = false;
  docks: Dock[] = [];
  allDocks: Dock[] = [];
  search: string = '';

  isAdmin: boolean = false;

  @Output() changeToBikes = new EventEmitter();

  constructor(private dockService: DockService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.getDocksList();
  }

  checkIfAdmin(): void {
    this.router.url === '/admin' ? this.isAdmin = true : this.isAdmin = false;
  }

  getDocksList(): void {
    this.loading = true;
    this.dockService.getDockList().then(res => {this.docks = res.Response; this.allDocks = this.docks; this.searchDocks();});
    this.loading = false;
  }

  searchDocks() {
    this.docks = this.allDocks.filter((dock: Dock) => RegExp(this.search).test(dock.Code.toString()) || RegExp(this.search).test(dock.State) || RegExp(this.search).test(dock.City) || RegExp(this.search).test(dock.Address));
  }

  submitNewDock(obj: any): void {
    if (this.validateDockInput(obj)) {
      this.dockService.createDock(obj)
        .then(res => {
          console.log(res);
          this.getDocksList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  editDock(obj: any): void {
    if (this.validateDockInput(obj)) {
      this.dockService.editDock(obj)
        .then(res => {
          console.log(res);
          this.getDocksList();
        }, err => {
          console.log("Error:", err.Message);
        });
    }
  }

  removeDock(code: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.dockService.removeDock(code)
          .then(res => {
            console.log(res);
            this.getDocksList();
          }, err => {
            console.log("Error:", err.Message);
          });
      }
    });
  }

  findDock(dockCode: number) {
    this.changeToBikes.emit(dockCode.toString())
  }

  validateDockInput(obj: any): boolean {
    let valid = true;

    if (obj.State.length < 3 || obj.State.length > 200)
      valid = false;

    if (obj.City.length < 3 || obj.City.length > 200)
      valid = false;
    
    if (obj.Address.length < 3 || obj.Address.length > 200)
      valid = false;

    if (obj.BicycleCount > obj.BicycleDockNumber)
      valid = false;

    return valid;
  }
}
