import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/services/toast.service';

@Component({
selector:'app-project-detail',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./project-detail.html',
styleUrl:'./project-detail.css'
})
export class ProjectDetailComponent implements OnInit{

  successMessage = "";
project:any;

offerMessage="";
counterMessage="";
finalAmount=0;

paymentMethod="UPI";

rating=0;
reviewText="";


constructor(
private route:ActivatedRoute,
private clientService:ClientService,
private router:Router,
private toast:ToastService,
private cdr: ChangeDetectorRef
){}

ngOnInit(){

const id=this.route.snapshot.params['id'];
this.loadProject(id);

}

loadProject(id:number){

this.clientService.getProjectDetails(id)
.subscribe(res=>{
this.project=res;
this.cdr.markForCheck();
});

}


startNegotiation(){
this.cdr.markForCheck();
const body={
projectId:this.project.id,
message:this.offerMessage,
senderRole:"Client"
};

this.clientService.startNegotiation(body)
.subscribe(()=>{
this.toast.show("Negotiation started");
this.loadProject(this.project.id);
this.cdr.markForCheck();

});

}

sendCounter(){

const body={
projectId:this.project.id,
message:this.counterMessage,
senderRole:"Client"
};

this.clientService.replyNegotiation(body)
.subscribe(()=>{
this.counterMessage="";
this.loadProject(this.project.id);
this.cdr.markForCheck();

});

}

finalizeDeal(){

this.clientService
.finalizeNegotiation(this.project.id,this.finalAmount)
.subscribe(()=>{
this.toast.show("Deal Finalized");
this.loadProject(this.project.id);
this.cdr.markForCheck();

});

}

goToPayment(){

this.router.navigate(
['/client/payment'],
{
queryParams:{
projectId:this.project.id,
amount:this.project.negotiation.finalAmount
}
});

}

// pay(){

// const payment={
// projectId:this.project.id,
// amount:this.project.negotiation.finalAmount,
// method:this.paymentMethod
// };

// this.clientService.createPayment(payment)
// .subscribe(()=>{
// alert("Payment Successful");
// this.loadProject(this.project.id);
// });

// }





closeProject(){
this.cdr.markForCheck();

const clientId=localStorage.getItem("clientId");

this.clientService
.closeProject(this.project.id, Number(clientId))
.subscribe(()=>{

this.toast.show("Project Closed");

this.loadProject(this.project.id);
this.cdr.markForCheck();

});

}


submitReview(){

const clientId=localStorage.getItem("clientId");

const review = {

projectId: this.project.id,
clientId: clientId,
admakerId: this.project.admaker?.id,
rating: this.rating,
comment: this.reviewText

};

this.clientService.addReview(review).subscribe({

next: () => {

this.toast.show("Review submitted successfully");

this.rating = 0;
this.reviewText = "";

},

error: (err) => {

console.log(err);
this.toast.show("Review submission failed");

}

});

}

}