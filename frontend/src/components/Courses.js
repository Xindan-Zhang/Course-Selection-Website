import React from 'react'

export const Courses = ({courses}) => {
    return (
        <React.Fragment>

                {courses.map((course) => {
                    return (
                        <React.Fragment key={course.id}>
                            <span >{course.courseName}</span>
                            <span >{course.instructorName}</span>
                            <span >{course.capacity}</span>
                            <span >{course.filled}</span>
                        </React.Fragment>)
                })}
 
        </React.Fragment>
    )
}
