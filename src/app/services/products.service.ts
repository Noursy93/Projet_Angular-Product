import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModel} from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductsService{

  constructor(private http:HttpClient) {
  }
  getAllProducts():Observable<ProductModel[]>{
    //let host = (Math.random()>0.2)?environment.host:environment.unreachableHost;
    let host = environment.host
    return this.http.get<ProductModel[]>(host+"/products");
  }
  getSelectedProducts():Observable<ProductModel[]>{
    let host = environment.host
    return this.http.get<ProductModel[]>(host+"/products?selected=true");
  }
  getAvailableProducts():Observable<ProductModel[]>{
    let host = environment.host
    return this.http.get<ProductModel[]>(host+"/products?available=true");
  }
  searchProducts(keyword:string):Observable<ProductModel[]>{
    let host = environment.host
    return this.http.get<ProductModel[]>(host+"/products?name_like="+keyword);
  }
  select(product:ProductModel):Observable<ProductModel>{
    let host = environment.host
    product.selected = !product.selected;
    return this.http.put<ProductModel>(host+"/products/"+product.id,product);
  }
  deleteProduct(product:ProductModel):Observable<void>{
    let host;
    let val=confirm("Voulez vous vraiment supprimer "+product.name);
    if(val==true)
    host = environment.host
    product.selected = !product.selected;
    return this.http.delete<void>(host+"/products/"+product.id);
  }
  save(product:ProductModel):Observable<ProductModel>{
    let host = environment.host;
    return this.http.post<ProductModel>(host+"/products",product);
  }
  getProducts(id:number):Observable<ProductModel>{
    let host = environment.host
    return this.http.get<ProductModel>(host+"/products/"+id);
  }
  updateProduct(product:ProductModel):Observable<ProductModel>{
    let host = environment.host
    return this.http.put<ProductModel>(host+"/products/"+product.id,product);
  }
}
