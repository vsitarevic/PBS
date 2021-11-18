import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Dock } from '../interfaces/Dock';

const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DockService {

  constructor(private http: HttpClient) { }

  async getDockList () : Promise<any> {
    const endpoint = 'api/v1001/Application/Dock/List';

    const body = {
      "Token": 2074,
      "Request": null
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async createDock (newDock: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Dock/Create';

    const dock = this.parseDock(newDock);

    const body = {
      "Token": 2074,
      "Request": dock
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async editDock (newDock: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Dock/Modify';

    const dock = this.parseDock(newDock);

    const body = {
      "Token": 2074,
      "Request": dock
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async removeDock (code: number) : Promise<any> {
    const endpoint = 'api/v1001/Application/Dock/Remove';

    const body = {
      "Token": 2074,
      "Request": {
        "Code": code
      }
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async getDockById (code: number | undefined) : Promise<Dock> {
    return await this.getDockList().then(res => {
      return res.Response.find((item: Dock) => item.Code == code);
    })
  }

  async setBikeCountToDock (dock: Dock, bikeCount: number) : Promise<Dock | boolean> {
    if (dock.BicycleCount != undefined) {
      dock.BicycleCount = dock.BicycleCount - bikeCount;
      return await this.editDock(dock);
    } else {
      return false;
    }
  }

  async addBikesToDock (dock: Dock, bikeCount: number) : Promise<Dock | boolean> {
    if (dock.BicycleCount != undefined) {
      dock.BicycleCount = dock.BicycleCount + bikeCount;
      return await this.editDock(dock);
    } else {
      return false;
    }
  }

  parseDock(obj: any): any {
    var newDock = {
      "Code": obj.Code,
      "State": obj.State,
      "City": obj.City,
      "Address": obj.Address,
      "BicycleDockNumber": obj.BicycleDockNumber,
      "BicycleCount": obj.BicycleCount
    }
    return newDock;
  }
}
