import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { RouterModule } from '@angular/router';

@Component({
selector:'app-projects',
standalone:true,
imports:[CommonModule, RouterModule],
templateUrl:'./projects.html',
styleUrls:['./projects.css']
})
export class ProjectsComponent implements OnInit{

projects:any[]=[];
filteredProjects:any[]=[];
activeTab='Pending';

constructor(private clientService:ClientService, private cdr: ChangeDetectorRef){}

ngOnInit(){

const clientId=localStorage.getItem("clientId");

if(clientId){

this.clientService.getMyProjects(Number(clientId))
.subscribe((res:any)=>{

this.projects=res;
this.cdr.markForCheck();
this.filterProjects('Pending');

});

}

}

filterProjects(tab:string){

this.activeTab = tab;

if(tab === "Active"){

this.filteredProjects = this.projects.filter(
p => p.negotiations && p.negotiations.length > 0
);

}
else{

this.filteredProjects = this.projects.filter(
p => p.status === tab
);

}
this.cdr.markForCheck();

}

}


