package com.selection.course.service;

import com.selection.course.entity.Student;
import com.selection.course.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Optional<Student> findStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Iterable<Student>  getAllStudents() {
        return studentRepository.findAll();
    }
}
