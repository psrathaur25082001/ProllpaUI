import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolloutDashboardComponent } from './rollout-dashboard.component';

describe('RolloutDashboardComponent', () => {
  let component: RolloutDashboardComponent;
  let fixture: ComponentFixture<RolloutDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolloutDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolloutDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
