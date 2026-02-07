import {Component, Input} from '@angular/core';
import {Course} from "../../models/course.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {deleteCourse, setEditMode, setSelectedCourse, showForm} from "../states/courses.actions";

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.css']
})
export class CoursesCardComponent {
  @Input() course: Course | null = null;

  constructor(
    private store: Store<AppState>
  ) {}

  onCourseEdit(){
    this.store.dispatch(showForm({value: true}));
    this.store.dispatch(setEditMode({editMode: true}));
    this.store.dispatch(setSelectedCourse({course: this.course!}));
  }

  onCourseDelete(){
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) {
      return;
    }
    this.store.dispatch(deleteCourse({id: this.course!.id}));
  }

}
