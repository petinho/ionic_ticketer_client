import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewerPage } from './map-viewer.page';

describe('MapViewerPage', () => {
  let component: MapViewerPage;
  let fixture: ComponentFixture<MapViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
