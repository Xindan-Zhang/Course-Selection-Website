package com.selection.course.authentication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest {

    private String username;
    private String password;

    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public AuthenticationRequest() {
    }

}
