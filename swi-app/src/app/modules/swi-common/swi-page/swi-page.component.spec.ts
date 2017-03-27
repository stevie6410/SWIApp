import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiPageComponent } from './swi-page.component';

describe('SwiPageComponent', () => {
  let component: SwiPageComponent;
  let fixture: ComponentFixture<SwiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
