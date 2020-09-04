package com.selection.course.controllers;




import com.selection.course.service.InstructorService;
import com.selection.course.commands.InstructorCommand;
import com.selection.course.converter.InstructorCommandToInstructor;
import com.selection.course.converter.InstructorToInstructorCommand;
import com.selection.course.entity.CourseInstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(path="/api/instructor")
public class InstructorController {

    private final InstructorService instructorService;
    private final InstructorCommandToInstructor instructorCommandToInstructor;
    private final InstructorToInstructorCommand instructorToInstructorCommand;

    public InstructorController(InstructorService instructorService,
                                InstructorCommandToInstructor instructorCommandToInstructor,
                                InstructorToInstructorCommand instructorToInstructorCommand) {
        this.instructorService = instructorService;
        this.instructorCommandToInstructor = instructorCommandToInstructor;
        this.instructorToInstructorCommand = instructorToInstructorCommand;
    }

    // add a new instructor
    @PostMapping(path="/add")
    public InstructorCommand addNewInstructor (@RequestBody InstructorCommand command) {

        CourseInstructor instructor = instructorCommandToInstructor.converter(command);
        CourseInstructor courseInstructor = instructorService.saveInstructor(instructor);
        return instructorToInstructorCommand.converter(courseInstructor);
    }


    // get all instructors
    @GetMapping(path="/all")
    public Set<InstructorCommand> getAllInstructor() {

        Iterable<CourseInstructor> instructors = instructorService.getAllInstructors();
        Set<InstructorCommand> instructorCommands = new HashSet<>();
        for (CourseInstructor instructor : instructors) {
            instructorCommands.add(instructorToInstructorCommand.converter(instructor));
        }
        return instructorCommands;
    }
}