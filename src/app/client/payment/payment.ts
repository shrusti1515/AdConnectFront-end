import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from './../../shared/services/toast.service';

@Component({
selector:'app-payment',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./payment.html',
styleUrl:'./payment.css'
})
export class PaymentComponent implements OnInit{
clientName:any;
project:any;

cardNumber="";
expiry="";
cvv="";
method="Card";

constructor(
private route:ActivatedRoute,
private router:Router,
private clientService:ClientService,
private toast:ToastService
){}

ngOnInit(){
this.clientName = localStorage.getItem("clientName");
const id = Number(this.route.snapshot.queryParamMap.get('projectId'));


this.clientService.getProjectDetails(id)
.subscribe(res=>{
this.project=res;
});

}

pay(){
    const clientId=localStorage.getItem("clientId");

const payment={
projectId:this.project.id,
amount:this.project.negotiation.finalAmount,
method:this.method
};

this.clientService.createPayment(payment)
.subscribe((res:any)=>{

const statusBody={
paymentId:res.id,
status:"Paid"

};

this.clientService.updatePaymentStatus(statusBody)
.subscribe(()=>{

this.toast.show("Payment Successful");

this.router.navigate(['/client/payment-success',res.id]);

});

});

}
}



