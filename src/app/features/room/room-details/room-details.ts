import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roomservice } from '../../roomservice';

@Component({
  selector: 'app-room-details',
  imports: [],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit {
  private service = inject(Roomservice);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  items = signal<any[]>([]);

  ngOnInit(): void { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (d) => this.items.set(d),
      error: () => this.toastr.error('Could not load reservations', 'Error'),
    });
  }

  onEdit(id: number) { this.router.navigate(['/rooms/edit', id]); }
  goNew() { this.router.navigate(['/rooms']); }

  onDelete(id: number) {
    if (!confirm('Delete this reservation?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.toastr.success('Reservation deleted', 'Success'); this.load(); },
      error: () => this.toastr.error('Error deleting reservation', 'Error'),
    });
  }
}