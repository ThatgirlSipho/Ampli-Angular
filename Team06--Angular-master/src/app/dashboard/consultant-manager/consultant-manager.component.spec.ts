import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantManagerComponent } from './consultant-manager.component';

describe('ConsultantManagerComponent', () => {
  let component: ConsultantManagerComponent;
  let fixture: ComponentFixture<ConsultantManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantManagerComponent]
    });
    fixture = TestBed.createComponent(ConsultantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
