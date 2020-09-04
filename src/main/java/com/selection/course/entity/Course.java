package com.selection.course.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity

public class Course {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String courseName;
    @ManyToOne
    private CourseInstructor instructor;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students;

    private  Integer capacity;

    private Integer filled = 0;

    @OneToMany(mappedBy = "courseW")
    private Set<StudentWait> courseWaitList;

    @ManyToOne
    private Department dep;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course courses = (Course) o;

        return id != null ? id.equals(courses.id) : courses.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
