package com.selection.course.converter;

import com.selection.course.commands.InstructorCommand;
import com.selection.course.entity.CourseInstructor;
import org.springframework.stereotype.Component;

@Component
public class InstructorToInstructorCommand {
    public InstructorCommand converter(CourseInstructor instructor) {
        InstructorCommand command = new InstructorCommand();
        command.setEmail(instructor.getEmail());
        command.setId(instructor.getId());
        command.setName(instructor.getName());
        return command;
    }
}
