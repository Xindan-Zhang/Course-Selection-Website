package com.selection.course.converter;

import com.selection.course.commands.CourseCommand;
import com.selection.course.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseToCourseCommand {

    public CourseCommand converter(Course c) {
        CourseCommand courseCommand = new CourseCommand();
        courseCommand.setId(c.getId());
        courseCommand.setCourseName(c.getCourseName());
        courseCommand.setInstruct_id(c.getInstructor().getId());
        courseCommand.setInstructorName(c.getInstructor().getName());
        courseCommand.setCapacity(c.getCapacity());
        courseCommand.setFilled(c.getFilled());
        courseCommand.setDepName(c.getDep().getName());
        courseCommand.setDepId(c.getDep().getId());
        return courseCommand;
    }
}
