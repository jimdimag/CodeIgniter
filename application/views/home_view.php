<!-- View page for the home area-->
 <body>
   <h1>BCOS</h1>
   <div id="header">
   <?php $access_level = $user_type_id;require_once('hyperlink.php');display_user_hyperlinks($access_level); ?>
   <p id="layoutdims">Welcome <?php echo $username; ?> | Tip: View the FAQ to find your common answers!</p>
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
		<p id="how">(Your active setting is <span id="count" class="status"><?php echo $status;?></span>)</p>
		<!-- Column 1 end -->
	</div>
	<div class="col2">
		
	</div>
</div>
 </body>
</html>
