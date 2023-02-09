# qobrix-e2e

E2E Tests for Qobrix

Run 'npm i', if you haven't already done. This will install all the needed dependencies to run the cypress tests.

Run 'npm run test'/'npm run test --chrome' to open cypress portal and run the specific tests

Run 'npm run delete_temporary_Files' to delete all the temporary files like screenshots, reports of previous test runs

Run 'npm run automated_tests -- --env username=Your_username,password=Your_password' to run all the test

After the tests are completed, the html test report for the test executed are created with above test runs in output.html file. If output.html file is not created then,
Run 'npm run final_report' and the html file will be created in root directory.
