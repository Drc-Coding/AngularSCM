import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingapprovalComponent } from './packingapproval.component';

describe('PackingapprovalComponent', () => {
  let component: PackingapprovalComponent;
  let fixture: ComponentFixture<PackingapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
