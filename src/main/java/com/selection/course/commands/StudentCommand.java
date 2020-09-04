package com.selection.course.commands;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentCommand {
    private int id;
    private String name;
    private String password;
    private String phoneNumber;
    private String email;
}
