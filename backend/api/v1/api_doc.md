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

*  **Header Params**

   `X-Token: jwt token generated at login`
   
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

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

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
 
   `user_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
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

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

-----------------------------------------------------

**Show Users/Service providers by category**
----
  Returns info on all service providers providing services in a certain category as json data.

* **URL**

  /users/category

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

  `category=category of service needed` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider" }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Missing category" }`

  OR
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

-----------------------------------------------------------------------------

**Create User**
----
  Create a user account and return their data in json format

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `user_id=[string]`

* **Data Params**

  `type=client or service provider` <br />
  `name=user name` <br />
  `email=user email` <br />
  `password=user password` <br />

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
 
   `user_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

  `location=user location, optional for clients` <br />
  `phone_no=user phone number` <br />
  `profile_image=base64 encoded image data` <br />
  `work_images=list of base64 encoded image data for service providers` <br />
  `rates=rates for service providers` <br />
  `description=description of services provided for service providers` <br />
  `category=category of the service they provide for service providers` <br />
  

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

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

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
 
   `user_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
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

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

------------------------------------------------------

**Login User**
----
  Log a user in

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `email=user's email address` <br />
  `password=user's password` <br />
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, name : "Michael Bloom", location: "Juja", phone_no: 0727654188, profile_image: b64 encoded data of the image, rates: 0, rating: 0.0, work_images: List of b64 encoded data of the images, category: "Hair dresser", description: "I am a service provider", type: "client or service provider", token: jwt token }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid login" }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

* **Notes**

  * Header `X-Token: jwt token` is added to response headers for authentication and should be included in the headers for all requests

--------------------------------------------------------------------------------------------

**Logout User**
----
  Log a user out

* **URL**

  /logout

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ status: "Logged out"} or { status: "Not logged in" }
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token" }`

--------------------------------------------------------------------------------------------------

**Create a review**
----
  Create a review

* **URL**

  /reviews

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

  `reviewee_id=id of the user being reviewed` <br />
  `user_id=id of the user making the review` <br />
  `content=review of interaction with the reviewee` <br />
  `rating=float value rating the reviewee` <br />
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

  OR

  * **Code:** 400 MISSING DATA <br />
    **Content:** `{ error : "Missing reviewee_id/content/rating/user_id" }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

-------------------------------------------------------------------------------

**Show reviews**
----
  Show all review

* **URL**

  /reviews

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

-----------------------------------------------------------------------------

**Show review**
----
  Show a specific review

* **URL**

  /reviews/:review_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `review_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

--------------------------------------------------------------------------------

**Update reviews**
----
  Update an existing review

* **URL**

  /reviews/:review_id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `review_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   `content=description of interaction with the reviewee` <br />
   `rating=rating the reviewee (float value)` <br />
   `reviewee_id=id of the new person being reviewed` <br />
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

--------------------------------------------------------------------------------

**Delete review**
----
  Delete a specific review

* **URL**

  /reviews/:review_id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `review_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ status: "Review deleted" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`
    
-----------------------------------------------------------------------------

**Create a request**
----
  Create a request

* **URL**

  /requests

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

  `user_id=id of the user making the review` <br />
  `category=category of service being requested` <br />
  `content=description of the service being sought` <br />
  `status=status of request, active or fulfilled` <br />
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Looking for dog groomer", category: "pet services", status: "active" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

  OR

  * **Code:** 400 MISSING DATA <br />
    **Content:** `{ error : "Missing status/content/category/user_id" }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error : "Not a JSON" }`

------------------------------------------------------------------------------

**Show active requests**
----
  Show all active requests

* **URL**

  /requests

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, category: "pet services", content: "Need a dog groomer good with large dogs", status: "active" }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

-----------------------------------------------------------------------------

**Show request**
----
  Show a specific request

* **URL**

  /requests/:request_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `request_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, category: "pet services", content: "Looking for a dog groomer who's good with large dogs", status: "active or fulfilled" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

--------------------------------------------------------------------------------

**Update request**
----
  Update an existing request

* **URL**

  /requests/:request_id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `request_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   `content=description of the service being sought` <br />
   `category=category of the service being sought` <br />
   `status=active or fulfilled` <br />
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, category: "House cleaner", content: "Looking for house cleaning services", status: "active or fulfilled" }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not a JSON" }`

--------------------------------------------------------------------------------

**Delete request**
----
  Delete a specific review

* **URL**

  /requests/:request_id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `request_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ status: "Request deleted" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

--------------------------------------------------------------------------

**Retrieve reviews associated with a specific user**
----
  Retrieve reviews either made by a user, received by a user or both

* **URL**

  /reviews/users/:user_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `user_id=[string]`

*  **Header Params**

   `X-Token: jwt token generated at login`
   
* **Data Params**

   `type=made for, made by, or both` <br />

   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }]`

  OR

    * **Code:** 200 <br />
    **Content:** `{reviews_by: { id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }, reviews_for:  { id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, reviewee_id: b3ert72c-a974-412c-8e4p-240uy973fchj, content: "Dysmal service etc", rating: 1.3 }}`
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not logged in" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Missing X-Token authorization token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not a JSON" }`

  OR

  * **Code:** 400 INVALID DATA FORMAT <br />
    **Content:** `{ error: "Missing type" }`

* **Notes**

  * Success response differs for type == 'both' as shown in second option
 