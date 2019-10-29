import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqrcodeComponent } from './addqrcode.component';

describe('AddqrcodeComponent', () => {
  let component: AddqrcodeComponent;
  let fixture: ComponentFixture<AddqrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddqrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
