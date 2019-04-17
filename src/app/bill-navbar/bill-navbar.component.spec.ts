import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillNavbarComponent } from './bill-navbar.component';

describe('BillNavbarComponent', () => {
  let component: BillNavbarComponent;
  let fixture: ComponentFixture<BillNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
