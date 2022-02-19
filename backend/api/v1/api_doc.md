**Show Users**
----
  Returns info on all users as json data.

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

------------------------------------------------------

**Show User**
----
  Returns json data about a single user.

* **URL**

  /users/:user_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `user_id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

-----------------------------------------------------

**Create User**
----
  Create a user account and return their data in json format

* **URL**

  /users/:user_id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `user_id=[integer]`

* **Data Params**

  `type=client or service provider`
  `name=user name`
  `email=user email`
  `password=user password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

-------------------------------------------------------------

**Update User**
----
  Update a user's data

* **URL**

  /users/:user_id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `user_id=[integer]`

* **Data Params**

  `location=user location, optional for clients`
  `phone_no=user phone number`
  `profile_image=base64 encoded image data`
  `work_images=list of base64 encoded image data for service providers`
  `rates=rates for service providers`
  `description=description of services provided for service providers`
  `category=category of the service they provide for service providers`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

---------------------------------------------------

**Delete User**
----
  Returns info on all users as json data.

* **URL**

  /users/:user_id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `user_id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

------------------------------------------------------
