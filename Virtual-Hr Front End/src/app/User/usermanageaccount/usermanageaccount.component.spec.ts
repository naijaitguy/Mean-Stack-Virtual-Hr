import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanageaccountComponent } from './usermanageaccount.component';

describe('UsermanageaccountComponent', () => {
  let component: UsermanageaccountComponent;
  let fixture: ComponentFixture<UsermanageaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanageaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanageaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
