import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisSalidaComponent } from './regis-salida.component';

describe('RegisSalidaComponent', () => {
  let component: RegisSalidaComponent;
  let fixture: ComponentFixture<RegisSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisSalidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
