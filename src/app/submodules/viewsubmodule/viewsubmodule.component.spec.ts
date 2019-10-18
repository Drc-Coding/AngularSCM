import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubmoduleComponent } from './viewsubmodule.component';

describe('ViewsubmoduleComponent', () => {
  let component: ViewsubmoduleComponent;
  let fixture: ComponentFixture<ViewsubmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsubmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsubmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
