| Test ID | Component/Page  | Test Case                                   | Steps                                 | Expected Result                                  |
| ------- | --------------- | ------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| TC-001  | AdminPanel Page | No pending cards message                    | Login when there are no pending cards | 'No pending cards' message is visible            |
| TC-002  | AdminPanel Page | Each card shows title and description       | Login as admin                        | All cards display data                           |
| TC-003  | AdminPanel Page | Approve button functionality                | Click Approve                         | Card disappears from list                        |
| TC-004  | AdminPanel Page | Reject flow with confirmation               | Click Reject, then Yes                | Card is removed                                  |
| TC-005  | AdminPanel Page | Reject Cancel keeps card                    | Click Reject, then Cancel             | Card stays visible                               |
| TC-006  | AdminPanel Page | Multiple cards can be actioned              | Approve or reject several             | All process successfully                         |
| TC-007  | AdminPanel Page | Responsive layout for admin cards           | Resize screen                         | Card layout adjusts responsively                 |
| TC-008  | Change Password | Submit with empty fields                    | Click Confirm without input           | Validation errors shown                          |
| TC-009  | Change Password | Success shows confirmation                  | Change password correctly             | Success message shown                            |
| TC-010  | Change Password | Cancel button closes modal                  | Click Cancel                          | Modal disappears                                 |
| TC-011  | Change Password | Old password incorrect                      | Enter wrong old password              | Error message shown                              |
| TC-012  | Flashcard       | Card flips back on second click             | Click the same card twice             | Card returns to front view                       |
| TC-013  | Flashcard       | Multiple cards can be flipped independently | Click several cards                   | Each card flips without affecting others         |
| TC-014  | Flashcard       | Card displays correct title and description | Observe front and back of a card      | Title on front, description on back is correct   |
| TC-015  | Home Page       | Flashcards flip on click                    | Click any card                        | Card flips to show description                   |
| TC-016  | Home Page       | Clicking Propose button works               | Click 'Propose a Card'                | Redirects to propose page                        |
| TC-017  | Home Page       | No cards message when list is empty         | Login as user with no approved cards  | 'No cards available' message is shown            |
| TC-018  | Home Page       | Welcome message contains username           | Login and observe greeting            | Says 'Hello, [Username]!'                        |
| TC-019  | Login Page      | Username and password fields are focusable  | Click on fields                       | Cursor appears and user can type                 |
| TC-020  | Login Page      | Successful login redirects to home          | Enter valid credentials and log in    | Redirected to home page                          |
| TC-021  | Login Page      | Submit form with empty fields               | Click 'Log In' without input          | Validation errors appear                         |
| TC-022  | Login Page      | Logo redirects to home                      | Click on logo                         | Should redirect to home (if linked)              |
| TC-023  | Login Page      | Error shown on login failure                | Enter incorrect credentials           | Error message is shown                           |
| TC-024  | Login Page      | Login page loads successfully               | Navigate to login page                | Login form and logo are visible                  |
| TC-025  | Login Page      | Form remains after login failure            | Enter invalid credentials             | Login form stays with error message              |
| TC-026  | Login Page      | Password input is masked (type='password')  | Inspect input field                   | Characters are masked                            |
| TC-027  | Navbar          | Active link highlights current page         | Navigate to different pages           | Active link is visually distinct                 |
| TC-028  | Navbar          | Responsive navbar toggles on small screens  | Resize screen to mobile view          | Navbar collapses into a hamburger menu           |
| TC-029  | Navbar          | Logout logs user out                        | Click Logout                          | Redirects to login and clears session            |
| TC-030  | Navbar          | All navigation links visible                | Observe navigation bar                | Home, Chatbot, Quiz, Profile, Logout are visible |
| TC-031  | Navbar          | Clicking each link works                    | Click Home, Quiz, etc.                | Navigates to corresponding page                  |
| TC-032  | Profile Page    | Clicking Change Password opens modal        | Click the button                      | Modal appears                                    |
| TC-033  | Profile Page    | All profile data is accurate                | Login and check profile               | Correct username, name, email shown              |
| TC-034  | Profile Page    | Email format is correct                     | Check user email                      | Email follows valid format (contains '@')        |
| TC-035  | Propose Page    | Submit button is disabled during submission | Click submit and watch button         | Button disables until process completes          |
| TC-036  | Propose Page    | Submit button disabled until form is filled | Try submitting with empty fields      | Form cannot be submitted                         |
| TC-037  | Propose Page    | Validation on empty title or description    | Leave a field empty and submit        | Validation error shown                           |
| TC-038  | Propose Page    | Back button returns to Home                 | Click '← Back'                        | Goes back to home page                           |
| TC-039  | Register Page   | Password input is masked (type='password')  | Inspect signup password field         | Characters are masked                            |
| TC-040  | Register Page   | Submit with empty fields                    | Click 'Register' without input        | Validation error shown                           |
| TC-041  | Register Page   | Submit with mismatched or invalid data      | Fill invalid email or short password  | Validation error shown                           |
| TC-042  | Register Page   | Duplicate username/email check              | Register with existing credentials    | Error message shown                              |
| TC-043  | Register Page   | Password input is masked (type='password')  | Type password                         | Input is obscured                                |
| TC-044  | Register Page   | Log in link redirects to login              | Click 'Log in' link                   | Redirects to login page                          |
| TC-045  | Register Page   | Form clears on successful signup            | Register new user                     | Fields are reset after success message           |
