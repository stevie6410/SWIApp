import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiHeaderComponent } from './swi-header.component';

describe('SwiHeaderComponent', () => {
  let component: SwiHeaderComponent;
  let fixture: ComponentFixture<SwiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
