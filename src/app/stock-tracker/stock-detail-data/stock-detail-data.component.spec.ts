import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailDataComponent } from './stock-detail-data.component';

describe('StockDetailDataComponent', () => {
  let component: StockDetailDataComponent;
  let fixture: ComponentFixture<StockDetailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
