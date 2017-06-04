import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiImageComponent } from './swi-image.component';

describe('SwiImageComponent', () => {
  let component: SwiImageComponent;
  let fixture: ComponentFixture<SwiImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
