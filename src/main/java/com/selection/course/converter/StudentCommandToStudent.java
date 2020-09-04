package com.selection.course.converter;

import com.selection.course.commands.StudentCommand;
import com.selection.course.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class StudentCommandToStudent {

    @Autowired
    private PasswordEncoder passwordEncoder;
    public Student converter (StudentCommand command) {
        Student student = new Student();
        student.setName(command.getName());
        student.setCourses(new HashSet<>());
        student.setPassword(passwordEncoder.encode(command.getPassword()));
        student.setEmail(command.getEmail());
        student.setPhoneNumber(command.getPhoneNumber());
        return student;

    }
}
