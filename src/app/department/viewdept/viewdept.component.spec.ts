import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeptComponent } from './viewdept.component';

describe('ViewdeptComponent', () => {
  let component: ViewdeptComponent;
  let fixture: ComponentFixture<ViewdeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
