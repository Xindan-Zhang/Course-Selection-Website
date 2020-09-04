package com.selection.course.controllers;


import com.selection.course.service.CourseService;
import com.selection.course.service.StudentService;
import com.selection.course.service.StudentWaitService;
import com.selection.course.commands.CourseCommand;
import com.selection.course.commands.StudentCommand;
import com.selection.course.converter.CourseToCourseCommand;
import com.selection.course.converter.StudentCommandToStudent;
import com.selection.course.converter.StudentToStudentCommand;
import com.selection.course.entity.Course;
import com.selection.course.entity.Student;
import com.selection.course.entity.StudentWait;
import com.selection.course.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path="/api/student")
public class StudentController {

    private final StudentToStudentCommand studentToStudentCommand;
    private final StudentService studentService;
    private final CourseService courseService;
    private final CourseToCourseCommand courseToCourseCommand;
    private final StudentWaitService studentWaitService;
    private final StudentCommandToStudent studentCommandToStudent;

    public StudentController(StudentToStudentCommand studentToStudentCommand,
                             StudentService studentService,
                             CourseService courseService,
                             CourseToCourseCommand courseToCourseCommand,
                             StudentWaitService studentWaitService,
                             StudentCommandToStudent studentCommandToStudent) {
        this.studentToStudentCommand = studentToStudentCommand;
        this.studentService = studentService;
        this.courseService = courseService;
        this.courseToCourseCommand = courseToCourseCommand;
        this.studentWaitService = studentWaitService;
        this.studentCommandToStudent = studentCommandToStudent;
    }

    // Gets student's id, name, email, phone number
    @GetMapping(path = "/{id}/info")
    public StudentCommand getStudentInfo(@PathVariable Integer id) {
        Optional<Student> student = studentService.findStudentById(id);
        if (!student.isPresent()) {
            throw new NotFoundException();
        }
        return studentToStudentCommand.converter(student.get());
    }


    // Gets student's courses based on the given student id
    @GetMapping(path = "/{id}/courses/all")
    public Set<CourseCommand> getStudentCourses(@PathVariable Integer id) {
        Set<CourseCommand> courseCommands = new HashSet<>();
        Optional<Student> student = studentService.findStudentById(id);

        if (!student.isPresent()) {
            throw new NotFoundException();
        }

        for (Course c : student.get().getCourses()) {
            CourseCommand command = courseToCourseCommand.converter(c);
            courseCommands.add(command);
        }

        return courseCommands;
    }

    // Updates student's email address
    @PostMapping(path = "/{id}/info/update/email")
    public StudentCommand updateEmail(@PathVariable Integer id, @RequestBody StudentCommand command) {
        Optional<Student> studentOptional = studentService.findStudentById(id);
        if (!studentOptional.isPresent()) {
            throw new NotFoundException();
        }
        Student student = studentOptional.get();

        student.setEmail(command.getEmail());

         Student savedStudent = studentService.saveStudent(student);

        return studentToStudentCommand.converter(savedStudent);
    }

    // Updates student's phone number
    @PostMapping(path = "/{id}/info/update/phone")
    public StudentCommand updatePhone(@PathVariable Integer id, @RequestBody StudentCommand command) {
        Optional<Student> studentOptional = studentService.findStudentById(id);
        if (!studentOptional.isPresent()) {
            throw new NotFoundException();
        }
        Student student = studentOptional.get();
        student.setPhoneNumber(command.getPhoneNumber());
        Student savedStudent = studentService.saveStudent(student);

        return studentToStudentCommand.converter(savedStudent);
    }

    // Creates a new student account
    @PostMapping(path = "/add")
    public StudentCommand newStudent(@RequestBody StudentCommand command) {

         Student student = studentCommandToStudent.converter(command);
         Student savedStudent = studentService.saveStudent(student);
        return studentToStudentCommand.converter(savedStudent);
    }


    // Add a list of new courses to a student's account
    @PostMapping(path="/{id}/courses/add")
    public Set<Integer> addCourse(@PathVariable Integer id, @RequestBody Map<String, List<Integer>> courses) {
        Set<Integer> addedCourseId = new HashSet<>();
        Optional<Student> student = studentService.findStudentById(id);

        if (!student.isPresent()) {
            throw new NotFoundException();
        }

        Student s = student.get();

        for (Integer i : courses.get("id")) { // loop over the list of courses to be added
             Optional<Course> course = courseService.findCourseById(i);
             if (!course.isPresent()) { // if the course does not exist, throw an exception
                 throw new NotFoundException();
             }
             Course c = course.get();
             if (!s.getCourses().contains(c)) { // only add the course if the student does not already has it
                 if (c.getFilled() < c.getCapacity()) { // and also if the course is not already filled
                     c.setFilled(c.getFilled() + 1);
                     s.getCourses().add(c);
                     addedCourseId.add(c.getId());
                 }
             }
         }
         studentService.saveStudent(s);
        return addedCourseId; // return ids of courses that have been added successfully added

    }

    // Delete a student's course
    @DeleteMapping("/{studentId}/course/{courseId}")
    public Map<String, Boolean> removeCourse(@PathVariable Integer studentId, @PathVariable Integer courseId) {
        Map<String, Boolean> result = new HashMap<>();
        Optional<Student> studentOptional = studentService.findStudentById(studentId);

        if (!studentOptional.isPresent()) {
            throw new NotFoundException();
        }

        Student student = studentOptional.get();

        for (Course c : student.getCourses()) {
            if (c.getId().equals(courseId)) {
                student.getCourses().remove(c); // remove the course

                // if the course has a waitlist, auto enroll the next student in the waitlist
                if (!c.getCourseWaitList().isEmpty()) {
                    Set<StudentWait> waitList = c.getCourseWaitList();
                    int min = Integer.MAX_VALUE;
                    StudentWait add = null;

                    for (StudentWait sw : waitList) { // find the first student in the waitlist
                        if (sw.getId() < min) {
                            min = sw.getId();
                            add = sw;
                        }
                    }

                    if (add != null) {
                        Integer sId = add.getStudentW().getId();
                        Integer cId = add.getCourseW().getId();
                        Student student1 = studentService.findStudentById(sId).get();
                        Course course1 = courseService.findCourseById(cId).get();
                        student1.getCourses().add(course1); // add the course for the first student in the course's waitlist
                        studentService.saveStudent(student1);
                        studentWaitService.deleteStudentWait(sId, cId); // delete the student from waitlist
                    }
                    result.put("waitList", true);
                } else {
                    c.setFilled(c.getFilled() - 1);
                    result.put("waitList", false);
                }
                break;
            }
        }
        studentService.saveStudent(student);
        return result;

    }


    // Adds a list of courses to a student's waitlist
    @PostMapping(path = "/{id}/waitlist/add")
    public Set<Integer> addWaitlist(@PathVariable Integer id, @RequestBody Map<String, List<Integer>> courses) {
        Set<Integer> addedCourseId = new HashSet<>();
        Optional<Student> student = studentService.findStudentById(id);

        if (!student.isPresent()) {
            throw new NotFoundException();
        }

        Student s = student.get();

        for (Integer i : courses.get("id")) { // loop over the ids of all courses to be added to the student's waitlist
            Optional<Course> course = courseService.findCourseById(i);
            if (!course.isPresent()) {
                throw new NotFoundException();
            }

            Course c = course.get();
            if (!s.getCourses().contains(c)) {
                StudentWait studentWait = new StudentWait();
                studentWait.setCourseW(c);
                studentWait.setStudentW(s);
                studentWaitService.saveStudentWait(studentWait);
                addedCourseId.add(c.getId());
            }

        }
        return addedCourseId; // return the ids of the courses that have been successfully added to the student's waitlist
    }


    // Gets all courses in a student's waitlist
    @GetMapping(path = "/{id}/waitlist/all")
    Set<CourseCommand> getWaitList(@PathVariable Integer id) {

        Set<CourseCommand> commands = new HashSet<>();
        Optional<Student> student = studentService.findStudentById(id);

        if (!student.isPresent()) {
            throw new NotFoundException();
        }

        Student s = student.get();

        for (StudentWait sw : s.getStudentWaitList()) {
            CourseCommand command = courseToCourseCommand.converter(sw.getCourseW());
            commands.add(command);
        }
        return commands;

    }

    // Deletes a course from a student's waitlist
    @DeleteMapping(path = "/{id}/waitlist/delete/{waitlistId}")
    public void delWaitList(@PathVariable Integer id, @PathVariable Integer waitlistId) {
        studentWaitService.deleteStudentWait(id, waitlistId);
    }


    // Gets all students in the school system
    @GetMapping(path = "/all")
    public Set<StudentCommand> getAllStudents() {
        Set<StudentCommand> studentCommands = new HashSet<>();

        Iterable<Student> students = studentService.getAllStudents();

        for (Student s : students) {
            StudentCommand command = studentToStudentCommand.converter(s);
            studentCommands.add(command);
        }
        return studentCommands;
    }
}
