import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  isUpdated: boolean = false;
  isLoading: boolean = true;
  isDeleting: boolean = false;
  post: any = {};
  id;
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    // Fire Get Post
    this.getPost();
    // Make Form
    this.makeForm();
  }


  // Get Post FN
  getPost() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.postService.getPost(this.id).subscribe(res => {
        if (res.type == HttpEventType.Sent) {
          this.isLoading = true;
        } else if (res.type == HttpEventType.Response) {
          this.isLoading = false;
          this.post = res.body;
          // Make Form
          this.makeForm();
        }
      })
    })
  }

  // Get access for inputs method
  title() {
    return this.editForm.controls.title
  }
  body() {
    return this.editForm.controls.body
  }

  // Make Form FN
  makeForm() {
    this.editForm = this.fb.group({
      title: [this.post.title, [Validators.required]],
      body: [this.post.body, [Validators.required]]
    })
  }

  // Update Post
  updatePost() {
    let formValue = this.editForm.value;
    this.postService.updatePost(this.id, formValue.title, formValue.body).subscribe(res => {
      if (res.type == HttpEventType.Sent) {
        this.isUpdated = true;
      } else if (res.type == HttpEventType.Response) {
        this.isUpdated = false;
        this.toastr.success('has been updated', 'Post');
        this.router.navigate(['/'])
      }
    })
  }

  // Open Modal And Delete Post
  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.postService.deletePost(this.id).subscribe(res => {
        if (res.type == HttpEventType.Sent) {
          this.isDeleting = true;
        } else if (res.type == HttpEventType.Response) {
          this.isDeleting = false;
          this.toastr.error('has been deleted', 'Post');
          this.router.navigate(['/'])
        }
      })
    },
      reason => {
      });
  }

}
