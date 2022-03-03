import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureDisplayComponent } from './miniature-display.component';

describe('MiniatureDisplayComponent', () => {
  let component: MiniatureDisplayComponent;
  let fixture: ComponentFixture<MiniatureDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniatureDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniatureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
