import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {clearSelectedCourse, createCourse, setEditMode, showForm, updateCourse} from "../states/courses.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getEditMode, getSelectedCourse} from "../states/courses.selector";
import {Course} from "../../models/course.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy{

  courseForm!: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {}

  editMode: boolean = false;
  course: Course | null = null;
  editModeSubscription?: Subscription;
  selectedCourseSubscription?: Subscription;

  ngOnInit() {
    this.editModeSubscription = this.store.select(getEditMode).subscribe((value) => {this.editMode = value});
    this.init();
    this.subscribeToSelectedCourse();
    }

    init(){
      this.courseForm = new FormGroup({
        title: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]),

        description: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(5000)
        ]),

        author: new FormControl(null, [
          Validators.required,
        ]),

        price: new FormControl(null),

        image: new FormControl(null)
      });
    }

    subscribeToSelectedCourse() {
      this.selectedCourseSubscription = this.store.select(getSelectedCourse).subscribe((data) => {
        this.course = data;
      })

      if (this.editMode && this.course) {
        this.courseForm.patchValue(this.course);
      }else {
        this.courseForm.reset();
      }

    }

  hideCreateForm() {
    this.store.dispatch(showForm({value: false}));
  }

  onCreateOrUpdateCourse(): void {
    if (!this.courseForm.valid) {
      return;
    }

    if (this.editMode) {
      const updatedCourse: Course = {
        id: this.course?.id,
        price: +this.courseForm.value.price,
        ...this.courseForm.value
      }
      this.store.dispatch(updateCourse({ course: updatedCourse }));

    }else {
      this.store.dispatch(createCourse({ course: this.courseForm.value }));
    }
    this.store.dispatch(showForm({ value: false }));
    this.store.dispatch(setEditMode({editMode: false}));
    this.store.dispatch(clearSelectedCourse());
  }

  showTitleValidationErrors() {
    const titleControl = this.courseForm.get('title');

    if (titleControl?.touched && !titleControl.valid) {
      if (titleControl.errors?.['required']) {
        return 'Title is required';
      }
      if (titleControl.errors?.['minlength']) {
        return 'Title must be at least 6 characters';
      }
      if (titleControl.errors?.['maxlength']) {
        return 'Title cannot be more than 100 characters';
      }
    }
    return '';
  }

  showDescriptionValidationErrors() {
    const descriptionControl = this.courseForm.get('description');

    if (descriptionControl?.touched && !descriptionControl.valid) {
      if (descriptionControl.errors?.['required']) {
        return 'Description is required';
      }
      if (descriptionControl.errors?.['minlength']) {
        return 'Description  must be at least 10 characters';
      }
      if (descriptionControl.errors?.['maxlength']) {
        return 'Description cannot be more than 5000 characters';
      }
    }
    return '';
  }

  showAuthorValidationErrors() {
    const authorControl = this.courseForm.get('author');

    if (authorControl?.touched && !authorControl.valid) {
      if (authorControl.errors?.['required']) {
        return 'Author is required';
      }
    }
    return '';
  }

  ngOnDestroy() {
    if (this.editModeSubscription) {
      this.editModeSubscription.unsubscribe();
    }
    if (this.selectedCourseSubscription) {
      this.selectedCourseSubscription.unsubscribe();
    }
  }

}
