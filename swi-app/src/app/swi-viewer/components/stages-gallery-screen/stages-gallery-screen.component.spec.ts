import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesGalleryScreenComponent } from './stages-gallery-screen.component';

describe('StagesGalleryScreenComponent', () => {
  let component: StagesGalleryScreenComponent;
  let fixture: ComponentFixture<StagesGalleryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesGalleryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesGalleryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
