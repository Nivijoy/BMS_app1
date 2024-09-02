import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertStateComponent } from './upsert-state.component';

describe('UpsertStateComponent', () => {
  let component: UpsertStateComponent;
  let fixture: ComponentFixture<UpsertStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
