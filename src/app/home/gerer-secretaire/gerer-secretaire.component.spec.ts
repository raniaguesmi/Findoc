import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererSecretaireComponent } from './gerer-secretaire.component';

describe('GererSecretaireComponent', () => {
  let component: GererSecretaireComponent;
  let fixture: ComponentFixture<GererSecretaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererSecretaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
