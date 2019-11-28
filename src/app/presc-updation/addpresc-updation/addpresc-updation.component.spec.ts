import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprescUpdationComponent } from './addpresc-updation.component';

describe('AddprescUpdationComponent', () => {
  let component: AddprescUpdationComponent;
  let fixture: ComponentFixture<AddprescUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprescUpdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprescUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
