<?php
session_start();
if(!isset($_SESSION['userId'])){
	header('Location: /bcos_FINAL_FINAL/login.php');
}elseif($_SESSION['accessLevel'] < 1){
	header('Location: /bcos_FINAL_FINAL/accessLevelError.php');
}
require_once ('db.php');
$conn = db_connect();
$amz = $conn->query("select * from amz where active = 1");
$row = $amz->fetch_assoc();
$source = $row['status'];
$current = $row['id'];
	if ($current == 1) {
		$current = "Live";
	} else {
		$current = "Amazon is Down";
	}
$_SESSION['amz'] = $source;
require_once('hyperlink.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-GB">
<head>
	<title>Home</title>
	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="css/styles.css" />
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script>
	<script type="text/javascript" src="js/jquery_idleTimeout.js"></script>
	<script  type="text/javascript"> var go =<?php  echo $_SESSION['accessLevel']?>;</script> 
	<script type="text/javascript" src="index.js"></script>
	
</head>
<body>

<div id="header">
	<h1>BCOS</h1>

	<?php display_user_hyperlinks(); ?>

	<p id="layoutdims">Welcome <?php echo $_SESSION['userName']; ?> | Tip: View the FAQ to find your common answers!</p>
</div>
<div class="colmask fullpage">
	<div class="col1">
		<!-- Column 1 start -->
		<h2>Welcome to BCOS. Enjoy your stay!</h2>
	
		<select id="live">
			<option value="">Are We Live or Down?</option>
			<option value="1">Live</option>
			<option value="2">Amazon is Down</option>
		</select>
		<p id="how">(Your active setting is <span id="count" class="status"></span>)</p>
		<!-- Column 1 end -->
	</div>
	<div class="col2">
		
	</div>
</div>
<div id="footer">
	<p></p>
</div>

</body>
</html>
