import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondapplicantComponent } from './secondapplicant.component';

describe('SecondapplicantComponent', () => {
  let component: SecondapplicantComponent;
  let fixture: ComponentFixture<SecondapplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondapplicantComponent]
    });
    fixture = TestBed.createComponent(SecondapplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
