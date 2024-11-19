import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyDocumentComponent } from './admin-verify-document.component';

describe('AdminVerifyDocumentComponent', () => {
  let component: AdminVerifyDocumentComponent;
  let fixture: ComponentFixture<AdminVerifyDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVerifyDocumentComponent]
    });
    fixture = TestBed.createComponent(AdminVerifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
