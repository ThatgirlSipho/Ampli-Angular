import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstApplicantComponent } from './first-applicant.component';

describe('FirstApplicantComponent', () => {
  let component: FirstApplicantComponent;
  let fixture: ComponentFixture<FirstApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstApplicantComponent]
    });
    fixture = TestBed.createComponent(FirstApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
