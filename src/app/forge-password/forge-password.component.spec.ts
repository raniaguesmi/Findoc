import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgePasswordComponent } from './forge-password.component';

describe('ForgePasswordComponent', () => {
  let component: ForgePasswordComponent;
  let fixture: ComponentFixture<ForgePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
