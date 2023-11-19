import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirTipoComponent } from './anadir-tipo.component';

describe('AnadirTipoComponent', () => {
  let component: AnadirTipoComponent;
  let fixture: ComponentFixture<AnadirTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
