import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustrackComponent } from './custrack.component';

describe('CustrackComponent', () => {
  let component: CustrackComponent;
  let fixture: ComponentFixture<CustrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
