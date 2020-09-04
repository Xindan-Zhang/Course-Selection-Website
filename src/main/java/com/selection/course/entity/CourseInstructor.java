package com.selection.course.entity;



import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity // This tells Hibernate to make a table out of this class
public class CourseInstructor {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    @OneToMany(mappedBy = "instructor")
    private Set<Course> courses;


}