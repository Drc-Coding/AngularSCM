import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpackingComponent } from './checkpacking.component';

describe('CheckpackingComponent', () => {
  let component: CheckpackingComponent;
  let fixture: ComponentFixture<CheckpackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
