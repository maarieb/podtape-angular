import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodthequeComponent } from './podtheque.component';

describe('PodthequeComponent', () => {
  let component: PodthequeComponent;
  let fixture: ComponentFixture<PodthequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodthequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodthequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
