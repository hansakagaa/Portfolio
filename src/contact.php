/*!
 * Contact Form PHP  v1.0
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */

<?php
// enter your email address here. where you want to receive the messages
$receiving_email_address = 'hashen.info@gmail.com'; 

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    echo "Direct access not allowed.";
    exit;
}

// Catching the data sent by JavaScript (POST).
// The names given to the 'name' attribute of the HTML fields should be the same as the ones used here to catch the data.
$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone   = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Server-side Validation (Server-side checking for security reasons, even if there is client-side validation)
if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "All blanks must be filled.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please enter a valid email address.";
    exit;
}

// Data cleaning to avoid hacker attacks (Sanitize Data)
$name    = strip_tags($name);
$phone   = strip_tags($phone);
$subject = strip_tags($subject);
$message = htmlspecialchars($message);

// Prepare the email (Email Headers & Body)
$email_subject = "New Contact Message: " . $subject;

$email_content = "A new message has been received.\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n\n";
$email_content .= "Message:\n$message\n";

// The part that sets who to send the email from and to whom to reply to (Email Headers)
$email_headers = "From: $name <$email>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

// Send the email (Mail Sending)
if (mail($receiving_email_address, $email_subject, $email_content, $email_headers)) {
    // If the email is sent successfully, echo 'ok' for JavaScript to handle the response
    http_response_code(200);
    echo "ok";
} else {
    // If the email fails to send, echo an error message for JavaScript to handle the response
    http_response_code(500);
    echo "Failed to send email. (Mail function error)";
}
?>