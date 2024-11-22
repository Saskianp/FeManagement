import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantPage } from './participant.page';

describe('ParticipantPage', () => {
  let component: ParticipantPage;
  let fixture: ComponentFixture<ParticipantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
