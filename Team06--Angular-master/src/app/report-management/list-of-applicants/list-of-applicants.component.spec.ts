import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfApplicantsComponent } from './list-of-applicants.component';

describe('ListOfApplicantsComponent', () => {
  let component: ListOfApplicantsComponent;
  let fixture: ComponentFixture<ListOfApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfApplicantsComponent]
    });
    fixture = TestBed.createComponent(ListOfApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
