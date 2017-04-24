import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiPropertiesPanelComponent } from './swi-properties-panel.component';

describe('SwiPropertiesPanelComponent', () => {
  let component: SwiPropertiesPanelComponent;
  let fixture: ComponentFixture<SwiPropertiesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiPropertiesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiPropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
