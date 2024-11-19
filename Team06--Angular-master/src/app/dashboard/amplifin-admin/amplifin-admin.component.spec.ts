import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifinAdminComponent } from './amplifin-admin.component';

describe('AmplifinAdminComponent', () => {
  let component: AmplifinAdminComponent;
  let fixture: ComponentFixture<AmplifinAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmplifinAdminComponent]
    });
    fixture = TestBed.createComponent(AmplifinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
