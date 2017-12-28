import { Component, OnInit,Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '../shared/comment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy=null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  
  commentForm: FormGroup;
  comm: Comment;
  
  formErrors = {
    'comment': '',
    'author': ''
  };


validationMessages = {
    'comment': {
      'required':      'Comment is required.',
      'maxlength':     'FirstName cannot be more than 125 characters long.'
    },
    'author': {
      'required':      'Your name is required.',
      'minlength':     'Your name must be at least 2 characters long.',
      'maxlength':     'Your Name cannot be more than 25 characters long.'
    },
  };
  
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
	
	
	}
	
	
	createForm() {
   this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(125)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });
	
	 this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
	  
	  this.onValueChanged();

   
  }
  
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  onSubmit() {
    this.comm = this.commentForm.value;
    console.log(this.comm);
	this.dishcopy.comments.push(this.comm);
	this.dishcopy.save()
	.subscribe(dish => { this.dish = dish; console.log(this.dish); })	;
    this.commentForm.reset({
      author: '',
      rating: '',
      comment: ''
    });
  }

  ngOnInit() {
    
    
	 this.createForm();
	 this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.dishcopy=dish; this.setPrevNext(dish.id); },
	   errmess => this.errMess = <any>errmess);
	  
  }
  
  
  
  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
      


  goBack(): void {
    this.location.back();
  }

}
