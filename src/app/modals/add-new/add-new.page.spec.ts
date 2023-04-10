import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewPage } from './add-new.page';

describe('AddNewPage', () => {
  let component: AddNewPage;
  let fixture: ComponentFixture<AddNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
