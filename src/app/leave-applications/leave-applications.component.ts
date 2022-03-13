import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeNames } from '../core/models/user.interface';
import { EmployeeService } from '../core/services/employee.service';

@Component({
  selector: 'app-leave-applications',
  templateUrl: './leave-applications.component.html',
  styleUrls: ['./leave-applications.component.scss']
})
export class LeaveApplicationsComponent implements OnInit {
  leaveFormGroup = new FormGroup({
    applicant: new FormControl(''),
    manager: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    returnDate: new FormControl(''),
    totalDays: new FormControl(0),
    comments: new FormControl(''),
  });
  options: EmployeeNames[];
  employeeOpts: EmployeeNames[];
  managerOpts: EmployeeNames[];
  minEndDate: Date;
  minReturnDate: Date;
  oneDay = 24*60*60*1000;

  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.minEndDate = new Date();
    this.minReturnDate = new Date();
    this.employeeService.getEmployees().subscribe((res) => {
      this.options = res;
      this.employeeOpts = this.options;
      this.managerOpts = this.options;
    });
    this.leaveFormGroup.get('applicant').valueChanges.subscribe((value) => {
      this.managerOpts = this.options.filter(res => res.name != value.name);
    });
    this.leaveFormGroup.get('manager').valueChanges.subscribe((value) => {
      this.employeeOpts = this.options.filter(res => res.name != value.name);
    });
    this.leaveFormGroup.get('startDate').valueChanges.subscribe((value) => {
      this.minEndDate.setDate(value.getDate() + 1);
      if (this.leaveFormGroup.get('endDate').value) {
        this.getNumberOfDays(value, this.leaveFormGroup.get('endDate').value);
      }
    });
    this.leaveFormGroup.get('endDate').valueChanges.subscribe((value) => {
      this.minReturnDate.setDate(value.getDate() + 1);
      if (this.leaveFormGroup.get('startDate').value) {
        this.getNumberOfDays(this.leaveFormGroup.get('startDate').value, value  );
      }
    });
  }

  getNumberOfDays(startDate: any, endDate: any) {
    let days = Math.round(Math.abs((endDate - startDate)/this.oneDay));
    this.leaveFormGroup.get('totalDays').patchValue(days);
  }

}
