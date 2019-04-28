import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaFormComponent } from './fatura-form.component';

describe('FaturaFormComponent', () => {
  let component: FaturaFormComponent;
  let fixture: ComponentFixture<FaturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
