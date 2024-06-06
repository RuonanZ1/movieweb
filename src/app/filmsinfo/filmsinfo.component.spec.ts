import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsinfoComponent } from './filmsinfo.component';

describe('FilmsinfoComponent', () => {
  let component: FilmsinfoComponent;
  let fixture: ComponentFixture<FilmsinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
