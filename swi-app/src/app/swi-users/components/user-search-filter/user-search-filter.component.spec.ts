import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchFilterComponent } from './user-search-filter.component';

describe('UserSearchFilterComponent', () => {
  let component: UserSearchFilterComponent;
  let fixture: ComponentFixture<UserSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
