import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiproductosComponent } from './multiproductos.component';

describe('MultiproductosComponent', () => {
  let component: MultiproductosComponent;
  let fixture: ComponentFixture<MultiproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
