import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesorderleadComponent } from './salesorderlead.component';

describe('SalesorderleadComponent', () => {
  let component: SalesorderleadComponent;
  let fixture: ComponentFixture<SalesorderleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesorderleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesorderleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
