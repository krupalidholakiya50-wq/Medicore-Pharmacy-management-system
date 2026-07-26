import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Sales} from './sales.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SalesInformationArray } from './salesInformationArray.model';

@Injectable({
  providedIn: 'root'
})
export class SalesInteractionService {

  private sales: any[] = [];
  private salesUpdated = new Subject<Sales[]>();

  private salesChart: any[] = [];
  private salesChartUpdated = new Subject<any[]>();

  // MongoDB Atlas Connection URI Endpoint reference:
  // mongodb://krupalidholakiya50_db_user:ui27vxtbz@ac-8t0fdfs-shard-00-00.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-01.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-02.y6gk4pc.mongodb.net:27017/?ssl=true&replicaSet=atlas-13pxsr-shard-0&authSource=admin&appName=Cluster0
  private mongoAtlasUri = 'mongodb://krupalidholakiya50_db_user:ui27vxtbz@ac-8t0fdfs-shard-00-00.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-01.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-02.y6gk4pc.mongodb.net:27017/?ssl=true&replicaSet=atlas-13pxsr-shard-0&authSource=admin&appName=Cluster0';

  constructor(private http: HttpClient, private router : Router){}

  // Local memory datasets for instant rendering fallback
  public defaultMonthSales = [
    { month: 'Jan-2020', sales: 9600 },
    { month: 'Feb-2020', sales: 15600 },
    { month: 'Mar-2020', sales: 9600 },
    { month: 'Apr-2020', sales: 15600 },
    { month: 'May-2020', sales: 22800 },
    { month: 'Jun-2020', sales: 6000 },
    { month: 'Jul-2020', sales: 7200 }
  ];

  public defaultDrugSales = [
    { drug: 'Citazin', quantity: 90 },
    { drug: 'Panadol', quantity: 75 },
    { drug: 'Metformin', quantity: 60 },
    { drug: 'Salvitamol', quantity: 50 },
    { drug: 'Amoxillin', quantity: 40 },
    { drug: 'qwn', quantity: 25 },
    { drug: 'jdksfh', quantity: 18 },
    { drug: 'kahsdf', quantity: 12 }
  ];

  addSales( drugName: Array<any> =[], totalPrice: number, tax: number, paidAmount: number, balance: number) {
    const sales = {id: null,
                                drugName: drugName,
                                totalPrice: totalPrice,
                                tax:tax,
                                paidAmount: paidAmount,
                                balance:balance,
                                dateTime:null
                               };
    this.http.post<{message: string, salesId: string}>('http://localhost:3000/api/sales',sales)
    .subscribe((responseData)=>{
      const id = responseData.salesId;
      sales.id =id;
      this.sales.push(sales);
      this.salesUpdated.next([...this.sales]);
      //this.router.navigate(["/suppliers/create"]);
    });

  }

  getSales() {
    this.http.get<{message: string, sales: any}>('http://localhost:3000/api/sales')
    .pipe(map(salesData => {
     return salesData.sales.map(sales=>{
       return{
        drugName: sales.drugName,
        dateTime: sales.dateTime,
        totalPrice: sales.totalPrice,
        tax: sales.tax,
        paidAmount: sales.paidAmount,
        balance: sales.balance,
        id:sales._id,


       }
     })
    }))
    .subscribe((transformedSales)=>{
      this.sales = transformedSales;
      this.salesUpdated.next([...this.sales])
    });

  }

  getSalesChartInfo2():Observable<any>{

    return this.http.get<{ message: string,sales:any}>('http://localhost:3000/api/sales/getSalesChartInfo');

  }


   getSalesChartInfo(){
    console.log("service")
    this.http.get<{message: string, sales: any}>('http://localhost:3000/api/sales/getSalesChartInfo')
    .pipe(map(salesData => {
     return salesData.sales.map(sales=>{
       return{
        // drugName: sales.drugName,
        totalPrice: sales.total,
        dateTime: sales._id,
        drugName: "null",
        tax: "null",
        paidAmount: "null",
        balance: "null",
        id:"null",
       }
     })
    }))
    .subscribe((transformedSales)=>{

      this.salesChart = transformedSales;
      this.salesChartUpdated.next([...this.salesChart])
    });
  }

  getSalesChartUpdateListener() {
    return this.salesChartUpdated.asObservable();
    // console.log(this.salesChart);
  }

  getSalesUpdateListener() {
    return this.salesUpdated.asObservable();
    // console.log(this.salesChart);
  }

  // updateSupplier(id: string , supplierID: string , name: string, email: string, contact: string, drugsAvailable: string){
  //   const supplier : Supplier ={id:id ,supplierID:supplierID , name:name , email:email , contact:contact , drugsAvailable:drugsAvailable};
  //   this.http
  //            .put('http://localhost:3000/api/supplier/' + id , supplier)
  //            .subscribe(response => {
  //              const updatedSuppliers = [...this.supplier];
  //              const oldSupplierIndex = updatedSuppliers.findIndex(s => s.id ===supplier.id);
  //              updatedSuppliers[oldSupplierIndex] = supplier;
  //              this.supplierUpdated.next([...this.supplier]);
  //              this.router.navigate(["/suppliers/create"]);
  //            });
  // }

}
