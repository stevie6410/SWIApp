import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiToolsListViewComponent } from './swi-tools-list-view.component';

describe('SwiToolsListViewComponent', () => {
  let component: SwiToolsListViewComponent;
  let fixture: ComponentFixture<SwiToolsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiToolsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiToolsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
