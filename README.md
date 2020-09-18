# Course Selection Website

The course selection website uses RESTful API design and is built with React.js as frontend, Java Spring Boot as backend, and MySQL as database.
The website has two types of users:
   * **Admin users** could add new courses, course departments, instructors into the school system and also view the information of all students, instructors, and courses.
   * **Student users** could enroll/drop courses. Students are automatically added to a course's waitlist if the course is already filled and students could remove themselves from a course waitlist in their account. Moreover, when a student drops a course, the first student in the courses' waitlist will be auto-enrolled.
   
   
## Website Screenshots   
Login Page   
<img src="https://user-images.githubusercontent.com/53383156/92315897-3a977900-efa1-11ea-9f92-75e5de8dcfc5.png" width="800" />   
Student User Page   
<img src="https://user-images.githubusercontent.com/53383156/92315922-919d4e00-efa1-11ea-9ac0-c811cce8d8d7.png" width="800" />   
Admin Page   
<img src="https://user-images.githubusercontent.com/53383156/92315933-af6ab300-efa1-11ea-949b-2a1c5b0e1bb3.png" width="800" />      
<img src="https://user-images.githubusercontent.com/53383156/92315934-bc87a200-efa1-11ea-947a-e02b832e5651.png" width="800" />      
  
  
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

