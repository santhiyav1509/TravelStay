import { TestBed } from '@angular/core/testing';
import { Tourservice } from './tourservice';

describe('Tourservice', () => {
  let service: Tourservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tourservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
