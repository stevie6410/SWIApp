import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiNewComponent } from './swi-new.component';

describe('SwiNewComponent', () => {
  let component: SwiNewComponent;
  let fixture: ComponentFixture<SwiNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
