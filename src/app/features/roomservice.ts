import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Roomservice {
  private http = inject(HttpClient);
  private api = 'https://localhost:7224/api/roomreservations';   // <-- your port

  getAll() { return this.http.get<any[]>(this.api); }
  getById(id: number) { return this.http.get<any>(`${this.api}/${id}`); }
  add(d: any) { return this.http.post(this.api, d); }
  update(id: number, d: any) { return this.http.put(`${this.api}/${id}`, d); }
  delete(id: number) { return this.http.delete(`${this.api}/${id}`, { responseType: 'text' }); }
}