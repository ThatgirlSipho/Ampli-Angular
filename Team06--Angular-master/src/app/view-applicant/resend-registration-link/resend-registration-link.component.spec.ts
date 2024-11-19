import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendRegistrationLinkComponent } from './resend-registration-link.component';

describe('ResendRegistrationLinkComponent', () => {
  let component: ResendRegistrationLinkComponent;
  let fixture: ComponentFixture<ResendRegistrationLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResendRegistrationLinkComponent]
    });
    fixture = TestBed.createComponent(ResendRegistrationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
