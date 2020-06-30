import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerMotdpasseComponent } from './changer-motdpasse.component';

describe('ChangerMotdpasseComponent', () => {
  let component: ChangerMotdpasseComponent;
  let fixture: ComponentFixture<ChangerMotdpasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerMotdpasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerMotdpasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
