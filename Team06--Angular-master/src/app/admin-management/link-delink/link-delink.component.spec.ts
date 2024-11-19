import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDelinkComponent } from './link-delink.component';

describe('LinkDelinkComponent', () => {
  let component: LinkDelinkComponent;
  let fixture: ComponentFixture<LinkDelinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkDelinkComponent]
    });
    fixture = TestBed.createComponent(LinkDelinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
