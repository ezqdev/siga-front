import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBienesComponent } from './admin-bienes.component';

describe('AdminBienesComponent', () => {
  let component: AdminBienesComponent;
  let fixture: ComponentFixture<AdminBienesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBienesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
