package com.selection.course.service;

import com.selection.course.entity.CourseInstructor;
import com.selection.course.repository.InstructorRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InstructorService {
    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    public Optional<CourseInstructor> findInstructorById(Integer id) {
        return instructorRepository.findById(id);
    }

    public CourseInstructor saveInstructor(CourseInstructor instructor) {
        return instructorRepository.save(instructor);
    }

    public Iterable<CourseInstructor> getAllInstructors() {
        return instructorRepository.findAll();
    }
}
