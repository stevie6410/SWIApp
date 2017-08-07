import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiBrowserScreenComponent } from './swi-browser-screen.component';

describe('SwiBrowserScreenComponent', () => {
  let component: SwiBrowserScreenComponent;
  let fixture: ComponentFixture<SwiBrowserScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiBrowserScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiBrowserScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
