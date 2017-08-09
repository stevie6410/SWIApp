import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiSettingsStorageComponent } from './swi-settings-storage.component';

describe('SwiSettingsStorageComponent', () => {
  let component: SwiSettingsStorageComponent;
  let fixture: ComponentFixture<SwiSettingsStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiSettingsStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiSettingsStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
