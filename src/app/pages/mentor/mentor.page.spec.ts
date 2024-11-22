import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentorPage } from './mentor.page';

describe('MentorPage', () => {
  let component: MentorPage;
  let fixture: ComponentFixture<MentorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
