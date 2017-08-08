import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiSettingsFeaturesComponent } from './swi-settings-features.component';

describe('SwiSettingsFeaturesComponent', () => {
  let component: SwiSettingsFeaturesComponent;
  let fixture: ComponentFixture<SwiSettingsFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiSettingsFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiSettingsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
