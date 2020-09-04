package com.selection.course.commands;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseCommand {
    private int id;
    private String courseName;
    private int instruct_id;
    private String instructorName;
    private Integer capacity;
    private Integer filled;
    private int depId;
    private String depName;

    @Override
    public String toString() {
        return "CourseCommand{" +
                "courseName='" + courseName + '\'' +
                ", instruct_id=" + instruct_id +
                '}';
    }
}
