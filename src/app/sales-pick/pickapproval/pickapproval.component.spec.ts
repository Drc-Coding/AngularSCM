import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickapprovalComponent } from './pickapproval.component';

describe('PickapprovalComponent', () => {
  let component: PickapprovalComponent;
  let fixture: ComponentFixture<PickapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
