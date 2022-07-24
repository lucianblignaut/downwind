import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchbarComponent } from './mobile-searchbar.component';

describe('MobileSearchbarComponent', () => {
  let component: MobileSearchbarComponent;
  let fixture: ComponentFixture<MobileSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
