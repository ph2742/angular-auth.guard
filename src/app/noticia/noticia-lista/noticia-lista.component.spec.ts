import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaListaComponent } from './noticia-lista.component';

describe('NoticiaListaComponent', () => {
    let component: NoticiaListaComponent;
    let fixture: ComponentFixture<NoticiaListaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NoticiaListaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoticiaListaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
