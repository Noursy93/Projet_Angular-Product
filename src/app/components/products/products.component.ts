import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductModel} from "../../model/product.model";
import {Observable, map, startWith, catchError, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?:Observable<AppDataState<ProductModel[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message})));
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message})));
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message})));
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message})));
  }

  onSelect(p: ProductModel) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: ProductModel) {
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: ProductModel) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
