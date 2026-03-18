import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
selector:'app-admin-projects',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./projects.html',
styleUrl:'./projects.css'
})
export class ProjectsComponentt implements OnInit{

    projects:any[]=[];
selectedProject:any=null;
loading=false;

// statusFilter="";
filters={
status:"",
minBudget:null,
maxBudget:null
};

constructor(private adminService:AdminService,private cd: ChangeDetectorRef,private toast: ToastService){}

ngOnInit(){
this.loadProjects();
}

loadProjects(){

this.loading = true;

this.adminService.getProjects(this.filters)
.subscribe({

next:(res:any)=>{

this.projects = res;
this.loading = false;

this.cd.detectChanges();   // force UI refresh

},

error:(err)=>{

console.log(err);
this.loading = false;

this.cd.detectChanges();

}

});

}

viewProject(project:any){
this.selectedProject=project;
}

updateStatus(projectId:number,newStatus:string){

if(!newStatus) return;

this.adminService.updateProjectStatus(projectId,newStatus)
.subscribe({

next:(res)=>{

this.toast.show("Project status updated successfully");

this.loadProjects();

},

error:(err)=>{

console.log(err);

this.toast.show("Failed to update project status");

}

});

}

}