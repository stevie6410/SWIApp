import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiSettingsMenuComponent } from './swi-settings-menu.component';

describe('SwiSettingsMenuComponent', () => {
  let component: SwiSettingsMenuComponent;
  let fixture: ComponentFixture<SwiSettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiSettingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
