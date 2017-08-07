import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiHsListComponent } from './swi-hs-list.component';

describe('SwiHsListComponent', () => {
  let component: SwiHsListComponent;
  let fixture: ComponentFixture<SwiHsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiHsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiHsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
