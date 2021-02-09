# Department-Collaboration-System

# Backend Api Calls

## User related

### 
- Without any authorization
    * Show All Users : `GET /api/users/`

        ```json
        Request Body
        {
            "emails": [
                "nb1@ex.com"
            ]
        }
        ```

    * Show Teachers : `GET /api/teachers/`

        ```json
        Request Body
        {
            "name": "Teacher1",
            "email": "Teacher1@emaili.com",
            "password": "123123123"
        }
        ```
    * Login User : `POST /api/user/login/`

        ```json
        Request Body
        {
            "email":"useremail@email.com",
            "password":"xxxxxxxx"
        }
        ```
###
- Authorizaed By Admin
    * Register Admin : `POST /api/users/`

        ```json
        Request Body
        {
            "name": "Admin1",
            "email": "a1@ex.com",
            "password": "123123123",
            "role": "admin"
        }
        ```
    * Register Teachers : `POST /api/users/`

        ```json
        Request Body
        {
            "name": "Techer1",
            "email": "t1@ex.com",
            "password": "123123123",
            "role": "teacher",
            "profile": {
                "designation": "Professor"
            }
        }
        ```
    * Register Student : `POST /api/users/`

        ```json
        Request Body
        {
            "name": "Student1",
            "email": "s1@ex.com",
            "password": "123123123",
            "role": "student",
            "profile": {
                "sessionId": 1,
                "registration": 2017831020
            }
        }
        ```

### 
- Authorized And Performed By User Himself

    * Get Profile : `GET /api/users/me`
    * Logout User : `POST /api/users/logout` 

## Session related
###
- With Admin Authorization
    * Create Session: `POST /api/sessions`

        ```json
        Request Body
        {
            "session" : "2018-19"
        }
        ```
- With Users Authorization
    * Get Session: `GET /api/sessions`
## Course Related
###
- With Admin Authorization 

    * Create Course :  `POST /api/courses`

        ```json
        Request Body
        {
            "title": "Introduction to software engineering",
            "credit": 3,
            "is_optional": false,
            "semester": "3/2",
            "details": "Very important course",
            "adminId": 1
        }
        ```
- With Users Authorization
    * Get Courses :  `GET /api/courses`
    * New Request :  `GET /api`

## Classroom Related
-  With Teacher Authorization 
    * Create Classroom :  `POST /api/classrooms`

        ```json
        Request Body 
        {
            "courseId": 2,
            "sessionId": 1,
            "extra_students_id": []
        }
        ```
    * Update Classroom :  `Patch /api/classrooms//32`

        ```json
        Request Body 
        {
            "courseId": 5
        }
        ```
    * Add Students To Classroom :`Patch /api/classrooms//38/addStudents`

        ```json
        Request Body 
        {
            "students": [
                12,13, 14, 15
            ]
        }
        ```
    * Remove Students From Classroom : `Patch /api/classrooms//38/removeStudents`

        ```json
        Request Body 
        {
            "students": [
                12, 13
            ]
        }
        ```

- With Users Authorization
    * Get Classrooms :  `GET /api/classrooms`
    * Get Single Classroom :  `GET /api/classrooms/2`

## Classrom Classwork

###
- With Teacher Authorization
    * Create Classwork : `POST /api/classrooms/2/classworks`

        ```json
        Request Body 
        {
            "details": "Class Work on Data Visualization",
            "total_marks": 100,
            "deadlineDate": "10/12/2020",
            "task_type": "term_test"
        }
        ```
- With Users Authorization
     * Submit Classwork : `POST /api/classrooms/2/classworks/1/submission`
## Classrom Posts

###
- With Teacher Authorization
    * Create Post : `POST /api/classrooms/2/posts`
- With User Authorization
    * Get Posts for Classroom: `GET /api/classrooms/2/posts`

        ```json
        Request Body 
        {
            "content": "This is demo content"
        }
        ```
    * Create Comment On Post : `POST /api/classrooms/2/posts/1/comments`

        ```json
        Request Body
        {
            "content": "This is a comment demo"
        }
        ```
    * Get Post Commnets :`GET /api/classrooms/2/posts/1/comments`
