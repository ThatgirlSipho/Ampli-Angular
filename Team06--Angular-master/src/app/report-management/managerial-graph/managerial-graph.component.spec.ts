import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerialGraphComponent } from './managerial-graph.component';

describe('ManagerialGraphComponent', () => {
  let component: ManagerialGraphComponent;
  let fixture: ComponentFixture<ManagerialGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerialGraphComponent]
    });
    fixture = TestBed.createComponent(ManagerialGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
