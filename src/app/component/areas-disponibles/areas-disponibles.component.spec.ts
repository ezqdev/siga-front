import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasDisponiblesComponent } from './areas-disponibles.component';

describe('AreasDisponiblesComponent', () => {
  let component: AreasDisponiblesComponent;
  let fixture: ComponentFixture<AreasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasDisponiblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
