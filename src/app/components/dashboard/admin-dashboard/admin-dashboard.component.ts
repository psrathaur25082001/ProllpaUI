import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  displayedColumns: string[] = ['countryName', 'addressName', 'addressOrder', 'mandatory'];
  dataSource = new MatTableDataSource([
    { countryName: 'Algeria', addressName: 'Address Line 1', addressOrder: 1, mandatory: 'Y' },
    { countryName: 'Algeria', addressName: 'Address Line 2', addressOrder: 2, mandatory: 'Y' },
    { countryName: 'Argentina', addressName: 'Address Line 1', addressOrder: 1, mandatory: 'Y' },
    { countryName: 'Argentina', addressName: 'Address Line 3', addressOrder: 3, mandatory: 'Y' },
  ]);

}
