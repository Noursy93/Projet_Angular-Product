import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId?:number; //= this.activatedRoute.snapshot.params['id'];
  // @ts-ignore
  productFormGroup:FormGroup;

  constructor( private activatedRoute:ActivatedRoute,
               private productsService:ProductsService,
               private fb:FormBuilder) {
    // @ts-ignore
    this.productId= this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.productsService.getProducts(this.productId)
      .subscribe(product=>{
        this.productFormGroup=this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })
      });
  }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Update Success");
      });
  }
}
