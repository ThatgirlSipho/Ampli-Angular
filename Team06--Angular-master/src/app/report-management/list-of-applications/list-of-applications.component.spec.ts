import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfApplicationsComponent } from './list-of-applications.component';

describe('ListOfApplicationsComponent', () => {
  let component: ListOfApplicationsComponent;
  let fixture: ComponentFixture<ListOfApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfApplicationsComponent]
    });
    fixture = TestBed.createComponent(ListOfApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
