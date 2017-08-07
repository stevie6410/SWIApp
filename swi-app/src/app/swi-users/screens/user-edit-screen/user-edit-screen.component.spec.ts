import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditScreenComponent } from './user-edit-screen.component';

describe('UserEditScreenComponent', () => {
  let component: UserEditScreenComponent;
  let fixture: ComponentFixture<UserEditScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
