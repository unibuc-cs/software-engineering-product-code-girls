workspace "Book Management Application" "Application for managing books, categories, user reviews, and profiles" {

    !identifiers hierarchical

    model {
        user = person "End User" "A person who uses the application to browse and manage books." {
            tags "Person"
        }

        admin = person "Administrator" "A person who manages books and categories." {
            tags "Person"
        }

        bookApp = softwareSystem "Book Management System" "Allows users to manage books, categories, and reviews." {

            frontend = container "Web Application" "Delivers the user interface of the application and consumes the API." "React + Vite" {
                tags "Container"
            }

            backend = container "API Application" "Handles application logic and exposes functionality via a JSON/HTTPS API." "Node.js" {
                tags "Container"

                authService = component "Authentication Service" "Handles user login, logout, creating an account and token management." {
                    tags "Component"
                }

                bookService = component "Book Service" "Handles CRUD operations for books." {
                    tags "Component"
                }

                profileService = component "Profile Service" "Manages user profile data (name, profile picture, list of books that were read / will be read)." {
                    tags "Component"
                }

                categoryService = component "Category Service" "Handles CRUD operations for book categories." {
                    tags "Component"
                }

                commentService = component "Comment Service" "Handles CRUD operations for comments on books." {
                    tags "Component"
                }

                reviewService = component "Review Service" "Handles CRUD operations book reviews." {
                    tags "Component"
                }
            }

            database = container "Database" "SQLite" "Stores books, categories, reviews, comments, users, and tokens." {
                tags "Database"
            }
        }

        user -> bookApp.frontend "Accesses books, adds comments and reviews, saves favorite books"
        admin -> bookApp.frontend "Manages books and categories"

        bookApp.frontend -> bookApp.backend "Makes API calls to" "REST API"
        bookApp.backend -> bookApp.database "Reads from and writes to"

        bookApp.backend.authService -> bookApp.database "Validates users and stores tokens"
        bookApp.backend.bookService -> bookApp.database "Manages books"
        bookApp.backend.profileService -> bookApp.database "Manages user profiles"
        bookApp.backend.categoryService -> bookApp.database "Manages categories of books"
        bookApp.backend.commentService -> bookApp.database "Manages comments on books"
        bookApp.backend.reviewService -> bookApp.database "Manages reviews on books"

        bookApp.backend.authService -> bookApp.backend.bookService "Authorizes access to book operations"
        bookApp.backend.authService -> bookApp.backend.profileService "Validates access to profile data"
        bookApp.backend.profileService -> bookApp.backend.bookService "Fetches user-specific books for their Read / To Read lists"
        bookApp.backend.bookService -> bookApp.backend.categoryService "Uses categories for organizing books"
        bookApp.backend.bookService -> bookApp.backend.commentService "Fetches comments for books"
        bookApp.backend.bookService -> bookApp.backend.reviewService "Fetches reviews for books"
    }

    views {
        systemContext bookApp "System_Context" {
            include *
            autolayout lr
        }

        container bookApp "Containers" {
            include *
            autolayout lr
        }

        component bookApp.backend "Backend_Components" {
            include *
            autolayout rl
        }

        styles {
            element "Person" {
                background #b6f3a4
                shape person
            }
            element "Software System" {
                background #a3d794
            }
            element "Container" {
                background #8dc97c
            }
            element "Component" {
                background #88cc88
            }
            element "Database" {
                shape cylinder
                background #93c6e5
            }
        }
    }
}