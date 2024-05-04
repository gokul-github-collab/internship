import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../api.jsx";

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tuition_fee, setTuitionFee] = useState("");

  useEffect(() => {
    fetchCourse(id);
  }, [id]);

  const fetchCourse = (id) => {
    api.get(`/api/courses/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setCourse(data);
        setType(data.type);
        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);
        setTuitionFee(data.tuition_fee);
      })
      .catch((err) => alert(err));
  };

  const updateCourse = (e) => {
    e.preventDefault();
    api.put(`/api/courses/${id}/`, { type, name, description, location, tuition_fee })
      .then((res) => {
        if (res.status === 200) {
          alert("Course updated");
          navigate(`/course/${id}`); // Redirect to the same course page
        } else {
          alert("Course hasn't been updated");
        }
      })
      .catch((err) => alert(err));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Edit Course</h2>
      <form onSubmit={updateCourse}>
        <label htmlFor="type">Type: </label>
        <input type='text' id="type" name="type" required value={type} onChange={(e) => setType(e.target.value)}/>
        <br/>
        <label htmlFor="name">Course Name: </label>
        <input type='text' id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>
        <label htmlFor="location">Location: </label>
        <input type='text' id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
        <br/>
        <label htmlFor="description">Description: </label>
        <textarea id='description' name="description" value={description} required onChange={(e) => setDescription(e.target.value)}/>
        <br/>
        <label htmlFor="tuition_fee">Tuition Fee: </label>
        <input type='text' id="tuition_fee" name="tuition_fee" required value={tuition_fee} onChange={(e) => setTuitionFee(e.target.value)}/>
        <br/>
        <input type='submit' value='Update'/>
      </form>
    </>
  );
};

export default EditCoursePage;
