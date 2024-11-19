/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultantLinkingDelinkingComponent } from './consultant-linking-delinking.component';

describe('ConsultantLinkingDelinkingComponent', () => {
  let component: ConsultantLinkingDelinkingComponent;
  let fixture: ComponentFixture<ConsultantLinkingDelinkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantLinkingDelinkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantLinkingDelinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
