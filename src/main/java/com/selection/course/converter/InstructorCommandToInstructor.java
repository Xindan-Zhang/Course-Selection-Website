package com.selection.course.converter;

import com.selection.course.commands.InstructorCommand;
import com.selection.course.entity.CourseInstructor;
import org.springframework.stereotype.Component;

@Component
public class InstructorCommandToInstructor {
    public CourseInstructor converter(InstructorCommand command) {
        CourseInstructor instructor = new CourseInstructor();
        instructor.setName(command.getName());
        instructor.setEmail(command.getEmail());
        return instructor;
    }
}
