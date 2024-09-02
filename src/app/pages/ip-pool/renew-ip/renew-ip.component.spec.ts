import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewIpComponent } from './renew-ip.component';

describe('RenewIpComponent', () => {
  let component: RenewIpComponent;
  let fixture: ComponentFixture<RenewIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
