package com.selection.course.service;
import com.selection.course.entity.Admin;
import com.selection.course.entity.Student;
import com.selection.course.exceptions.NotFoundException;
import com.selection.course.repository.AdminRepository;
import com.selection.course.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        if (userName.toLowerCase().startsWith("admin")) {
            Integer id = Integer.valueOf(userName.substring(5));
//            Optional<Admin> adminOptional = adminRepository.findByName(userName);
            Optional<Admin> adminOptional = adminRepository.findById(id);
//            System.out.println("username is " + adminOptional.get().getName());

            if (!adminOptional.isPresent()) {
                throw new NotFoundException();
            }

            Admin admin = adminOptional.get();
            String name = admin.getName() + admin.getId();
            // System.out.println(name);
            return new User(name, admin.getPassword(), new ArrayList<>());
        }

        Optional<Student> studentOptional = studentRepository.findById(Integer.valueOf(userName));

        if (!studentOptional.isPresent()) {
            throw new NotFoundException();
        }

        Student student = studentOptional.get();
//        System.out.println("Student id is: " + student.getId());
//        System.out.println("Student pw is: " + student.getPassword());


        return new User(String.valueOf(student.getId()), student.getPassword(), new ArrayList<>());
    }
}

