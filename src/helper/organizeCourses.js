import { em } from "motion/react-client";

export const organizeCourses = (courses) => {
  if (!courses.length) {
    console.error(courses);
    return;
  }

  const coursesObject = {};
  courses.forEach((assignment) => {
    if (assignment?.courseName) {
      if (coursesObject.hasOwnProperty(assignment.courseName.toLowerCase())) {
        coursesObject[assignment.courseName.toLowerCase()].push(assignment);
      } else {
        coursesObject[assignment.courseName.toLowerCase()] = [assignment];
      }
    }
  });
  //   console.log(coursesObject);
  return coursesObject;
};

export const currentUserAssignments = (email, courses) => {
  if (!courses.length) {
    console.error(courses);
    return;
  }
  console.log(email);

  const coursesObject = {};
  courses.forEach((assignment) => {
    if (assignment.email === email && assignment?.courseName) {
      if (coursesObject.hasOwnProperty(assignment.courseName.toLowerCase())) {
        coursesObject[assignment.courseName.toLowerCase()].push(assignment);
      } else {
        coursesObject[assignment.courseName.toLowerCase()] = [assignment];
      }
    }
  });
  console.log(coursesObject);

  return coursesObject;
};
