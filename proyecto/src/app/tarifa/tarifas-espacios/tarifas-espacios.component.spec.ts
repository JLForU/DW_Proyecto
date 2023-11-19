import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEspaciosComponent } from './tarifas-espacios.component';

describe('TarifasEspaciosComponent', () => {
  let component: TarifasEspaciosComponent;
  let fixture: ComponentFixture<TarifasEspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasEspaciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
