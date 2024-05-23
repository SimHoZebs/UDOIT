
# Installing UDOIT in Canvas
Once UDOIT has been installed on a public web server the following steps must be completed to add UDOIT to your Canvas LMS.
* Create an API developer key
* Create an LTI developer key
* Update the Institutions table
* Install the application

**Skills Required**
* Ability to insert MySQL

## Create an API Developer Key
The API Key UDOIT requires an API developer key, since all course data is gathered through the Canvas API.

1. Navigate to `Developer Keys` in the root account menu.
	- For UCF, this is `Admin` -> `CDL Canvas` -> `Developer Keys`
2. Click on `+ Developer Key` -> `+ API Key`.
3. Modify the following fields:
	- Key Name: Set this as the key name of your UDOIT instance. (e.g. UDOIT 3 API)
	- Owner Email: Set this as the email address of this UDOIT instance's admin.
	- Redirect URIs: `http://<YOUR_UDOIT_BASE_URL>/authorize/check`
	    - For local Docker instance, this is `http://127.0.0.0.1:8000/authorize/check`
    -  Icon URL: `<YOUR_UDOIT_BASE_URL>/build/static/udoit_logo.svg`
	    - For local Docker instance, this is `http://127.0.0.0.1:8000/build/static/udoit_logo.svg`
	 - Enforce Scopes: While it is not necessary for UDOIT's functionality, we strongly recommend doing so for security. The following scopes must be enabled for UDOIT to work:
         - <details>
            <summary>Scopes</summary>
            
            - accounts
                 - url:GET|/api/v1/accounts
                 - url:GET|/api/v1/accounts/:id
                 - url:GET|/api/v1/accounts/:account_id/sub_accounts
            - announcements_api
               - url:GET|/api/v1/announcements
            - assignments_api
              - url:GET|/api/v1/courses/:course_id/assignments
              - url:GET|/api/v1/courses/:course_id/assignments/:id
              - url:PUT|/api/v1/courses/:course_id/assignments/:id
            - courses
               - url:PUT|/api/v1/courses/:id
               - url:GET|/api/v1/courses/:id
               - url:POST|/api/v1/courses/:course_id/files
            - discussion_topics
               - url:GET|/api/v1/courses/:course_id/discussion_topics
               - url:PUT|/api/v1/courses/:course_id/discussion_topics/:topic_id
            - discussion_topics_api
               - url:GET|/api/v1/courses/:course_id/discussion_topics/:topic_id
            - files
               - url:GET|/api/v1/courses/:course_id/files
            	- url:GET|/api/v1/courses/:course_id/files/:id
            - context_module_items_api
               - url:GET|/api/v1/courses/:course_id/modules/:module_id/items
            	- url:GET|/api/v1/courses/:course_id/modules/:module_id/items/:id
            	- url:PUT|/api/v1/courses/:course_id/modules/:module_id/items/:id
            - context_modules_api
               -  url:GET|/api/v1/courses/:course_id/modules
            	- url:GET|/api/v1/courses/:course_id/modules/:id
            	- url:PUT|/api/v1/courses/:course_id/modules/:id
            - quizzes/quiz_questions
               - url:GET|/api/v1/courses/:course_id/quizzes/:quiz_id/questions
               - url:GET|/api/v1/courses/:course_id/quizzes/:quiz_id/questions/:id
               - url:PUT|/api/v1/courses/:course_id/quizzes/:quiz_id/questions/:id
            - quizzes/quizzes_api
               - url:GET|/api/v1/courses/:course_id/quizzes
               - url:GET|/api/v1/courses/:course_id/quizzes/:id
               - url:PUT|/api/v1/courses/:course_id/quizzes/:id
            - terms_api
               - url:GET|/api/v1/accounts/:account_id/terms
            - users
               - url:GET|/api/v1/users/:id
            - wiki_pages_api
               - url:GET|/api/v1/courses/:course_id/pages
            	- url:GET|/api/v1/courses/:course_id/pages/:url_or_id
            	- url:PUT|/api/v1/courses/:course_id/pages/:url_or_id
                
            </details>
      - Click Save.
      - Change the 'State' to ON for the key.
## Create an LTI Key
This is the key used to uniquely identify UDOIT. UDOIT uses LTI 1.3 to integrate with Canvas.

### Steps to Create an LTI Key
Follow the steps below, replacing `<YOUR_UDOIT_BASE_URL>` with the `BASE_URL` value from your `.env.local` file.

1. Navigate to `Developer Keys` in the root account menu.
	- For UCF, this is `Admin` -> `CDL Canvas` -> `Developer Keys`
2. Click on `+ Developer Key` -> `+ LTI Key`.
3. Modify the following fields:
   - Key Name: Set this as the key name of your UDOIT instance. (e.g. UDOIT 3 LTI)
	- Owner Email: Set this as the email address of this UDOIT instance's admin.
   - Redirect URIs: `http://<YOUR_UDOIT_BASE_URL>/authorize/check`
      - For local Docker instance, this is `http://127.0.0.0.1:8000/authorize/check`
   - Method: Manual entry
   - Title: Set this as the name of your UDOIT instance. (e.g. UDOIT 3)
   - Description: Set this as you see fit.
   - Target Link URI: `http://<YOUR_UDOIT_BASE_URL>/udoit3/dashboard`
      - For local Docker instance, this is `http://127.0.0.1.:8000/udoit3/dashboard`
   - OpenID Connect Initiation Url: `http://<YOUR_UDOIT_BASE_URL>/udoit3/lti/authorize`
      - For local Docker instance, this is `http://127.0.0.1.:8000/udoit3/lti/authorize`
   - JWK Method: Public JWK URL
   - Public JWK URL: `<CANVAS_URL>/lti/config`
      - For UCF, this is `https://canvas.instructure.com/udoit3/api/lti/security/jwks`
      - If your instance of Canvas is self-hosted, modify the URL under **JWK Method** to point to your canvas instance.
   - Additional Settings
      - Domain: `http://<YOUR_UDOIT_BASE_URL>/udoit3`
         - For local Docker instance, this is `http://127.0.0.1.:8000/udoit3`
         - Custom Fields
            ```
            lms_id=canvas
            lms_user_id=$Canvas.user.id
            lms_course_id=$Canvas.course.id
            lms_api_domain=$Canvas.api.domain
            ```
            - other fields are optional.
      - 
   - Click Save.
   - Change the 'State' to ON for the key.
   - Placement



* Save
* Click `ON` to enable the newly created key

---
## Docker Compose Base URL
If you are setting up UDOIT for local development through `docker compose`, <YOUR_UDOIT_BASE_URL> in both the API developer key and the LTI developer key above should be set to `http://127.0.0.1:8000/udoit3`.

---
## Update the Institutions Table
UDOIT is built to support more than one LMS instance. For this purpose, you currently have to insert LMS information to the `institution` table manually. For default database setup(MySQL) on MacOS, we recommend using [Sequel Ace](https://apps.apple.com/us/app/sequel-ace/id1518036000?mt=12) to interact with the database.

**Note:** This step requires knowledge of MySQL.

The following fields need to be populated in the `institution` table.
* title
    * Your institution's name
* lms_domain
    * The Canvas domain name of your institution.
    * Most institutions will use their `.instructure.com` domain.
    * Do not include `https://` or a trailing slash.
    * Example: `myschool.instructure.com`
* lms_id
    * `canvas`
* lms_account_id
    * The Canvas account ID (as a string) where UDOIT will be installed.
* created
    * Date in this format: `2021-06-08`
* status
    * `1` if you are using MySQL or MariaDB (or Docker)
    * `true` if you are using PostgreSQL
* vanity_url
    * Your LMS vanity URL
    * Example: `canvas.myschool.edu`
* metadata
    * Optional
    * Institution specific settings, such as language or excluded tests.
    * Text representation of a JSON object.
    * Example: `{"lang":"es"}`
    * Currently supported languages are English (en) and Spanish (es).
* api_client_id
    * The ID of the developer API key you created earlier.
    * Client ID is found in the `Details` column on the Developer Keys page
    * Example: 1234500000000001234
* api_client_secret
    * The secret for the API key you created earlier.
    * Click `Show Key` on the API key you created earlier.
    * This key will be stored encrypted on the first use of the key.

---
## .ENV Setup
For cloud-hosted canvas instances the default value for the `JWK_BASE_URL` environmental variable will work out of the box. If you are not cloud-hosted, you may need to change the value of this variable in `.env.local` to match your canvas instance.

---
## Install the App
UDOIT now needs to be added to an account in Canvas. Follow these steps to add the LTI tool to an account:
1. Copy the `Client ID` from the developer LTI key created earlier.
2. Navigate to the desired account.
3. Select `Settings` from the left menu.
4. Choose the `Apps` tab.
5. Choose the `View App Configurations` button in the top right corner.
6. Click `+ App`
7. In the dialog that appears, choose "Configuration Type" "By Client ID".
8. Paste the `Client ID` from the developer LTI Key you created earlier.
9. Click Submit.

You're done!  "UDOIT" should now appear in the navigation menu of the course (or every course in the account) in which you installed it.  If you installed it to an account, "UDOIT Admin" will also appear in the account navigation menu.
