import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanageaccountComponent } from './adminmanageaccount.component';

describe('AdminmanageaccountComponent', () => {
  let component: AdminmanageaccountComponent;
  let fixture: ComponentFixture<AdminmanageaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmanageaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmanageaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
