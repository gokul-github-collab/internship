import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import api from '../api';

const CourseDetail = () => {
    const [isSuperuser, setIsSuperuser] = useState(false);
  useEffect(() => {
    checkSuperuser()
  }, []);
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

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

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
        await api.delete(`/api/courses/${course.id}/`);
        navigate('/courses');
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/courses" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className='text-indigo-500 mr-2'/>Back to Course Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{course.type}</div>
                <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className='text-orange-700 mr-1'/>
                  <p className="text-orange-700">{course.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">Course Description</h3>
                <p className="mb-4">{course.description}</p>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">Tuition Fees</h3>
                <p className="mb-4">{course.tuition_fee} / semester</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">College Info</h3>
                <h2 className="text-2xl">Sri Krishna Arts and Science College</h2>
                <p className="my-2">something something</p>
                <hr className="my-4"/>
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">skasc.ac.in</p>
                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">5555-5555-5555</p>
              </div>

              { isSuperuser && <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Course</h3>
                <Link to={`/courses/${course.id}/edit`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Edit Course
                </Link>
                <button onClick={handleDeleteCourse}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Course
                </button>
              </div>}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
