import React, {useState, useEffect, useContext} from 'react'
import {globalContext} from './Global'
import axios from 'axios'
import '../App.css';
import {LogoutBtn} from "./LogoutBtn"
import {useHistory} from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Courses} from './Courses'

export const Admin = () => {

    const history = useHistory();
    const {allCourses, setCourses, allDepartments, setDepartments} =  useContext(globalContext)
    const [allInstructors, setInstructors] = useState([]);
    const [allStudents, setStudents] = useState([]);
    const [instrVal, setInstrVal] = useState(0);
    const [newCourseName, setNewCourseName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [newInstrName, setNewInstrName] = useState("");
    const [newInstrEmail, setNewInstrEmail] = useState("");
    const [courseDep, setCourseDep] = useState(0);
    const [depName, setDepName] = useState("");

    const scrollbarOptions = {
        wheelPropagation : false
    }
    

   useEffect(() => {
        getAllInstructors();
        getAllStudents();
        // eslint-disable-next-line
    }, [])

    const getAllStudents = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }

            const res = await axios.get('/api/student/all', config);
            setStudents(res.data);
        } catch (error) {
            console.log("Unable to get all students in admin")
            if (error.response.status === 403) {
                history.push('/')
            }
        }
    }


    const getAllInstructors = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }
            const res = await axios.get('/api/instructor/all', config);
            setInstructors(res.data);
            // if (res.data.length > 0) {
            //     setInstrVal(res.data[0].id)
            // }
        } catch (error) {
            console.log("error in getting all instructors in admin")
            if (error.response.status === 403) {
                history.push('/')
            }
        }
    }

    const addCourse = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        const newCourse = {
            courseName: newCourseName,
            instruct_id: parseInt(instrVal, 10),
            capacity,
            depId: parseInt(courseDep, 10)
        }

        try {
            const res = await axios.post("/api/course/add", newCourse, config);
            setCourses([
                ...allCourses,
                res.data,
            ])

            setNewCourseName("");
            setInstrVal(0);
            setCapacity(0);
            setCourseDep(0);
            
        } catch (error) {
            console.log("Unable to add a new course in admin")
            if (error.response.status === 403) {
                history.push('/')
            }
        }
    }

    const addInstructor = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        const newInstructor = {
            name: newInstrName,
            email: newInstrEmail
        }

        try {
            const res = await axios.post("/api/instructor/add", newInstructor, config);
            setInstructors([
                ...allInstructors,
                res.data
            ])

            setNewInstrEmail("");
            setNewInstrName("");

        } catch (error) {
            console.log("Unable to add a new instructor in admin")
            if (error.response.status === 403) {
                history.push('/')
            }
        }
    }

    const addDepartment = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        const newDepartment = {
            name: depName,
        }

        try {
            const res = await axios.post("/api/dep/new", newDepartment, config);

            setDepartments([
                ...allDepartments,
                res.data
            ])

            setDepName("");
         

        } catch (error) {
            console.log("Unable to add a new department in admin")
            if (error.response.status === 403) {
                history.push('/')
            }
        }
    }



    return (
        <div className="admin">
            <div className="logoutDiv">
                <LogoutBtn/>
            </div>

            <div className="allCourses">
                <h2>All courses</h2>
                <div className="line"></div>
                <div className="headers">
                    <span className="header">Course</span>
                    <span className="header">Instructor</span>
                    <span className="header">Capacity</span>
                    <span className="header">Filled</span>
                </div>
            
                <PerfectScrollbar options={scrollbarOptions}>
                    <div className="adminClassList">
                        <Courses courses={allCourses}/>                   
                    </div>
                </PerfectScrollbar>

            </div>

            <div className="adminAddCourse">       

                <h2>Add Course</h2>
                <div className="line"></div>
                <form onSubmit={addCourse}>
                    <div>
                        <label>Course Name:</label>
                        <input type='text' value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Instructor Name:</label>
                        <select value={instrVal} onChange={(e) => setInstrVal(e.target.value)}>
                            <option value={0}>Select...</option>
                            {allInstructors.map(instr => {
                                return <option key={instr.id} value={instr.id}>{instr.name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Class Capacity:</label>
                        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required/>
                    </div>
                    <div>
                    <label>Select Department: </label>
                    <select value={courseDep} onChange={(e) => setCourseDep(e.target.value)}>
                        <option value={0}>Select...</option>
                        {allDepartments.map(dep => {
                            return <option key={dep.id} value={dep.id}>{dep.name}</option>
                        })}
                    </select>
                    </div>
                    <button>Submit</button>
                </form>

            </div>   

            <div className="addDepartment">
                <h2>Add Department</h2>
                <div className="line"></div>
                <form>
                    <label>Name:</label>
                    <input type="text" value={depName} onChange={(e) => setDepName(e.target.value)} required/>
                    <button onClick={addDepartment}>Done</button>
                </form>
            </div>
                

            <div className="allInstructors">
                <h2>All Instructors</h2>
                <div className="line"></div>
                <div className="headersInstr">
                    <span className="header">Name</span>
                    <span className="header">Email</span>
                    
                </div>
            

                <PerfectScrollbar options={scrollbarOptions}>
                    <div className="adminInstrList">
                        
                            {allInstructors.map(instr => {
                            return (
                                <React.Fragment key={instr.id}>
                                    <span>{instr.name}</span>
                                    <span >{instr.email}</span>
                                </React.Fragment>)
                            })}
                        
                    </div>  
                </PerfectScrollbar>

            </div>
           
            <div className="addInstructor">
                <h2>Add Instructor</h2>
                <div className="line"></div>
                <form onSubmit={addInstructor}>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={newInstrName} onChange={e => setNewInstrName(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" value={newInstrEmail} onChange={e => setNewInstrEmail(e.target.value)} required/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
            
            <div className="allStudents">
                <h2>All Students</h2>
                <div className="line"></div>

                <div className="headersStudent">
                    <span className="header">ID</span>
                    <span className="header">Name</span>
                    <span className="header">Phone</span>
                    <span className="header">Email</span>
                    
                </div>

                <PerfectScrollbar options={scrollbarOptions}>
                    <div className="adminStudentList">
                            {allStudents.map(student => {
                                return (
                                    <React.Fragment key={student.id}>
                                        <span>{student.id}</span>
                                        <span>{student.name}</span>
                                        <span>{student.phoneNumber}</span>
                                        <span>{student.email}</span>
                                    </React.Fragment>)
                            })}
                    </div>
                </PerfectScrollbar>

            </div>
 
            <div className="blank"></div>

           
        </div>
    )
}
