import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  login() {
    this.adminService
      .findOne(this.auth.email)
      .pipe(
        tap((admin) => {
          if (!!admin) {
            this.router.navigate(['validating'])
          }
        }),
      )
      .subscribe();
  }
}
