import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScheduleComponent } from './product-schedule.component';

describe('ProductScheduleComponent', () => {
  let component: ProductScheduleComponent;
  let fixture: ComponentFixture<ProductScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductScheduleComponent]
    });
    fixture = TestBed.createComponent(ProductScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
