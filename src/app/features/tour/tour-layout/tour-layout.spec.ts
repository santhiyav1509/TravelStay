import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourLayout } from './tour-layout';

describe('TourLayout', () => {
  let component: TourLayout;
  let fixture: ComponentFixture<TourLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(TourLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
