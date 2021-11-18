import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeItemComponent } from './bike-item.component';

describe('BikeItemComponent', () => {
  let component: BikeItemComponent;
  let fixture: ComponentFixture<BikeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
