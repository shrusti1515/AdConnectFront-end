import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ToastService } from './../../shared/services/toast.service';

@Component({
selector:'app-create-project',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./create-project.html',
styleUrls:['./create-project.css']
})
export class CreateProjectComponent implements OnInit{

    successMessage = "";
admakerId:any;

project={

clientId:0,
admakerId:0,
title:'',
description:'',
budget:'',
referenceLink:''

};

constructor(
private route:ActivatedRoute,
private router:Router,
private clientService:ClientService,
private toast:ToastService,
private cdr: ChangeDetectorRef,
){}

ngOnInit(){
this.cdr.markForCheck();
this.admakerId=this.route.snapshot.paramMap.get('admakerId');

const clientId=localStorage.getItem("clientId");

if(clientId){

this.project.clientId=Number(clientId);

}

this.project.admakerId=Number(this.admakerId);

}

createProject(){
this.cdr.markForCheck();
this.clientService.createProject(this.project)
.subscribe((res:any)=>{

this.toast.show("Project Created Successfully");
this.cdr.markForCheck();
setTimeout(()=>{
this.router.navigate(['/client/projects']);
},1500);

});

}

}