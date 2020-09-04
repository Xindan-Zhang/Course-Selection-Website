import React, {useEffect, useContext} from 'react'
import {globalContext} from "./Global"



export const Header = () => {
    const {getAllCourses, getAllDepartment} = useContext(globalContext);
    
    useEffect(() => {
        getAllCourses();
        getAllDepartment();
        // eslint-disable-next-line
    }, [])

    

    return (<React.Fragment></React.Fragment>)
}
