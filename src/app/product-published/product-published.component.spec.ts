import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPublishedComponent } from './product-published.component';

describe('ProductPublishedComponent', () => {
  let component: ProductPublishedComponent;
  let fixture: ComponentFixture<ProductPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPublishedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
