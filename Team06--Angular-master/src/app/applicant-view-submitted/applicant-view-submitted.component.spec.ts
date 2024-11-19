import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantViewSubmittedComponent } from './applicant-view-submitted.component';

describe('ApplicantViewSubmittedComponent', () => {
  let component: ApplicantViewSubmittedComponent;
  let fixture: ComponentFixture<ApplicantViewSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantViewSubmittedComponent]
    });
    fixture = TestBed.createComponent(ApplicantViewSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
