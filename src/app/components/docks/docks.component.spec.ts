import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocksComponent } from './docks.component';

describe('DocksComponent', () => {
  let component: DocksComponent;
  let fixture: ComponentFixture<DocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
