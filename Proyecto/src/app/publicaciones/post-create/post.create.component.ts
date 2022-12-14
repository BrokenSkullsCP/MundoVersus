import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../../service/post.service";

interface Work{
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})


export class PostCreateComponent implements OnInit {

  works: Work[] = [
    {value:'none-0', viewValue: 'Ninguno'},
    {value:'serigrafia-1', viewValue: 'Serigrafia'},
    {value:'sublimacion-2', viewValue: 'Sublimación'},
    {value:'aplicacion-3', viewValue: 'Aplicación de vinil'},
    {value:'transfer-4', viewValue: 'Transfer'},
    {value:'plastisol-5', viewValue: 'Plastisol'},
  ];

  private mode = 'create';
  private postId: string;
  post: Post;
  public spinner = true;

  constructor(public postsService: PostService, public route: ActivatedRoute) { }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode == "create") {
      this.postsService.addPost(form.value.title, form.value.content, form.value.pares, form.value.process, form.value.style, form.value.corrida);
      form.resetForm();
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content,
        form.value.pares,
        form.value.process,
        form.value.style,
        form.value.corrida,
      )
    }

  }

  ngOnInit() {
    setTimeout(()=>{this.spinner = false;}, 1200);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            pares: postData.pares,
            process: postData.process,
            style: postData.style,
            corrida: postData.corrida,
           }
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

}
