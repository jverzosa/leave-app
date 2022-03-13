import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeNames } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

    getEmployees() {
      let url = `../../assets/mocks/employees.json`;
      return this.http.get<EmployeeNames[]>(url);
    }
}
