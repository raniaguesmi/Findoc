import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMedecinsComponent } from './liste-medecins.component';

describe('ListeMedecinsComponent', () => {
  let component: ListeMedecinsComponent;
  let fixture: ComponentFixture<ListeMedecinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMedecinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMedecinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
