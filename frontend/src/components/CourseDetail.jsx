import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    fetchCourseDetail(id);
  }, [id]);

  const fetchCourseDetail = (courseId) => {
    api.get(`/api/courses/${courseId}/`)
      .then(response => setCourse(response.data.course))
      .catch(error => console.error('Error fetching course:', error));
  };

  const handleDeleteCourse = async () => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      try {
        await api.delete(`/api/courses/${course.id}/`); // Use DELETE method
        navigate('/courses'); // Redirect to courses list after deletion
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <p>Description: {course.description}</p>
      <p>Location: {course.location}</p>
      <p>Tuition Fee: {course.tuition_fee}</p>

      {/* Display semester subjects if available */}
      {course.semesters.length > 0 && (
        <div>
          <h3>Semester Subjects:</h3>
          {course.semesters.map(semester => (
            <div key={semester.id}>
              <h4>Semester {semester.id}</h4>
              <ul>
                {Object.keys(semester).map(key => {
                  // Exclude non-subject keys and the 'id' key
                  if (key.startsWith('subject') && semester[key]) {
                    return <li key={key}>{semester[key]}</li>;
                  }
                  return null;
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Delete button */}
      <button onClick={handleDeleteCourse}>Delete Course</button>
    </div>
  );
};

export default CourseDetail;
