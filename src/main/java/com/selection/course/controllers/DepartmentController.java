package com.selection.course.controllers;

import com.selection.course.service.DepartmentService;
import com.selection.course.commands.DepCommand;
import com.selection.course.converter.DepartmentToDepartmentCommand;
import com.selection.course.entity.Department;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/dep")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final DepartmentToDepartmentCommand departmentToDepartmentCommand;

    public DepartmentController(DepartmentService departmentService, DepartmentToDepartmentCommand departmentToDepartmentCommand) {
        this.departmentService = departmentService;
        this.departmentToDepartmentCommand = departmentToDepartmentCommand;
    }

    // get all school departments
    @GetMapping("/all")
    public Set<DepCommand> getDepartments() {
        Iterable<Department> departments = departmentService.findAllDepartments();
        Set<DepCommand> depCommands = new HashSet<>();

        for (Department d : departments) {
            depCommands.add(departmentToDepartmentCommand.converter(d));
        }
        return depCommands;
    }

    // add a new department to the school system
    @PostMapping("/new")
    public DepCommand newDepartment(@RequestBody Department department) {
        return departmentToDepartmentCommand.converter(departmentService.saveDepartment(department));
    }
}
