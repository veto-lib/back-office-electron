import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdmin } from '../models/admin';
import { Veterinary, IVeterinary } from '../models/veterinary';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }

  findOne(email: string): Observable<IAdmin> {
    return this.http.get<IAdmin>(`/admin/${email}`);
  }

  findAllUnvalidated(): Observable<IVeterinary[]> {
    return this.http
      .get<IVeterinary[]>('/admin/veterinaries')
      .pipe(
        map((veterinaries) => veterinaries.map((veterinary) => Veterinary.fromApiObject(veterinary)))
      );
  }

  validateVeterinary(email: string): Observable<void> {
    return this.http.patch<void>(`/admin/veterinaries/${email}`, {});
  }
}
