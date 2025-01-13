import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudUserComponent } from './solicitud-user.component';

describe('SolicitudUserComponent', () => {
  let component: SolicitudUserComponent;
  let fixture: ComponentFixture<SolicitudUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
