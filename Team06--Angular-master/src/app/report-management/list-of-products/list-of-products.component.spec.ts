import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProductsComponent } from './list-of-products.component';

describe('ListOfProductsComponent', () => {
  let component: ListOfProductsComponent;
  let fixture: ComponentFixture<ListOfProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfProductsComponent]
    });
    fixture = TestBed.createComponent(ListOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
