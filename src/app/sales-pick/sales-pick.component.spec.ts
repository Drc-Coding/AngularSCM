import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPickComponent } from './sales-pick.component';

describe('SalesPickComponent', () => {
  let component: SalesPickComponent;
  let fixture: ComponentFixture<SalesPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
