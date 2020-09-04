package com.selection.course.repository;

import com.selection.course.entity.CourseInstructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<CourseInstructor, Integer> {
}
