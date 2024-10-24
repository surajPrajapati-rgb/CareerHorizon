# CareerHorizon

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Overview

Welcome to **CareerHorizon**, a platform that connects learners with experienced professionals and mentors. It allows users to book 1-on-1 mentorship sessions, join workshops, and gain industry insights from experts. This platform aims to create a community where knowledge sharing helps individuals in career development.

## Features

### For Users
- **Mentor Profiles**: Browse profiles of professionals from various industries.
- **1-on-1 Session Booking**: Schedule individual mentorship sessions with mentors.
- **Workshops and Events**: Join group workshops and webinars hosted by mentors.
- **Search Functionality**: Search mentors based on expertise, industry, or skills.
- **Real-time Availability**: View and book sessions based on mentors’ available slots.
- **Review System**: Provide feedback and rate mentors after sessions.

### For Mentors
- **Create and Manage Profiles**: Set up profiles to showcase expertise and set availability.
- **Manage Sessions**: Accept or decline session requests with an integrated calendar.
- **Host Group Events**: Organize and manage workshops for multiple users.
- **Dashboard**: Access information on upcoming and past sessions, reviews, and more.

### Additional Features
- **Notification System**: Receive notifications for booking confirmations, reminders, and updates.
- **Authentication**: Secure user authentication using tokens and password encryption.
- **User Dashboard**: Both users and mentors can manage bookings and view session history.
- **Payment Integration**: (Optional) Set up paid sessions with integrated payment gateways.

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building dynamic user interfaces.
- **HTML5, CSS3, JavaScript**: Core web technologies for building and styling the UI.

### Backend
- **Python Django**: A high-level Python web framework for rapid development.
- **Django REST Framework**: For building APIs that allow communication between the frontend and backend.
  
### Database
- **MySql**: A robust, open-source relational database for managing mentor and user data.

### Containerization
- **Docker**: To containerize the application, making it easy to deploy and run in any environment.

### Testing
- **Pytest**: A testing framework for ensuring the quality and reliability of the backend code.

### Other Tools
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Celery**: For handling background tasks like sending notifications and emails.
- **Redis**: For managing real-time notifications and caching.

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (for running React.js frontend)
- Python 3.x (for Django backend)
- Docker (for containerization)
- MySql  (database)

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. **Navigate to the backend directory**:
   ```bash
   cd your-repository/backend
   ```
3. **Create a virtual environment and install dependencies**:
   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```
4. **Set up environment variables**:
   Create a `.env` file and include the following:
   ```
   SECRET_KEY=your_secret_key
   DATABASE_URL=your_database_url
   DEBUG=True
   JWT_SECRET=your_jwt_secret
   ```
5. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```
6. **Start the backend server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd your-repository/frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend server**:
   ```bash
   npm start
   ```

Both the backend and frontend servers should now be running.

### Docker Setup (Optional)
If you prefer to run the entire stack using Docker:
1. **Build and run containers**:
   ```bash
   docker-compose up --build
   ```

This will create and run both the backend and frontend services along with the database in separate containers.

## Usage

1. **For Users**:
   - Sign up and log in to the platform.
   - Browse through the available mentors.
   - Book mentorship sessions or join workshops.
   - Provide feedback and rate sessions after completion.

2. **For Mentors**:
   - Set up your profile, including your availability.
   - Manage incoming session requests and workshop bookings.
   - View feedback and adjust availability as needed.

## Testing

To ensure that the backend API works as expected, we use **Pytest** for automated testing.

1. **Run tests**:
   Navigate to the backend directory and run:
   ```bash
   pytest
   ```

You can create unit tests for both the API endpoints and the database models to ensure full coverage.

## Contributing

We welcome contributions! To contribute to this project, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature/your-feature
   ```
5. **Open a Pull Request**: Submit your PR with a description of the changes you've made.

### Reporting Issues
Please report any issues you encounter by opening a GitHub issue. Be sure to include details on how to reproduce the issue.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: jnvsuraj7388@gmail.com.(mailto:jnvsuraj7388@gmail.com)
- **GitHub**: [https://github.com/surajPrajapati-rgb](https://github.com/surajPrajapati-rgb/))

---

Thank you for using CareerHorizon! We hope this platform helps you connect with mentors and advance your career development.
