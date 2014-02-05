<?php
function display_user_hyperlinks($access_level){
	//$access_level = $session_data['accessLevel'];
	if($access_level==5){
		admin_hyperlinks();
	}
	if($access_level==4){
		power_user_hyperlinks();
	}
	if($access_level==3){
		warehouse_user_hyperlinks();
	}
	if($access_level==2){
		store_user_hyperlinks();
	}
	if($access_level==25){
		van_hyperlinks();
	}
	if($access_level==1){
		store_buyer_hyperlinks();
	}
	if($access_level==6){
		buyers_hyperlinks();
	}
}

// user this function if user is buyer
function admin_hyperlinks(){
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="<?php echo site_url("buyback/index"); ?>">Buyback<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buybackBuyer/buybackBuyermws.php">Buyer<span>Buyback</span></a></li>
		<li><a href="/bcos/vanbuyback/buybackmws.php">Van<span>Buyback</span></a></li>
		<li><a href="/bcos/bookprocess/bookprocessmws.php">Book <span> Processing </span></a></li>
		<li><a href="/bcos/inventory/inventory.php">Inventory<span> &nbsp; </span></a></li>
		<li><a href="/bcos/shelving/shelving.php">Shelving<span> &nbsp; </span></a></li>
		<li><a href="/bcos/accounting/accounting.php">Accounting<span> &nbsp; </span></a></li>
		<li><a href="/bcos/user/user.php">User <span> Management </span></a></li>
		<li><a href="/bcos/mbas/mbasmws.php">Mark Books<span> as Sold </span></a></li>
		<li><a href="/bcos/mbas/priceDrop.php">Price Drop<span>Scripts</span></a></li>
		<li><a href="/bcos/reprintsku/reprintsku.php">Reprint<span> SKU </span></a></li>
		<li><a href="/bcos/advances/advance.php">Advances<span> &nbsp; </span></a></li>
		<li><a href="/bcos/faqs.php">FAQ<span> &nbsp; </span></a></li>
		<li><a href="/bcos/dashboard/FinDash.php">Dashboard <span>&nbsp;</span></a></li>
		<li><a href="home/logout">Logout<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function power_user_hyperlinks(){
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buyback/buybackmws.php">Buyback<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buybackBuyer/buybackBuyermws.php">Buyer<span>Buyback</span></a></li>
		<li><a href="/bcos/vanbuyback/buybackmws.php">Van<span>Buyback</span></a></li>
		<li><a href="/bcos/bookprocess/bookprocessmws.php">Book <span> Processing </span></a></li>
		<li><a href="/bcos/inventory/inventory.php">Inventory<span> &nbsp; </span></a></li>
		<li><a href="/bcos/shelving/shelving.php">Shelving<span> &nbsp; </span></a></li>
		<li><a href="/bcos/mbas/mbasmws.php">Mark Books<span> as Sold </span></a></li>
		<li><a href="/bcos/reprintsku/reprintsku.php">Reprint<span> SKU </span></a></li>
		<li><a href="/bcos/advances/advance.php">Advances<span> &nbsp; </span></a></li>
		<li><a href="/bcos/dashboard/dashboard.php">Dashboard <span>&nbsp;</span></a></li>
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function warehouse_user_hyperlinks(){
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buyback/buybackmws.php">Buyback<span> &nbsp; </span></a></li>
		<li><a href="/bcos/bookprocess/bookprocessmws.php">Book <span> Processing </span></a></li>
		<li><a href="/bcos/shelving/shelving.php">Shelving<span> &nbsp; </span></a></li>
		<li><a href="/bcos/reprintsku/reprintsku.php">Reprint<span> SKU </span></a></li>
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function store_user_hyperlinks(){
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buyback/buybackmws.php">Buyback<span> &nbsp; </span></a></li>
		<li><a href="/bcos/reprintsku/reprintsku.php">Reprint<span> SKU </span></a></li>
		<li><a href="/bcos/advances/total.php">Buyer<span>Totals</span></a></li>
		<li><a href="/bcos/faqs.php">FAQ<span> &nbsp; </span></a></li>
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function store_buyer_hyperlinks(){
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/buybackBuyer/buybackBuyermws.php">Buyer<span>Buyback</span></a></li>
		<li><a href="/bcos/reprintsku/reprintsku.php">Reprint<span> SKU </span></a></li>
		<li><a href="/bcos/faqs.php">FAQ<span> &nbsp; </span></a></li>
		<li><a href="/bcos/advances/total.php">Buyer<span>Totals</span></a></li>
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function van_hyperlinks(){ 
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/vanbuyback/buybackmws.php">Buyback<span> &nbsp; </span></a></li>
		<li><a href="/bcos/advances/total.php">Daily<span>Totals</span></a></li>
		<li><a href="/bcos/faqs.php">FAQ<span> &nbsp; </span></a></li>
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
function buyers_hyperlinks(){ 
?>
	<ul>
		<li><a href="/bcos/index.php">Home<span> &nbsp; </span></a></li>
		<li><a href="/bcos/advances/buyertotal.php">Check-In<span>Totals</span></a></li>
		<!--<li><a href="/bcos/faqs.php">FAQ<span> &nbsp; </span></a></li>-->
		<li><a href="/bcos/logout.php">Log Out<span> &nbsp; </span></a></li>
	</ul>
<?php
}
?>