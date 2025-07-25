import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardList } from './product-card-list';

describe('ProductCardList', () => {
  let component: ProductCardList;
  let fixture: ComponentFixture<ProductCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
