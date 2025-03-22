# DMSL Virtual Laboratory

A virtual laboratory platform for Database Management Systems Lab (DMSL) developed for PICT IT Department. This platform provides interactive learning resources, assignments, and quizzes for database management concepts.

## Features

-   📚 Comprehensive DMSL assignments and tutorials
-   📝 Interactive quizzes with instant feedback
-   🎥 Video demonstrations
-   📊 Real-time progress tracking
-   💻 Hands-on practice environment
-   📱 Responsive design for all devices

## Tech Stack

### Frontend

-   React.js
-   React Router
-   Axios for API calls
-   CSS for styling

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB
-   Git

### Installation

1. Clone the repository

````bash
git clone https://github.com/yourusername/Virtual-lab.git
cd Virtual-lab
````

2. Install Frontend Dependencies

```bash
cd DMSL
npm install
```

3. Install Backend Dependencies
```bash
cd DMSL_Backend
npm install
```

4. Configure Environment Variables
create a .env file in the root directory of the DMSL(frontend) with the following variables:
VITE_BASE_URL={your backend url (for example:localhost:5000)}
