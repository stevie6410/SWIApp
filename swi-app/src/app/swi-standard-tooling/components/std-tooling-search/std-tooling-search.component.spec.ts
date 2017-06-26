import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdToolingSearchComponent } from './std-tooling-search.component';

describe('StdToolingSearchComponent', () => {
  let component: StdToolingSearchComponent;
  let fixture: ComponentFixture<StdToolingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdToolingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdToolingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
