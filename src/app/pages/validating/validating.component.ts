import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IVeterinary } from 'src/app/models/veterinary';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  templateUrl: './validating.component.html',
  styleUrls: ['./validating.component.less'],
})
export class ValidatingComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IVeterinary> = new MatTableDataSource([] as IVeterinary[]);

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'email',
    'approve'
  ];

  constructor(private service: AdminService) {}

  ngAfterViewInit(): void {
    this.resetView();
  }

  resetView() {
    this.service.findAllUnvalidated().subscribe(veterinaries => {
      this.dataSource = new MatTableDataSource(veterinaries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  approve(veterinary: IVeterinary) {
    this.service.validateVeterinary(veterinary.email).subscribe(() => {
      this.resetView();
    });
  }

}
