<?php
require_once __DIR__ . '/../config/database.php';

$errors = [];
$username = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $confirmPassword = trim($_POST['confirm_password'] ?? '');

    if ($username === '') {
        $errors[] = 'Username is required.';
    }

    if ($email === '') {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if ($password === '') {
        $errors[] = 'Password is required.';
    } elseif (strlen($password) < 6) {
        $errors[] = 'Password must be at least 6 characters long.';
    }

    if ($confirmPassword === '') {
        $errors[] = 'Please confirm your password.';
    } elseif ($password !== $confirmPassword) {
        $errors[] = 'Password and confirm password do not match.';
    }

    if (empty($errors)) {
        $conn = get_db_connection();
        $stmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $errors[] = 'This email is already registered. Please log in or use another email.';
        } else {
            $stmt->close();
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $insert = $conn->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
            $insert->bind_param('sss', $username, $email, $passwordHash);
            if ($insert->execute()) {
                $insert->close();
                $conn->close();
                header('Location: login.php?registered=1');
                exit;
            }
            $errors[] = 'Unable to register. Please try again later.';
            $insert->close();
        }

        $conn->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Laundry Management</title>
    <link rel="stylesheet" href="../assets/css/signUp.css">
</head>

<body>
    <div class="card">
        <form method="POST" action="register.php">
            <h2>Sign Up</h2>

            <?php if (!empty($errors)): ?>
                <div class="error-box">
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= htmlspecialchars($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <input type="text" name="username" placeholder="Enter username" value="<?= htmlspecialchars($username) ?>"><br>
            <input type="email" name="email" placeholder="Enter email" value="<?= htmlspecialchars($email) ?>"><br>
            <input type="password" name="password" placeholder="Enter password"><br>
            <input type="password" name="confirm_password" placeholder="Confirm password"><br>
            <button type="submit">Register</button>
            <p id="goBack">
                <a href="login.php">Go back to login page</a>
            </p>
        </form>
    </div>
</body>

</html>
