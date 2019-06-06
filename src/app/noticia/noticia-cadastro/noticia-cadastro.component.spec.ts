import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaCadastroComponent } from './noticia-cadastro.component';

describe('NoticiaCadastroComponent', () => {
  let component: NoticiaCadastroComponent;
  let fixture: ComponentFixture<NoticiaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
