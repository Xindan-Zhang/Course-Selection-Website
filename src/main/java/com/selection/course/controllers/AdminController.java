package com.selection.course.controllers;


import com.selection.course.service.AdminService;
import com.selection.course.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="/api/admin")
public class AdminController {

    @Autowired
    private PasswordEncoder passwordEncoder;


    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // add a new admin user
    @PostMapping(path = "/add")
    public Admin newStudent(@RequestBody Admin adminReq) {

        Admin admin = new Admin();
        admin.setName(adminReq.getName());
        admin.setPassword(passwordEncoder.encode(adminReq.getPassword()));

        return adminService.saveAdmin(admin);
    }

}
