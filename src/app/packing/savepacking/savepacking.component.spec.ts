import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepackingComponent } from './savepacking.component';

describe('SavepackingComponent', () => {
  let component: SavepackingComponent;
  let fixture: ComponentFixture<SavepackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavepackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
