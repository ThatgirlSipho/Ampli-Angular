import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAgeComponent } from './document-age.component';

describe('DocumentAgeComponent', () => {
  let component: DocumentAgeComponent;
  let fixture: ComponentFixture<DocumentAgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentAgeComponent]
    });
    fixture = TestBed.createComponent(DocumentAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
