import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmittedApplicationsComponent } from './view-submitted-applications.component';

describe('ViewSubmittedApplicationsComponent', () => {
  let component: ViewSubmittedApplicationsComponent;
  let fixture: ComponentFixture<ViewSubmittedApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubmittedApplicationsComponent]
    });
    fixture = TestBed.createComponent(ViewSubmittedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
