import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMedecinComponent } from './modifier-medecin.component';

describe('ModifierMedecinComponent', () => {
  let component: ModifierMedecinComponent;
  let fixture: ComponentFixture<ModifierMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
