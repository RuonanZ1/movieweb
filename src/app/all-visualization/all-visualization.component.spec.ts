import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVisualizationComponent } from './all-visualization.component';

describe('AllVisualizationComponent', () => {
  let component: AllVisualizationComponent;
  let fixture: ComponentFixture<AllVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllVisualizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
