import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAreaComponent } from './solicitud-area.component';

describe('SolicitudAreaComponent', () => {
  let component: SolicitudAreaComponent;
  let fixture: ComponentFixture<SolicitudAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
