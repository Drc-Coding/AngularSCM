import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwarehouseComponent } from './viewwarehouse.component';

describe('ViewwarehouseComponent', () => {
  let component: ViewwarehouseComponent;
  let fixture: ComponentFixture<ViewwarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewwarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
