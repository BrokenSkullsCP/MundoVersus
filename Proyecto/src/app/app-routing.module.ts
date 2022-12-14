import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MapsComponent } from './maps/maps.component';
import { PostCreateComponent } from './publicaciones/post-create/post.create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';

const routes: Routes = [
  { path: 'create', component: PostCreateComponent },
  { path: 'list', component: PostListComponent },
  { path: 'edit/: postId', component: PostCreateComponent },
  { path: 'ubicacion', component: MapsComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
