import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tourservice } from '../../tourservice';

@Component({
  selector: 'app-tour-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tour-form.html',
  styleUrl: './tour-form.css',
})
export class TourForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(Tourservice);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  editId: number | null = null;
  groupSizes = ['1 Person', '2 People', '3-5 People', '6-10 People', '10+ People'];
  tours = ['Paris Explorer', 'Rome & Colosseum', 'London Highlights', 'Maldives Escape', 'Dubai Adventure'];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    visitDate: ['', Validators.required],
    groupSize: ['', Validators.required],
    tourName: ['', Validators.required],
    contactMethod: ['Phone'],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.service.getById(+id).subscribe({
        next: (item) => {
          item.visitDate = String(item.visitDate).slice(0, 10);
          this.form.patchValue(item);
        },
        error: () => this.toastr.error('Could not load booking', 'Error'),
      });
    }
  }

  bad(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

 onSubmit() {
  console.log('FORM VALUE:', this.form.value);
  console.log('FORM VALID:', this.form.valid);

  // Edhu invalid nu kandupudika
  Object.keys(this.form.controls).forEach(key => {
    const control = this.form.get(key);
    if (control?.invalid) {
      console.log('INVALID FIELD:', key, control.errors);
    }
  });

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.toastr.warning('Please fill the required fields', 'Warning');
    return;
  }

  const payload = { ...this.form.getRawValue(), id: this.editId ?? 0 };
  console.log('SENDING PAYLOAD:', payload);

  const call = this.editId ? this.service.update(this.editId, payload) : this.service.add(payload);
  call.subscribe({
    next: () => {
      this.toastr.success(this.editId ? 'Booking updated' : 'Tour booked successfully', 'Success');
      this.router.navigate(['/tour/details']);
    },
    error: (err) => {
      console.log('REAL ERROR:', err);
      this.toastr.error('Error saving booking', 'Error');
    },
  });
}

  goDetails() { this.router.navigate(['/tour/details']); }
}