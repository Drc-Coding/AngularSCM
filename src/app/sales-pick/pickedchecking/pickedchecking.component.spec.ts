import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedcheckingComponent } from './pickedchecking.component';

describe('PickedcheckingComponent', () => {
  let component: PickedcheckingComponent;
  let fixture: ComponentFixture<PickedcheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedcheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedcheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
