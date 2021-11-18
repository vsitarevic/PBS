import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Person } from '../interfaces/Person';

const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  async getPersonList () : Promise<any> {
    const endpoint = 'api/v1001/Application/Person/List';

    const body = {
      "Token": 2074,
      "Request": null
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async createPerson (newPerson: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Person/Create';

    const person = this.parseClient(newPerson);

    const body = {
      "Token": 2074,
      "Request": person
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async editPerson (newPerson: object) : Promise<any> {
    const endpoint = 'api/v1001/Application/Person/Modify';

    const person = this.parseClient(newPerson);

    const body = {
      "Token": 2074,
      "Request": person
    }

    let promise = await lastValueFrom(
      this.http.post(environment.api_url + endpoint, body, httpHeader)
      )

    return promise;
  }

  async removePerson (code: number) : Promise<any> {
    const endpoint = 'api/v1001/Application/Person/Remove';

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

  async getClientById (code: number | undefined) : Promise<Person> {
    return await this.getPersonList().then(res => {
      return res.Response.find((item: Person) => item.Code == code && item.Role == "CLIENT");
    })
  }

  async setBikeCount (client: Person, bikes: number) : Promise<Person | boolean> {
    if (client.BicycleCount != undefined) {
      client.BicycleCount = bikes;
      return await this.editPerson(client);
    } else {
      return false;
    }
  }

  async removeBikesFromClient (client: Person) : Promise<Person | boolean> {
    if (client.BicycleCount != undefined) {
      client.BicycleCount = 0;
      return await this.editPerson(client);
    } else {
      return false;
    }
  }

  parseClient(obj: any): any {
    var newClient = {
      "Code": obj.Code,
      "Role": "CLIENT",
      "Name": obj.Name,
      "Surname": obj.Surname,
      "State": obj.State,
      "City": obj.City,
      "Address": obj.Address,
      "Email": obj.Email,
      "MobileNumber": obj.MobileNumber,
      "BicycleCount": obj.BicycleCount
    }
    return newClient;
  }
}
