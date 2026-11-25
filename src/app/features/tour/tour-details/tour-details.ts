import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tourservice } from '../../tourservice';

@Component({
  selector: 'app-tour-details',
  imports: [],
  templateUrl: './tour-details.html',
  styleUrl: './tour-details.css',
})
export class TourDetails implements OnInit {
  private service = inject(Tourservice);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  items = signal<any[]>([]);

  ngOnInit(): void { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (d) => this.items.set(d),
      error: () => this.toastr.error('Could not load bookings', 'Error'),
    });
  }

  onEdit(id: number) { this.router.navigate(['/tour/edit', id]); }
  goNew() { this.router.navigate(['/tour']); }

  onDelete(id: number) {
    if (!confirm('Delete this booking?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.toastr.success('Booking deleted', 'Success'); this.load(); },
      error: () => this.toastr.error('Error deleting booking', 'Error'),
    });
  }
}