import React, {useState, useEffect, useContext} from 'react'
import {globalContext} from './Global'
import {useParams} from 'react-router-dom'
import axios from "axios"
import {useHistory} from 'react-router-dom'
import {LogoutBtn} from "./LogoutBtn"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from './accountLogo.png';



export const Student = (props) => {
    const history = useHistory();
    const {allDepartments, allCourses, increFilled, decreFilled} = useContext(globalContext);
    const [studentCourses, setStudentCourses] = useState([]);
    const {id} = useParams();
    const [dep, setDep] = useState(0);
    const [dCourses, setDCourses] = useState([]);
    const [selected, setSelected] = useState([]);
    const [waitList, setWaitList] = useState([]);
    const [needWait, setNeedWait] = useState([]);
    const [studentInfo, setStudentInfo] = useState({
        id,
        name: "",
        phone: "",
        email: ""
    })

    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [expand, setExpand] = useState(false);
    

    
    useEffect(() => {
        setSelected([])
    }, [dep])

    useEffect(() => {
        setNewEmail(studentInfo.email);
    }, [studentInfo.email])

    useEffect(() => {
        setNewPhone(studentInfo.phone)
    }, [studentInfo.phone])


    useEffect(() => {
        getStudentCourses();
        getStudentWaitList();
        getStudentInfo();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const filteredCourses = allCourses.filter(course => {
            return ((course.depId === parseInt(dep, 10)) && 
            !(studentCourses.map((c) => c.id)).includes(course.id)) &&
            !(waitList.map((c) => c.id).includes(course.id))
        })
    
        setDCourses(filteredCourses);
       
    }, [dep, allCourses, studentCourses, waitList])

    const getStudentInfo = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }

            const res = await axios.get(`/api/student/${id}/info`, config);
            setStudentInfo({
                id,
                name : res.data.name,
                phone: res.data.phoneNumber,
                email: res.data.email
            })
            
        } catch (error) {
            
        }
    }


    const getStudentCourses = async () => {
        try {
          
            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }
            
            const res = await axios.get(`/api/student/${id}/courses/all`, config)
            setStudentCourses(res.data)
        } catch (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            console.log("Unable to get student courses")
        }
    }


    const getStudentWaitList = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }
            const res = await axios.get(`/api/student/${id}/waitlist/all`, config)
            setWaitList(res.data)
        } catch (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            console.log("Unable to get student waitlist")
        }
    }


    const selectCourse = (courseId) => {
        if (selected.includes(courseId)) {
            setSelected(selected.filter(s => {
                return s !== courseId
            }));
        } else {
            setSelected([
                ...selected,
                courseId
            ])
        }
    }

    const confirmDelete = (courseId) => {

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Are you sure?</h1>
                  <p>You want to delete this course?</p>
                  <button onClick={onClose}>No</button>
                  <button
                    onClick={() => {
                      delCourse(courseId)
                      onClose();
                    }}
                  >
                    Yes, Delete it!
                  </button>
                </div>
              );
            }
          });

    }

    const confirmDeleteWaitList = (courseId) => {

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Are you sure?</h1>
                  <p>You want to delete this course from your waitlist?</p>
                  <button onClick={onClose}>No</button>
                  <button
                    onClick={() => {
                      delWaitList(courseId)
                      onClose();
                    }}
                  >
                    Yes, Delete it!
                  </button>
                </div>
              );
            }
          });

    }

    const delCourse = async (courseId) => {

        try {
            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }
            const result = await axios.delete(`/api/student/${id}/course/${courseId}`, config)
            setStudentCourses(
                studentCourses.filter(c => {
                    return (c.id !== courseId)
                })
            )
            if (!result.data.waitList) {
                decreFilled(courseId)
            }
        } catch (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            console.log("Unable to delete a course")
        }
    }

    useEffect(() => {
        if (needWait.length > 0) {
            addWaitList();
        }
        // eslint-disable-next-line
    }, [needWait])

    const addWaitList = async () => {
        try {

            const ids = {
                "id": needWait
            }

            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }

            const res = await axios.post(`/api/student/${id}/waitlist/add`, ids, config)

            const newWaits = allCourses.filter(c => {
                return res.data.includes(c.id)
            })

            const existWaits = [...waitList];

            setWaitList(existWaits.concat(newWaits))
            setNeedWait([]);
        } catch (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            
        }
    }

    const delWaitList = async (courseId) => {
        try {
            const config = {
                headers: {
                    'Authorization': sessionStorage.getItem("jwt")
                }
            }
            await axios.delete(`/api/student/${id}/waitlist/delete/${courseId}`, config)
            setWaitList(
                waitList.filter(w => {
                    return w.id !== courseId
                })
            )
        } catch (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            
        }
    }

    

    const addCourses = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        try {
            const courses = {
                "id" : selected
            }
            const res = await axios.post(`/api/student/${id}/courses/add`, courses, config)
            increFilled(res.data)
            const  newCourses = allCourses.filter(c => {
                return (res.data.includes(c.id))
            })
            const existCourses = [...studentCourses];
            const currCourse = existCourses.concat(newCourses)

           setStudentCourses(currCourse)

           const selectedTemp = [...selected]

           setNeedWait(selectedTemp.filter(course => {
               return !res.data.includes(course.id)
           }))

           setSelected([])

        } catch (error) {
            console.log("unable to add selected courses")
            if (error.response.status === 403) {
                history.push('/')
            }
        }


    }

    const updateEmail = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        try {
            const info = {
                email: newEmail,
            }
            const res  = await axios.post(`/api/student/${id}/info/update/email`, info, config);

            setStudentInfo({
                ...studentInfo,
                email: res.data.email
            })
            setEditEmail(false);
            

        } catch (error) {
            
        }
    }


    const updatePhone = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': sessionStorage.getItem("jwt")
            }
        }

        try {
            const info = {
                phoneNumber: newPhone,
            }
            const res  = await axios.post(`/api/student/${id}/info/update/phone`, info, config);

            setStudentInfo({
                ...studentInfo,
                phone: res.data.phoneNumber
            })
            setEditPhone(false);
            

        } catch (error) {
            
        }
    }

    


    return (
        <div className="student">

            <img className="studentLogo" src={logo} width="70" height="70" alt="Student Info" onClick={() => setExpand(!expand)}/>

            { expand ? <div className="studentInfo">

                 <span className="lID">Student ID</span>
                 <span className="ID">{studentInfo.id}</span>
                 <span className="IDSpace"></span>
                 <span className="lName">Student Name</span>
                 <span className="Name">{studentInfo.name}</span>
                 <span className="NameSpace"></span>
                
                <span className="lPhone">Phone Number</span>
                <span className="Phone">{studentInfo.phone}</span>
                <button className="PhoneButton" onClick={() => setEditPhone(true)}>Edit</button>
                {editPhone ? <form className="phoneForm" onSubmit={updatePhone}>
                    <span></span>
                    <input type="text" value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
                    <button>Done</button>
                </form> : ""}
                
                <span className="lEmail">Email</span>
                <span className="Email">{studentInfo.email}</span>
                <button className="EmailButton" onClick={() => setEditEmail(true)}>Edit</button>
                {editEmail ? <form className="emailForm" onSubmit={updateEmail}>
                    <span></span>
                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
                    <button>Done</button>
                </form> : ""}
                
            </div> : ""}

            <div className="logoutDiv">
                <LogoutBtn/>
            </div>


            <div className="studentCourses">
                <h2>Student Courses</h2>

                <div className="line"></div>
                

                {studentCourses.length > 0 ?
                    <div className="headersInStudent">
                        <span className="header">Course</span>
                        <span className="header">Instructor</span>
                        <span className="header">Capacity</span>
                        <span></span>
                    </div>

                : <div className="emptyCourse">You currently do not have any registered courses</div>}           

                <PerfectScrollbar>
                    <div className="studentClassList">
                        {studentCourses.map((course) => {
                            return (
                                <React.Fragment key={course.id}>
                                    <span >{course.courseName}</span>
                                    <span >{course.instructorName}</span>
                                    <span >{course.capacity}</span>
                                    <button className="delButtonS" onClick={() => confirmDelete(course.id)}>Del</button>
                                </React.Fragment>)
                        })}
                    </div>
                </PerfectScrollbar>
            </div>


            <div className="waitList">

                {waitList.length > 0 ?
                <React.Fragment>

                    <h2>Your WaitList</h2>
                    <div className="line"></div>
                   

                    {waitList.length > 0 ?
                    <div className="headersInStudent">
                        <span className="header">Course</span>
                        <span className="header">Instructor</span>
                        <span className="header">Capacity</span>
                        <span></span>
                    </div>

                    : ""}        

                    <PerfectScrollbar>
                        <div className="studentClassList">
                            {waitList.map((course) => {
                                return (
                                    <React.Fragment key={course.id}>
                                        <span >{course.courseName}</span>
                                        <span >{course.instructorName}</span>
                                        <span >{course.capacity}</span>
                                        <button className="delButtonS" onClick={() => confirmDeleteWaitList(course.id)}>Del</button>
                                    </React.Fragment>)
                            })}
                        </div>
                     </PerfectScrollbar>

                 </React.Fragment>
            
            
                : ""}
            </div>


            <div className="addCourse">
      
                <h2>Add Courses</h2>
                <div className="line"></div>
               
                
                <form onSubmit={addCourses}>

                    <div className="selectCourse">
                        <div className="selectText">Select Course Department</div>
                        <select  value={dep} onChange={(e) => setDep(e.target.value)}>
                            <option value={0}>Select Here ...</option>
                                {allDepartments.map(dep => {
                                    return <option key={dep.id} value={dep.id}>{dep.name}</option>
                                })}
                        </select>
                    </div>
                    {dCourses.length > 0 ?
                        <div className="Displayheaders">
                                <span></span>
                                <span className="header">Course</span>
                                <span className="header">Instructor</span>
                                <span className="header">Capacity</span>
                                <span className="header">Filled</span>
                        </div>
                    : ""
                    }    

                    <div className="courseDisplay">
                        {dCourses.map((course) => {
                            return (<React.Fragment key={course.id}>
                                <input className="addCourseCheckbox" type="checkbox" onChange={() => selectCourse(course.id)}/>
                                <span >{course.courseName}</span>
                                <span >{course.instructorName}</span>
                                <span >{course.capacity}</span>
                                <span >{course.filled}</span>
                            </React.Fragment>)
                        })}


                    </div>
                    <button className="addButton">Add Selected Courses</button>
                </form>

            </div>

            

         </div>
    )
}
