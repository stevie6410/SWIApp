import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiBuilderComponent } from './swi-builder.component';

describe('SwiBuilderComponent', () => {
  let component: SwiBuilderComponent;
  let fixture: ComponentFixture<SwiBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
