 ## Laundry Management System

## A simple PHP laundry management app with authentication.
## Setup

1. Install XAMPP, WAMP, or Laragon and start Apache + MySQL.
2. Put the `laundry` folder in your web server root.
   - Example for XAMPP: `C:\xampp\htdocs\laundry`
3. Create the database by importing `config/schema.sql`:
   - Open phpMyAdmin.
   - Select a new database name, then use the Import tab.
   - Choose `config/schema.sql` and run the import.
4. Open the app in your browser:
   - `http://localhost/laundry`

## Usage

- Register at `auth/register.php`
- Log in at `auth/login.php`
- After login, access the dashboard and other pages