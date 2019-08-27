<?php
/*
This first bit sets the email address that you want the form to be submitted to.
You will need to change this value to a valid email address that you can access.
*/

$webmaster_email = "pani.anand90@gmail.com";

/*
This bit sets the URLs of the supporting pages.
If you change the names of any of the pages, you will need to change the values here.
*/
$feedback_page = "index.html";
$error_page = "error_message.html";
$error_page1 = "error_message1.html";
$thankyou_page = "thank_you.html";

/*
This next bit loads the form field data into variables.
If you add a form field, you will need to add it here.
*/
$subject=$_POST['subject'];
$email_address = $_POST['email'] ;
$comments = $_POST['message'] ;
$first_name = $_POST['name'] ;
$msg = 
"First Name: " . $first_name . "\n" . 
"Email: " . $email_address . "\n" . 
"Comments: " . $comments ;

/*
The following function checks for email injection.
Specifically, it checks for carriage returns - typically used by spammers to inject a CC list.
*/
function isInjected($str) {
	$injections = array('(\n+)',
	'(\r+)',
	'(\t+)',
	'(%0A+)',
	'(%0D+)',
	'(%08+)',
	'(%09+)'
	);
	$inject = join('|', $injections);
	$inject = "/$inject/i";
	if(preg_match($inject,$str)) {
		return true;
	}
	else {
		return false;
	}
}

// If the user tries to access this script directly, redirect them to the feedback form,
if (!isset($_REQUEST['email'])) {
header( "Location: $feedback_page" );
}

// If the form fields are empty, redirect to the error page.
// elseif (empty($name) || empty($email)) {
// header( "Location: $error_page1" );
// }

/* 
If email injection is detected, redirect to the error page.
If you add a form field, you should add it here.
*/
elseif ( isInjected($email) || isInjected($name)  || isInjected($message) ) {
header( "Location: $error_page" );
}

// If we passed all previous tests, send the email then redirect to the thank you page.
else {

	mail( $webmaster_email, $subject, $msg, "From: $first_name <$email_address>" );

	header( "Location: $thankyou_page" );
}

?>