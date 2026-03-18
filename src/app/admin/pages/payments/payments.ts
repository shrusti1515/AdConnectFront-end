import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
selector:'app-payments',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./payments.html',
styleUrl:'./payments.css'
})
export class PaymentsComponent implements OnInit{

payments:any[]=[];
summary:any={};

loading=false;

filters={
status:'',
method:''
};

constructor(private adminService:AdminService,private cd: ChangeDetectorRef,private toast: ToastService){}

ngOnInit(){

this.loadSummary();
this.loadPayments();

}

loadSummary(){

this.adminService.getPaymentSummary()
.subscribe(res=>{
this.summary=res;
});

}

loadPayments(){

this.loading = true;

// 🔥 IMPORTANT: clear old data
this.payments = [];

this.adminService.getPayments(this.filters)
.subscribe({

next:(res:any)=>{

this.payments = res;
this.loading = false;

this.cd.detectChanges();  

},

error:(err)=>{

console.log(err);
this.loading = false;

this.cd.detectChanges();

}

});

}

updateStatus(paymentId:number,newStatus:string){

if(!newStatus) return;

this.adminService.updatePaymentStatus(paymentId,newStatus)
.subscribe({

next:(res)=>{

this.toast.show("Payment status updated");

this.loadPayments();
},

error:(err)=>{

    console.log(err);

    this.toast.show("Failed to update payment status");
}

});

}

}