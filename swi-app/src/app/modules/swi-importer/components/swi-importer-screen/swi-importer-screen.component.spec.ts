import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiImporterScreenComponent } from './swi-importer-screen.component';

describe('SwiImporterScreenComponent', () => {
  let component: SwiImporterScreenComponent;
  let fixture: ComponentFixture<SwiImporterScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiImporterScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiImporterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
