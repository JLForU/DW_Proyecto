import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPisoComponent } from './anadir-piso.component';

describe('AnadirPisoComponent', () => {
  let component: AnadirPisoComponent;
  let fixture: ComponentFixture<AnadirPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirPisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
