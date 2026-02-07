import {Course} from "../../models/course.model";

export interface CoursesState {
  courses: Course[],
  showForm: boolean,
  isEditMode: boolean,
  selectedCourse: Course | null;
}

export const initialState: CoursesState = {
  courses: [
    {
      id: 1,
      title: "Spring Boot Mastery",
      description: "A complete guide to building enterprise applications using Spring Boot.",
      image: "assets/images/javascript.png",
      author: "Joseph Kayanda",
      price: 35.99
    },
    {
      id: 2,
      title: "Angular for Professionals",
      description: "Learn Angular step by step with real-world examples and best practices.",
      image: "assets/images/angular.jpg",
      author: "John Doe",
      price: 29.50
    }
  ],
  showForm: false,
  isEditMode: false,
  selectedCourse: null
}
