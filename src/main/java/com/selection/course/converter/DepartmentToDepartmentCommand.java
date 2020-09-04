package com.selection.course.converter;

import com.selection.course.commands.DepCommand;
import com.selection.course.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentToDepartmentCommand {

    public DepCommand converter(Department department) {
        DepCommand depCommand = new DepCommand();
        depCommand.setId(department.getId());
        depCommand.setName(department.getName());
        return depCommand;
    }

}
