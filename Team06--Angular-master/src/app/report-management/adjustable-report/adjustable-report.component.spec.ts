import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustableReportComponent } from './adjustable-report.component';

describe('AdjustableReportComponent', () => {
  let component: AdjustableReportComponent;
  let fixture: ComponentFixture<AdjustableReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustableReportComponent]
    });
    fixture = TestBed.createComponent(AdjustableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
