import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgRateByRegionComponent } from './avg-rate-by-region.component';

describe('AvgRateByRegionComponent', () => {
  let component: AvgRateByRegionComponent;
  let fixture: ComponentFixture<AvgRateByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvgRateByRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvgRateByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
