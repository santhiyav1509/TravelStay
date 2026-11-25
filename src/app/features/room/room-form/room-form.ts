import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roomservice } from '../../roomservice';

@Component({
  selector: 'app-room-form',
  imports: [ReactiveFormsModule],
  templateUrl: './room-form.html',
  styleUrl: './room-form.css',
})
export class RoomForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(Roomservice);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  editId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    adults: [1, [Validators.required, Validators.min(1)]],
    children: [0, [Validators.required, Validators.min(0)]],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.service.getById(+id).subscribe({
        next: (item) => {
          item.checkInDate = String(item.checkInDate).slice(0, 10);
          item.checkOutDate = String(item.checkOutDate).slice(0, 10);
          this.form.patchValue(item);
        },
        error: () => this.toastr.error('Could not load reservation', 'Error'),
      });
    }
  }

  bad(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Please fill the required fields', 'Warning');
      return;
    }
    const v = this.form.getRawValue();
  if (v.checkOutDate && v.checkInDate && v.checkOutDate <= v.checkInDate) {
      this.toastr.warning('Check-out must be after check-in', 'Warning');
      return;
    }
    const payload = { ...v, adults: Number(v.adults), children: Number(v.children), id: this.editId ?? 0 };
    const call = this.editId ? this.service.update(this.editId, payload) : this.service.add(payload);
    call.subscribe({
      next: () => {
        this.toastr.success(this.editId ? 'Reservation updated' : 'Room reserved successfully', 'Success');
        this.router.navigate(['/rooms/details']);
      },
      error: (err) => {
        console.log('REAL ERROR:', err);
        this.toastr.error('Error saving reservation', 'Error');
      },
    });
  }

  goDetails() { this.router.navigate(['/rooms/details']); }
}