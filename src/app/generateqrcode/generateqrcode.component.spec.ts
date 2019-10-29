import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateqrcodeComponent } from './generateqrcode.component';

describe('GenerateqrcodeComponent', () => {
  let component: GenerateqrcodeComponent;
  let fixture: ComponentFixture<GenerateqrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateqrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
