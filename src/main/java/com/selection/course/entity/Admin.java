package com.selection.course.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String password;
}
