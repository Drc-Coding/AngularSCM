import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescUpdationComponent } from './presc-updation.component';

describe('PrescUpdationComponent', () => {
  let component: PrescUpdationComponent;
  let fixture: ComponentFixture<PrescUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescUpdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
