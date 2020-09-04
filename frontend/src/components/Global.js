import React, {createContext, useState} from "react";
import axios from "axios"

export const globalContext = createContext();

export const Provider = (props) => {
    const [allCourses, setCourses] = useState([]);
    const [allDepartments, setDepartments] = useState([]);
 



    const getAllCourses = async () => {
        try {
            const res = await axios.get('/api/course/all');
            // console.log(res.data)
            setCourses(res.data);
        
        } catch {
            console.log("error in getting all courses in admin")
        }
        
    }

    const getAllDepartment = async () => {
        try {
            const res = await axios.get('/api/dep/all');
            setDepartments(res.data);

        } catch (e) {
            
        }
    }


    
    // useEffect(() => {
    //     console.log("in global useeffect")
    //     console.log(allCourses) 
    // }, [allCourses])

    const increFilled = (courseId) => {
        try {
            // console.log("before incrementing: ", allCourses)
            setCourses(
                allCourses.map( course => {
                    if (courseId.includes(course.id)) {
                        return {
                            ...course,
                            filled: course.filled + 1
                        }
                    } else {
                        return {
                            ...course
                        }
                    }
                } )
            )
        } catch (error) {
            
        }
    }


    const decreFilled = (courseId) => {
        try {
            setCourses(
                allCourses.map( course => {
                    if (course.id === courseId) {
                        return {
                            ...course,
                            filled: course.filled - 1
                        }
                    } else {
                        return {
                            ...course
                        }
                    }
                } )
            )
        } catch (error) {
            
        }
    }


    return <globalContext.Provider value={{
        allCourses,
        setCourses,
        getAllCourses,
        allDepartments,
        getAllDepartment,
        increFilled,
        decreFilled,
        setDepartments,
       }}>

        {props.children}
    </globalContext.Provider>

}