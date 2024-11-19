import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofemployeesComponent } from './listofemployees.component';

describe('ListofemployeesComponent', () => {
  let component: ListofemployeesComponent;
  let fixture: ComponentFixture<ListofemployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListofemployeesComponent]
    });
    fixture = TestBed.createComponent(ListofemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
