import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterRdvComponent } from './consulter-rdv.component';

describe('ConsulterRdvComponent', () => {
  let component: ConsulterRdvComponent;
  let fixture: ComponentFixture<ConsulterRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
