import React, {useState} from 'react';
import api from "../api.jsx";

const AddCoursePage = () => {
    const [courses, setCourses] = useState([])
     const [type, setType] = useState("")
    const [name, setName] = useState("")
     const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [tuition_fee, setTuitionFee] = useState("")
        const getCourses = () => {
        api.get("/api/courses/")
            .then((res) => res.data)
            .then((data) => {
                setCourses(data)
                console.log(data)
            }).catch((err) => alert(err))


    }
        const createCourse = (e) => {
        e.preventDefault()
        api.post(`/api/courses/`, {name, type, description, location, tuition_fee}).then((res) => {
            if (res.status === 201) alert("Course created")
            else alert("Course hasn't been created")
        }).catch((err) => alert(err))
        getCourses()
    }
    return (
        <>
            <h2>Create a Course</h2>
            <form onSubmit={createCourse}>
                <label htmlFor="title">Title: </label>
                <input type='text' id="title" name="type" required value={type}
                       onChange={(e) => setType(e.target.value)}/>
                <br/>
                <label htmlFor="ti">Course Name: </label>
                <input type='text' id="ti" name="type" required value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <br/>
                <label htmlFor="t">Course Block: </label>
                <input type='text' id="t" name="type" required value={location}
                       onChange={(e) => setLocation(e.target.value)}/>
                <br/>
                <label htmlFor="content">Description: </label>
                <textarea id='content' name="description" value={description} required
                          onChange={(e) => setDescription(e.target.value)}>

                </textarea>

                <br/>
                <label htmlFor="tl">Course Fee: </label>
                <input type='text' id="tl" name="type" required value={tuition_fee}
                       onChange={(e) => setTuitionFee(e.target.value)}/>
                <br/>

                <input type='submit' value='Submit'/>
            </form>
        </>
    );
};

export default AddCoursePage;