import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from './../../shared/services/toast.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css'
})
export class PaymentSuccessComponent {

    constructor(private clientService:ClientService,private router:Router,private route:ActivatedRoute,private toast:ToastService){}

    projectId:any;

ngOnInit(){

this.projectId=this.route.snapshot.params['id'];

}

invoice:any;
receipt:any;

downloadInvoice(){

this.clientService
.getInvoice(this.projectId)
.subscribe(res=>{

this.invoice=res;

alert(
`Invoice No: ${this.invoice.invoiceNo}
Project: ${this.invoice.project}
Amount: ₹${this.invoice.amount}`
);

});

}



downloadReceipt(){

this.clientService
.generateReceipt(this.projectId)
.subscribe(()=>{

this.clientService
.getReceipt(this.projectId)
.subscribe(res=>{

this.receipt=res;

// this.toast.show("Receipt Generated");

alert(
`Receipt Generated
Receipt No: ${this.receipt.receiptNumber}`
);

});

});

}


getReceipt(){

this.clientService
.getReceipt(this.projectId)
.subscribe(res=>{

this.receipt = res;

alert(
`Receipt
Receipt No: ${this.receipt.receiptNumber}
Project: ${this.receipt.payment.projectTitle}
Amount: ₹${this.receipt.payment.amount}`
);

});

}


goToProjects(){
this.router.navigate(['/client/projects']);
}



}