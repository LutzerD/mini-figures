import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureShowcaseComponent } from './miniature-showcase.component';

describe('MiniatureShowcaseComponent', () => {
  let component: MiniatureShowcaseComponent;
  let fixture: ComponentFixture<MiniatureShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniatureShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniatureShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
