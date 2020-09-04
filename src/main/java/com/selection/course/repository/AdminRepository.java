package com.selection.course.repository;

import com.selection.course.entity.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdminRepository extends CrudRepository<Admin, Integer> {
    Optional<Admin> findByName(String name);
}
