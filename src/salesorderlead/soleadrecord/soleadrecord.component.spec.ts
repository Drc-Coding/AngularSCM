import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoleadrecordComponent } from './soleadrecord.component';

describe('SoleadrecordComponent', () => {
  let component: SoleadrecordComponent;
  let fixture: ComponentFixture<SoleadrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoleadrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoleadrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
