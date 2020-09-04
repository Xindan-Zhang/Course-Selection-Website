package com.selection.course.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    private String phoneNumber;

    private String email;

    @ManyToMany
    private Set<Course> courses;

    @OneToMany(mappedBy = "studentW")
    private Set<StudentWait> studentWaitList;

}
