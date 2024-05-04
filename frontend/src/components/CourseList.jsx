import React, { useState, useEffect } from 'react';
import api from '../api';
import CourseItem from '../components/CourseItem.jsx';
import Hero from "./Hero.jsx";
import HomeCards from "./HomeCards.jsx";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    getCourses();
    checkSuperuser();
  }, []);

  const getCourses = () => {
    api.get("/api/courses/")
      .then((res) => res.data)
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => alert(err));
  };

const checkSuperuser = () => {
  api.get("/api/check_superuser/")
    .then((res) => {
      console.log("Response from check_superuser:", res);
      setIsSuperuser(res.data.is_superuser);
    })
    .catch((err) => {
      console.error("Error checking superuser:", err);
    });
};



  return (
    <div>
      <Hero title="Explore Programs at SKASC" subtitle="Focuses on planning and goal setting" />

      {isSuperuser && <HomeCards />}

      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              index < 3 && <CourseItem key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseList;
