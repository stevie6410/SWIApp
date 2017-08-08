import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiSettingsScreenComponent } from './swi-settings-screen.component';

describe('SwiSettingsScreenComponent', () => {
  let component: SwiSettingsScreenComponent;
  let fixture: ComponentFixture<SwiSettingsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiSettingsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiSettingsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
