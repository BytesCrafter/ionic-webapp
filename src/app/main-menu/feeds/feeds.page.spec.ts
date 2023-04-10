import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedsPage } from './feeds.page';

describe('FeedsPage', () => {
  let component: FeedsPage;
  let fixture: ComponentFixture<FeedsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
