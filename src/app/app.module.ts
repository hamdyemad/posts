import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// http
import { HttpClientModule } from '@angular/common/http';
// Forms
import { ReactiveFormsModule } from '@angular/forms';
// Comp
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
// Toastr
import { ToastrModule } from 'ngx-toastr';

// Shimmer
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
// Modal
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxShimmerLoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
