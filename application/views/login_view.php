<!-- Login View Page-->
</head>
 <body>
<div id="header">
	<h1>BCOS</h1>
	<p id="layoutdims">You need to log in!</p>
</div>
<div class="colmask fullpage">
	<div class="col1">
		<!-- Column 1 start -->
		<div align="center">
<?php echo validation_errors();?>
<?php echo form_open('verifylogin');?>
Username:
<input type="text" size="20" id="username" name="username"/>
<br/>
Password:
<input type="password" size="20" id="passowrd" name="password"/>
<br/>
<input type="submit" value="Login"/>
</form>
</div>
		<!-- Column 1 end -->
	</div>
</div>
 </body>
</html>
