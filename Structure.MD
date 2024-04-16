/backend
    #/config
        - database.js       // Configuration for your database
    /controllers
        - userController.js // Business logic for user-related operations
        - birdController.js // Business logic for bird-related operations
        - sightingController.js // Business logic for sighting-related operations
    /models
        - userModel.js      // Data access layer for users
        - birdModel.js      // Data access layer for birds
        - sightingModel.js  // Data access layer for sightings
    /routes
        - usersRoutes.js    // Routes related to user operations
        - birdsRoutes.js    // Routes related to bird operations
        - sightingsRoutes.js// Routes related to sighting operations
    /middleware
        - auth.js           // Authentication middleware
    - app.js             // Entry point of your application