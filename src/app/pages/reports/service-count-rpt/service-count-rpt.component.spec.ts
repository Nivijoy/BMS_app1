import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCountRptComponent } from './service-count-rpt.component';

describe('ServiceCountRptComponent', () => {
  let component: ServiceCountRptComponent;
  let fixture: ComponentFixture<ServiceCountRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCountRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCountRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
