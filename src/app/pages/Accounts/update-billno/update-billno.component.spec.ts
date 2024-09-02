import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillnoComponent } from './update-billno.component';

describe('UpdateBillnoComponent', () => {
  let component: UpdateBillnoComponent;
  let fixture: ComponentFixture<UpdateBillnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
