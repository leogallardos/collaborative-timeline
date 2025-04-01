# Collaborative Timeline

This React application displays a collaborative timeline generated from user contributions. Each entry in the timeline represents a contribution and includes information about the contributor and their submission.

## Purpose

The primary purpose of this application is to visualize a timeline of contributions in a collaborative project. Users submit their contributions as Markdown files via pull requests. When a pull request is merged, the application automatically updates to reflect the new contribution.

This project is particularly useful for:

* **Workshops and Educational Settings:** Demonstrating collaborative workflows with Git and visualizing contributions from participants.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Redux Toolkit (RTK) with RTK Query:** For efficient data fetching and state management.
* **Framer Motion:** For animations.
* **Vite:** A fast build tool for development.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application in development mode:**

    ```bash
    npm run dev
    ```


## Data Source

The application fetches timeline data from a JSON file (`timeline.json`). This file is expected to be structured as defined in `timelineApiSlice.ts`. The contents of this file are generated from markdown files submitted by users.

## `timelineApiSlice.ts`

This file (`timelineApiSlice.ts`) defines the data structures and API endpoint for fetching timeline data using Redux Toolkit's RTK Query.

## Contributing

Contributions to this project are welcome! Please follow the standard Git workflow:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Submit a pull request.

## License

This project is licensed under the MIT License.