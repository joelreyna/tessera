import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountVerificationComponent } from './acount-verification.component';

describe('AcountVerificationComponent', () => {
  let component: AcountVerificationComponent;
  let fixture: ComponentFixture<AcountVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcountVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
