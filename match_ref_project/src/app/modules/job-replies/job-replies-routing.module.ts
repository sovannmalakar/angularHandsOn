import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobRepliesContainerComponent } from './job-replies-container/job-replies-container.component';

const routes: Routes = [{
  path: '',
  component: JobRepliesContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRepliesRoutingModule { }
