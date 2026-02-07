import {createReducer, on} from "@ngrx/store";
import {initialState} from "./courses.state";
import {
  clearSelectedCourse,
  createCourse, deleteCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse
} from "./courses.actions";

export const coursesReducer = createReducer(
  initialState,
  on(showForm, (state, action) => {
    return {
      ...state,
      showForm: action.value
    }
  }),

  on(createCourse, (state, action) => {
    const course = {...action.course}
    course.id = state.courses.length + 1
    return {
      ...state,
      courses: [...state.courses, course]
    }
  }),

  on(setEditMode, (state, action) => {
    return {
      ...state,
      isEditMode: action.editMode
    }
  }),

  on(setSelectedCourse, (state, action) => {
    return {
      ...state,
      selectedCourse: action.course
    }
  }),

  // on(updateCourse, (state, action) => {
  //   return {
  //     ...state,
  //     courses: state.courses.map((course) => {
  //       if (course.id === action.course.id) {
  //         return action.course
  //       }
  //       return course
  //     })
  //   }
  // })


  on(updateCourse, (state, action) => {
    const updatedCourse = state.courses.map((course) => {
      if (course.id === action.course.id) {
        return action.course
      }
      return course
    })
    return {
      ...state,
      courses:updatedCourse
    }
  }),

  on(clearSelectedCourse, (state) => {
    return {
      ...state,
      selectedCourse: null
    }
  }),

  on(deleteCourse, (state, action) => {
    const updateArray = state.courses.filter(course => course.id !== action.id)
    return {
      ...state,
      courses: updateArray
    };
  })

)
