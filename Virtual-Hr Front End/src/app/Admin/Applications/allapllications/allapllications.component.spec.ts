import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllapllicationsComponent } from './allapllications.component';

describe('AllapllicationsComponent', () => {
  let component: AllapllicationsComponent;
  let fixture: ComponentFixture<AllapllicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllapllicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllapllicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
