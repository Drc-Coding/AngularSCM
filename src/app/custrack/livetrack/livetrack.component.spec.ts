import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetrackComponent } from './livetrack.component';

describe('LivetrackComponent', () => {
  let component: LivetrackComponent;
  let fixture: ComponentFixture<LivetrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivetrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
