# Course Selection Website

The course selection website uses RESTFUL API design and is built with React.js as frontend, Java Spring Boot as backend, and MySQL as database.
The website has two types of users:
   * **Admin users** could add new courses, course departments, instructors into the school system and also view the information of all students, instructors, and courses.
   * **Student users** could enroll/drop courses. Students are automatically added to a course's waitlist if the course is already filled and students could remove themselves from a course waitlist in their account. Moreover, when a student drops a course, the first student in the courses' waitlist will be auto-enrolled.
   
   
## Website Screenshots
Login Page   
<img src="https://user-images.githubusercontent.com/53383156/92289857-e3bd7100-eec6-11ea-8b45-0df8ab6d966d.png" width="500" />   
Student User Page   
<img src="https://user-images.githubusercontent.com/53383156/92289897-08b1e400-eec7-11ea-91a9-341b8b6b8508.png" width="800" />   
Admin Page   
<img src="https://user-images.githubusercontent.com/53383156/92290687-d5bd1f80-eec9-11ea-832d-d67645fc5435.png" width="800" />      
<img src="https://user-images.githubusercontent.com/53383156/92290722-fc7b5600-eec9-11ea-86dc-e4b0aeff6515.png" width="800" />      
  
  
## Installation
1. Provide a database link, username, and password in the src/main/resources/application.properties file

```
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
```
2. Run ``` mvn clean install```

3. Run the script and open the website on http://localhost:8080


## Deployed Wesbite
This website has been deployed on Amazon AWS: http://courseselect-env.eba-p6ehgpew.ca-central-1.elasticbeanstalk.com    
You could use existing users to login or register new users   

***Existing student users:***
1. ID: **11**, Password: **123**   
2. ID: **13**, Password: **123**   
3. ID: **17**, Password: **123**   
4. ID: **19**, Password: **123**   
5. ID: **25**, Password: **123**   

***Existing admin users:***
1. ID: **admin10**, Password: **admin**   
2. ID: **admin11**, Password: **admin**   
3. ID: **admin12**, Password: **admin**   

