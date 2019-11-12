import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTicketComponent } from './agregar-ticket.component';

describe('AgregarTicketComponent', () => {
  let component: AgregarTicketComponent;
  let fixture: ComponentFixture<AgregarTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
