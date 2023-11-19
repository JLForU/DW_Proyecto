import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirTarifaComponent } from './anadir-tarifa.component';

describe('AnadirTarifaComponent', () => {
  let component: AnadirTarifaComponent;
  let fixture: ComponentFixture<AnadirTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
