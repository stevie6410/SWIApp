import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdToolingLookupComponent } from './std-tooling-lookup.component';

describe('StdToolingLookupComponent', () => {
  let component: StdToolingLookupComponent;
  let fixture: ComponentFixture<StdToolingLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdToolingLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdToolingLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
