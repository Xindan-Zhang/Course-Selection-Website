package com.selection.course.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        // map "/" to index.html
        registry.addViewController("/")
                .setViewName("forward:/index.html");

        // Map all url to index.html, except those that have "api" on the first part of the path
        registry.addViewController("/{x:[\\w\\-]+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
                .setViewName("forward:/index.html");
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/public/");
    }
}
