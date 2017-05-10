import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiViewerScreenComponent } from './swi-viewer-screen.component';

describe('SwiViewerScreenComponent', () => {
  let component: SwiViewerScreenComponent;
  let fixture: ComponentFixture<SwiViewerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiViewerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiViewerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
