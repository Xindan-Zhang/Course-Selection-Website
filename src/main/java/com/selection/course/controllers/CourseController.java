package com.selection.course.controllers;


import com.selection.course.service.CourseService;
import com.selection.course.service.DepartmentService;
import com.selection.course.service.InstructorService;
import com.selection.course.commands.CourseCommand;
import com.selection.course.converter.CourseToCourseCommand;
import com.selection.course.converter.StudentToStudentCommand;
import com.selection.course.entity.CourseInstructor;
import com.selection.course.entity.Course;
import com.selection.course.entity.Department;
import com.selection.course.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path="/api/course")
public class CourseController {

    private final CourseService courseService;
    private final InstructorService instructorService;
    private final CourseToCourseCommand courseToCourseCommand;
    private final StudentToStudentCommand studentToStudentCommand;
    private final DepartmentService departmentService;

    public CourseController(CourseService courseService,
                            InstructorService instructorService,
                            CourseToCourseCommand courseToCourseCommand,
                            StudentToStudentCommand studentToStudentCommand,
                            DepartmentService departmentService) {
        this.courseService = courseService;
        this.instructorService = instructorService;
        this.courseToCourseCommand = courseToCourseCommand;
        this.studentToStudentCommand = studentToStudentCommand;
        this.departmentService = departmentService;
    }


    // return all courses available in the school system
    @GetMapping(path="/all")
    public Set<CourseCommand> getAllCourses() {
        Iterable <Course> allCourses =  courseService.getAllCourses();
        Set<CourseCommand> commands = new HashSet<>();
        for (Course c : allCourses) {
            CourseCommand courseCommand = courseToCourseCommand.converter(c);
            commands.add(courseCommand);
        }

        return commands;
    }


    // add a new course to the school system
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/add")
    public CourseCommand addCourse(@RequestBody CourseCommand command) {
        Optional<CourseInstructor> instructorOptional = instructorService.findInstructorById(command.getInstruct_id());
        Optional<Department> dep = departmentService.findDepartmentById(command.getDepId());

        if (!instructorOptional.isPresent() || !dep.isPresent()) {
            throw new NotFoundException();
        } else {
            CourseInstructor instructor = instructorOptional.get();
            Department department = dep.get();

            for (Course c : instructor.getCourses()) {
                // if the course already exists, return an empty course
                if (c.getCourseName().equals(command.getCourseName())) {
                    return new CourseCommand();
                }
            }
            Course newCourse = new Course();
            newCourse.setCourseName(command.getCourseName());
            newCourse.setInstructor(instructor);
            newCourse.setCapacity(command.getCapacity());
            newCourse.setDep(department);

            Course savedCourse = courseService.saveCourse(newCourse);
            return courseToCourseCommand.converter(savedCourse);
        }

    }
}
