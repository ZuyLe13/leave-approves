import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileListComponent } from './mobile-list.component';

describe('MobileListComponent', () => {
  let component: MobileListComponent;
  let fixture: ComponentFixture<MobileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
