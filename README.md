wogm-notify
===========

Overview - A simple notification system. Messages are stored in a MySQL database. A web based interface to CRUD messages is provided.
A single message can be 'activated'. The activated message is displayed via index.html. Index.html automatically refreshes every 5 seconds to reflect changes to the activated message.

Requirements - PHP, MySQL, and a browser that supports javascript. Development is done with Apache and PHP 5.4.3. Earlier or later versions of PHP should work with no problem.  Any web server that supports PHP should work fine. Extensive testing has not been done to determine system requirements, but this code is not very advanced.

Security - none, really. index.html displays the active message. Admin.html allows anyone to CRUD or activate a message.

Installation - Use /sql/notify.sql to create the database and a single table. Create a database user and grant read/write access to the table. Update /webservices/includes/config.php to match the database credentials.

Bugs - of course!  Minimal testing has been done.

Code quality - minimal, this was thrown together quickly. Code has not been cleaned up or documented. Extra and/or dead code may be present.
There are plenty of places where this application will fail if AJAX calls, SQL, or PHP problems occur.

Todo -
* AJAX error handling
* PHP error handling
* Sanitize input fields

