import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.reloadData();
        },
        (error: any) => console.log(error));
  }

  updateEmployee(id:number){
    this.router.navigate(['update',id]);
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
}
