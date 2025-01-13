import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSolicComponent } from './admin-solic.component';

describe('AdminSolicComponent', () => {
  let component: AdminSolicComponent;
  let fixture: ComponentFixture<AdminSolicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSolicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
