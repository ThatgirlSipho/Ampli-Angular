import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultanatReportsComponent } from './consultanat-reports.component';

describe('ConsultanatReportsComponent', () => {
  let component: ConsultanatReportsComponent;
  let fixture: ComponentFixture<ConsultanatReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultanatReportsComponent]
    });
    fixture = TestBed.createComponent(ConsultanatReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
