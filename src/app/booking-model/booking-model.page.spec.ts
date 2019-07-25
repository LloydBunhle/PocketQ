import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingModelPage } from './booking-model.page';

describe('BookingModelPage', () => {
  let component: BookingModelPage;
  let fixture: ComponentFixture<BookingModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
