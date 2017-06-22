import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdToolingFormComponent } from './std-tooling-form.component';

describe('StdToolingFormComponent', () => {
  let component: StdToolingFormComponent;
  let fixture: ComponentFixture<StdToolingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdToolingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdToolingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
