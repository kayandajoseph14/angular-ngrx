import {createAction, props} from "@ngrx/store";
import {Course} from "../../models/course.model";

export const showForm = createAction('[courses] show form', props<{value: boolean}>());
export const createCourse = createAction('[courses] create course', props<{course: Course}>());
export const setEditMode = createAction('[courses] set edit mode', props<{editMode: boolean}>());
export const setSelectedCourse = createAction('[courses] set selected course', props<{course: Course}>());
export const updateCourse = createAction('[courses] update course', props<{course: Course}>());
export const clearSelectedCourse = createAction('[courses] clear selected course');
export const deleteCourse = createAction('[courses] delete course', props<{id: number}>());

