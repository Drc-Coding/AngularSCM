import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepickComponent } from './savepick.component';

describe('SavepickComponent', () => {
  let component: SavepickComponent;
  let fixture: ComponentFixture<SavepickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavepickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavepickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
