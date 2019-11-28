import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertsalesComponent } from './convertsales.component';

describe('ConvertsalesComponent', () => {
  let component: ConvertsalesComponent;
  let fixture: ComponentFixture<ConvertsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
