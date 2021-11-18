import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDockComponent } from './add-dock.component';

describe('AddDockComponent', () => {
  let component: AddDockComponent;
  let fixture: ComponentFixture<AddDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
