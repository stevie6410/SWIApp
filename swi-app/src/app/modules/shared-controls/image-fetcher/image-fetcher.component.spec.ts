import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFetcherComponent } from './image-fetcher.component';

describe('ImageFetcherComponent', () => {
  let component: ImageFetcherComponent;
  let fixture: ComponentFixture<ImageFetcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFetcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFetcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
