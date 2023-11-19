import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPisoComponent } from './actualizar-piso.component';

describe('ActualizarPisoComponent', () => {
  let component: ActualizarPisoComponent;
  let fixture: ComponentFixture<ActualizarPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
