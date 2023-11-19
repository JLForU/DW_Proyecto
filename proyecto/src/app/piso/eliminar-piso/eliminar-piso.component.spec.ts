import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPisoComponent } from './eliminar-piso.component';

describe('EliminarPisoComponent', () => {
  let component: EliminarPisoComponent;
  let fixture: ComponentFixture<EliminarPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
