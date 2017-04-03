import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiBuilderScreenComponent } from './swi-builder-screen.component';

describe('SwiBuilderScreenComponent', () => {
  let component: SwiBuilderScreenComponent;
  let fixture: ComponentFixture<SwiBuilderScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiBuilderScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiBuilderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
