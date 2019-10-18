import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpackingComponent } from './viewpacking.component';

describe('ViewpackingComponent', () => {
  let component: ViewpackingComponent;
  let fixture: ComponentFixture<ViewpackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
