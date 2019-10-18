import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustrackingComponent } from './custracking.component';

describe('CustrackingComponent', () => {
  let component: CustrackingComponent;
  let fixture: ComponentFixture<CustrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
