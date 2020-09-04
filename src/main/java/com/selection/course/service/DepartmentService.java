package com.selection.course.service;


import com.selection.course.entity.Department;
import com.selection.course.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public Optional<Department> findDepartmentById(Integer id) {
        return departmentRepository.findById(id);
    }

    public Iterable<Department>  findAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }
}
