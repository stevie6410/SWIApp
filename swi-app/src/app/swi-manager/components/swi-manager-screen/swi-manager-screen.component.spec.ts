import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiManagerScreenComponent } from './swi-manager-screen.component';

describe('SwiManagerScreenComponent', () => {
  let component: SwiManagerScreenComponent;
  let fixture: ComponentFixture<SwiManagerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiManagerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiManagerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
