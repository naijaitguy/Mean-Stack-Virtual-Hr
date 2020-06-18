import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleapllicationsComponent } from './singleapllications.component';

describe('SingleapllicationsComponent', () => {
  let component: SingleapllicationsComponent;
  let fixture: ComponentFixture<SingleapllicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleapllicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleapllicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
