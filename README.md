# **Secure-MERN-Authentication**

---

# **Movie Matic 🎬**

Movie Matic is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to provide users with a seamless movie-searching experience while ensuring security and privacy through robust authentication mechanisms.

# **Features**

### Secure Authentication 🔐

-   Movie Matic implements secure authentication using JWT (JSON Web Tokens) and HTTP-only cookies.
-   Passwords are securely hashed and salted using standard encryption techniques, ensuring user data remains protected.
-   User sessions are managed using HTTP-only cookies, mitigating the risk of XSS (Cross-Site Scripting) attacks.

### User Registration and Verification 👤

-   Users can register for an account on Movie Matic, providing their name, email address and password.
-   After registration, users receive an OTP (One-Time Password) via email for account verification.
-   The OTP expires after 5 minutes to ensure security and prevent unauthorized access.
-   Users can request a resend of the OTP if needed.

### Password Reset 🔑

-   Movie Matic offers a hassle-free password reset feature for users who forget their passwords.
-   Users can access the password reset link via email.
-   The password reset link expires after 30 minutes for added security.

### Movie Search and Details 🔍

-   Users can search for movies using the intuitive search feature.
-   Search results are displayed as vibrant movie cards, providing users with a glimpse into each movie's details.
-   Users can click on a movie card to access comprehensive movie information, including plot summaries, ratings, cast details, and more.


### Admin Dashboard 👤

-   Movie Matic includes an admin dashboard for administrators to manage user accounts.
-   Admins have full visibility into user details, enabling them to monitor and manage user accounts effortlessly.
-   

## Technologies Used 🌐

-   React.js: A JavaScript library used for building user interfaces.
-   Node.js: A JavaScript runtime environment used for server-side development.
-   Express.js: A Node.js web application framework used for server-side logic and routing.
-   MongoDB: A NoSQL database used to store user information and movie data.
-   React Router: A routing library for React applications.
-   JWT (JSON Web Tokens): A secure way to transmit information between parties as a JSON object.
-   bcrypt: A library used for password hashing and salting.
-   Nodemailer: A module for sending emails from Node.js applications.
-   Tailwind CSS: A front-end framework for developing beautifull user interfaces.

## Contributions 🛂

Contributions to Movie Matic are welcome! If you encounter any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License 🪪

This project is licensed under the MIT License - see the LICENSE file for details.

## Author 🧑‍💻

[Vimal Kumar. V (Vk-develops)](https://www.instagram.com/itz__vimal__93/)

