import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Bicycle } from '../interfaces/Bicycle';

const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  constructor(private http: HttpClient) { }

  async getBicycleList () : Promise<any> {
    const endpoint = 'api/v1001/Application/Bicycle/List';

    const body = {
      "Token": 2074,
      "Request": null
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async createBicycle (newBicycle: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Bicycle/Create';

    const bicycle = this.parseBike(newBicycle);

    const body = {
      "Token": 2074,
      "Request": bicycle
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async editBicycle (newBicycle: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Bicycle/Modify';

    const bicycle = this.parseBike(newBicycle);

    const body = {
      "Token": 2074,
      "Request": bicycle
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async removeBicycle (code: number) : Promise<any> {
    const endpoint = 'api/v1001/Application/Bicycle/Remove';

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

  async getSelectedBikes (clientCode: number | undefined) : Promise<Bicycle[]> {
    return await this.getBicycleList().then(res => {
      return res.Response.filter((item: Bicycle) => item.Client == clientCode);
    })
  }

  async dockBike (bike: Bicycle, dockNumber: number) : Promise<Bicycle | boolean> {
    bike.Client = undefined;
    bike.Dock = dockNumber;
    return await this.editBicycle(bike);
  }

  parseBike(obj: any): any {
    var newBike = {
      "Code": obj.Code,
      "Color": obj.Color,
      "Status": obj.Status,
      "Client": obj.Client,
      "Dock": obj.Dock || null
    }
    return newBike;
  }
}
