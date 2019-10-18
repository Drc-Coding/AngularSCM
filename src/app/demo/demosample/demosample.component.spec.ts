import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosampleComponent } from './demosample.component';

describe('DemosampleComponent', () => {
  let component: DemosampleComponent;
  let fixture: ComponentFixture<DemosampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemosampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemosampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
