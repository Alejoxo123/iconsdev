import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridIconsComponent } from './grid-icons.component';

describe('GridIconsComponent', () => {
  let component: GridIconsComponent;
  let fixture: ComponentFixture<GridIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
