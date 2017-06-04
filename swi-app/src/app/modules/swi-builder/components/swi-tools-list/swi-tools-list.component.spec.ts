import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiToolsListComponent } from './swi-tools-list.component';

describe('SwiToolsListComponent', () => {
  let component: SwiToolsListComponent;
  let fixture: ComponentFixture<SwiToolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiToolsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiToolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
