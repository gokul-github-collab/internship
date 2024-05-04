import React, { useState, useEffect } from 'react';
import api from '../api';
import CourseItem from '../components/CourseItem.jsx';
import Hero from "./Hero.jsx";
import HomeCards from "./HomeCards.jsx";

const CourseList = ({ isHomePage }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    api.get("/api/courses/")
      .then((res) => res.data)
      .then((data) => {
        // If it's the Home page, limit to 3 courses, else display all

        setCourses(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>

      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseItem key={course.id} course={course}  />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseList;
