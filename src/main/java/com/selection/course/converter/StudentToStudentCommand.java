package com.selection.course.converter;

import com.selection.course.commands.StudentCommand;
import com.selection.course.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentToStudentCommand {
    public StudentCommand converter(Student student) {
        StudentCommand command = new StudentCommand();
        command.setId(student.getId());
        command.setName(student.getName());
        command.setEmail(student.getEmail());
        command.setPhoneNumber(student.getPhoneNumber());
        return command;
    }
}
