import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingApplicationsComponent } from './view-pending-applications.component';

describe('ViewPendingApplicationsComponent', () => {
  let component: ViewPendingApplicationsComponent;
  let fixture: ComponentFixture<ViewPendingApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPendingApplicationsComponent]
    });
    fixture = TestBed.createComponent(ViewPendingApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
