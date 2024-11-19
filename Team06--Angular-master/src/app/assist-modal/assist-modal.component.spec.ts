import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistModalComponent } from './assist-modal.component';

describe('AssistModalComponent', () => {
  let component: AssistModalComponent;
  let fixture: ComponentFixture<AssistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistModalComponent]
    });
    fixture = TestBed.createComponent(AssistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
