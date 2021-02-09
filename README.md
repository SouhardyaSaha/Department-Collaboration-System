# Department-Collaboration-System

# Backend Api Calls

## User related

### 

* Register Admin : `POST /users/`
    ```json
    Request Body
    {
        "name": "Souhardya",
        "email": "a1@ex.com",
        "password": "123123123",
        "role": "admin"
    }
    ```
* Register Teachers : `POST /users/`
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
* Register Student : `POST /users/`
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
* Get Profile : `GET /users/me`
* Logout User : `Post /users/logout` 

* Show All Users : `GET /users/`
    ```json
    Request Body
    {
        "emails": [
            "nb1@ex.com"
        ]
    }
    ```

* Show All Teachers : `GET /teachers/`
    ```json
    Request Body
    {
        "name": "Souhardya",
        "email": "Souhardy22a2@gmaili.com",
        "password": "123123123"
    }
    ```
