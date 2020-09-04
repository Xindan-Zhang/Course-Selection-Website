package com.selection.course.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class StudentWait { // course waitlist
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Student studentW;

    @ManyToOne
    private Course courseW;

}
