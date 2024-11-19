import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewApplicationComponent } from './admin-view-application.component';

describe('AdminViewApplicationComponent', () => {
  let component: AdminViewApplicationComponent;
  let fixture: ComponentFixture<AdminViewApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewApplicationComponent]
    });
    fixture = TestBed.createComponent(AdminViewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
