import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedeptComponent } from './savedept.component';

describe('SavedeptComponent', () => {
  let component: SavedeptComponent;
  let fixture: ComponentFixture<SavedeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
