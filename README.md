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

    * Show All Teachers : `GET /api/teachers/`
        ```json
        Request Body
        {
            "name": "Souhardya",
            "email": "Souhardy22a2@gmaili.com",
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
- After Authorization
    * Register Admin : `POST /api/users/`
        ```json
        Request Body
        {
            "name": "Souhardya",
            "email": "a1@ex.com",
            "password": "123123123",
            "role": "admin"
        }
        ```
    * Register Teachers : `POST /api/users/`
        ```json
        Request Body
        {
            "name": "Souhardya",
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
            "name": "Souhardya",
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
-  With Student Authorization 
    * Get Classrooms :  `GET /api/classrooms`
    * Get Single Classroom :  `GET /api/classrooms/2`


