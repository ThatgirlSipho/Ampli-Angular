import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantViewApplicationComponent } from './applicant-view-application.component';

describe('ApplicantViewApplicationComponent', () => {
  let component: ApplicantViewApplicationComponent;
  let fixture: ComponentFixture<ApplicantViewApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantViewApplicationComponent]
    });
    fixture = TestBed.createComponent(ApplicantViewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
