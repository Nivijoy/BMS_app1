import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRenewPublicipComponent } from './list-renew-publicip.component';

describe('ListRenewPublicipComponent', () => {
  let component: ListRenewPublicipComponent;
  let fixture: ComponentFixture<ListRenewPublicipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRenewPublicipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRenewPublicipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
