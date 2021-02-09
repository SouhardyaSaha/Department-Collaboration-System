# Department-Collaboration-System

# Backend Api Calls

## User related

### 

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

* Login User : `POST /api/user/login/`
    ```json
    Request Body
    {
        "email":"useremail@email.com",
        "password":"xxxxxxxx"
    }
    ```
* Get Profile : `GET /api/users/me`
* Logout User : `Post /api/users/logout` 

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
