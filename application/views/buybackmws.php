<script type="text/javascript" src="<?php echo base_url();?>js/buybackmws.js"></script>
</head>
 <body>
<div id="header">
	<h1>The Book Cellar System</h1>

	<?php $access_level = $user_type_id;require_once('hyperlink.php');display_user_hyperlinks($access_level); ?>

	<p id="layoutdims">Welcome <?php echo $username; ?> | Tip: Questions? Check out the FAQ page.</p>
</div>

<div class="colmask fullpage">
	<div class="col1">
	<?php echo validation_errors();?>
<?php echo form_open('buyback', $title);?>
		<div id="tabs">
			<ul>
				<li><a href="#tabs-1">Books</a></li>
				<li><a href="#tabs-2">Video Games</a></li>
				<li><a href="#tabs-3">Movies</a></li>
				<li><a href="#tabs-4">Music</a></li>
				<li><a href="#tabs-5">Games</a></li>
				<li><a href="#tabs-6">Store Forms</a></li>
				<li><a href="#tabs-7">Edit Past Forms</a></li>
				
			</ul>
			<div id="tabs-1">
		<form id="buybackForm">
		<table height="220">
				<tr>
					<td><label>ISBN</label></td>
					<td><input type="text" id="isbn" name="isbn" value="<?php echo set_value('isbn'); ?>" /></td>
					<td></td>
					<td rowspan=7><a id="detailURL" href="#" target="_blank"><img id="bookCover" src="<?php echo base_url();?>/images/imgNotFound.gif" height="200px" /></a></td>
					<td rowspan=7><input type="button" id="isIE" name="isIE" value="IE Price Reduction" />
						<br/><br/><input type="button" id="isAIE" name="isAIE" value="AIE Price Reduction" />
						<br/><br/><input type="button" id="isModHighlight" name="isModHighlight" value="Moderate Highlighting" />
						<br/><br/><input type="button" id="isHeavHighlight" name="isHeavHighlight" value="Heavy Highlighting" />
						<br/><br/><input type="button" id="isMissingSupply" name="isMissingSupply" value="Missing Supply" />
						<br /><br/><input type="button" id="waterDamage" name="waterDamage" value="Water Damage / Poor Cond." />
						<br /><h3>Don&rsquo;t buy books with water damage unless it is light!</h3>
					</td>
					<td rowspan=7>
						<!-- SUPPLY CHECK TABLE -->
						<table id="supply" summary="Check Supply" width="10%" border="1" align="right">
						<caption><h3>Check Supply!</h3></caption>
						<thead>
						<tr>
							<th scope="col" class="rounded-isbn">Supply:</th>
							<!--<th scope="col" class="rounded-isbn">Who Requires:</th>-->
						</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</td>
					<td rowspan=7>
						<!-- PROBLEM BOOK TABLE -->
						<table id="problem" summary="Problem Book" width="50%" border="1" align="right">
						<caption><h3>Problem Books!</h3></caption>
						<thead>
						<tr>
							<th scope="col" class="rounded-isbn">Notes:</th>
							<!--<th scope="col" class="rounded-isbn">Who Requires:</th>-->
						</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td><label for="quantity" class="label">Quantity</label></td>
					<td><input type="text" id="quantity" name="quantity" value="<?php echo set_value('quantity'); ?>"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label for="payPrice" class="label">Price to Pay</label></td>
					<td><input type="text" id="payPrice" name="payPrice"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Edition</label></td>
					<td><input type="text" id="edition" name="edition" readonly="readonly"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Title</label></td>
					<td><input type="text" id="title" name="title"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Sales Rank</label></td>
					<td><input type="text" id="salesRank" name="salesRank" readonly="readonly" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Source</label></td>
					<td>
						<select id="source" name="source">
				     		<option value="">Default</option>
				     		<?php
				     		/*$query = "select source_id, source from source where buyer_type_id=1";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['source_id'] . '" >' . $row['source'] . '</option>';
							}*/
							?>
							<!-- ANNIES STORES, EDIT THIS FOR MORE OR LESS ANNIES -->
							<option value="17">ANLOW</option>
							<option value="15">ANCONC</option>
							<option value="228">ANWALT</option>
							<option value="18">ANN</option>
						</select>
					</td>
					<td></td>
				</tr>
				<tr>
					
					<td><input type="hidden" name="asin" id="asin"></td>
				</tr>
				<tr>
					<td></td><td><input type="button" id="buy" value="Buy" /></td><td></td>
		</table>
		</form>






			<div id="loading">
			<img src='<?php echo base_url();?>/images/loading.gif' />
			</div>

			<!-- TALLY TABLE -->
			<!--<table class="tablesorter" id="tally" cellspacing="1">
			<thead>
			<tr>
				<th>ISBN</th>
				<th>Title</th>
				<th>Price Paid</th>
				<th>Quantity</th>
				<th>Original Price</th>
				<th>Edition</th>
				<th>Remove</th>
				
			</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			<tr>
				<!--<th><u>Paid With: </u><br/>
					<form id="sourceForm">
					Cash: <input type="radio" name="paidwith" value="cash" id="bcash" />
					Check: <input type="radio" name="paidwith" id="bcheck" value="check"  />
					Store Credit: <input type="radio" name="paidwith" value="credit" id="bcredit" />
					
					<div id="checkNumDiv" > Check Number: <input type="text" id="checkNum" name="checkNum" width="1%"/> </div>
					</form>
				</th>-->
				<!--<th><u>Paid With: </u><br/>
					<form id="sourceForm">
					Cash: <input type="radio" name="paidwith" value="cash" id="bcash"/>
					Check: <input type="radio" name="paidwith" value="check" id="bcheck"/>
					Store Credit: <input type="radio" name="paidwith" value="credit" id="bcredit"/>
					
					<div id="checkNumDiv"> Check Number: <input type="text" id="checkNum" name="checkNum" width="1%"/> </div>
				</form></th>
				<th colspan=1 align="right">Grand Total</th>
				<th id="grandtotal"></th>
				<th id="grandquantity"></th>
			</tr>
			</tfoot>
			</table>

			<input type="button" id="process" value="Process Buyback" />

			<div id="recentOrder"></div>
			</div><!-- end of tab 1 -->
			<!--<div id="noAmz"><h3>Amazon is down, you will not be able to process games, videos, or music at this time.</h3></div>
	<div id="tabs-2"><!--Video Games-->
				<!--<form id="buybackFormVideoGames">
				<table height="220"><h3>Platform and UPC are required for processing.</h3>
				<tr>
					<td><label>Platform</label></td>
					<td>
						<select id="platform" name="platform">
				     		<option value=""></option>
				     			<option value="1">Wii</option>
							<option value="2">Xbox 360</option>
							<option value="3">Playstation</option>
							<option value="4">Sega</option>
							<option value="5">Nintendo</option>
						</select>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><label>UPC</label></td>
					<td><input type="text" id="upc" name="upc" /></td>
					<td></td>
					<td rowspan=7><a id="videodetailURL" href="#" target="_blank"><img id="VideoCover" src="../images/imgNotFound.gif" height="200px" /></a></td>
					<td rowspan=7><input type="button" id="case" name="case" value="Missing Case" />
						
						<br/><br/><input type="button" id="Modscratch" name="Modscratch" value="Moderate Scratches" />
						<br/><br/><input type="button" id="isHeavscratch" name="isHeavscratch" value="Heavy Scratches" />
						<br/><br/><input type="button" id="isMissingInstructions" name="isMissingInstructions" value="Missing Instructions" />
						<br /><br/><input type="button" id="poor" name="poor" value="Poor Condition" />
					</td>
					
				</tr>
				
				<tr>
					<td><label for="quantity" class="label">Quantity</label></td>
					<td><input type="text" id="videoquantity" name="videoquantity" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label for="payPrice" class="label">Price to Pay</label></td>
					<td><input type="text" id="videopayPrice" name="videopayPrice"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Rating</label></td>
					<td><input type="text" id="videoedition" name="videoedition" readonly="readonly"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Title</label></td>
					<td><input type="text" id="videotitle" name="videotitle" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Sales Rank</label></td>
					<td><input type="text" id="videosalesRank" name="videosalesRank" readonly="readonly" /></td>
					<td></td>
				</tr>
				
				
				<tr>
					<td></td><td><input type="button" id="videobuy" value="Buy Video Game" /></td><td></td>
		</table>
		</form>

			<div id="videoloading">
			<img src='../images/loading.gif' />
			</div>

			<!-- TALLY TABLE -->
			<!-- <table class="tablesorter" id="videogametally" cellspacing="1">
			<thead>
			<tr>
				<th>UPC</th>
				<th>Title</th>
				<th>Price Paid</th>
				<th>Quantity</th>
				<th>Original Price</th>
				<th>Remove</th>
				
			</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			<tr>
				<th><u>Paid With: </u><br/>
					<form id="vsourceForm">
					Cash: <input type="radio" name="videopaidWith" value="cash" id="vcash"/>
					Check: <input type="radio" name="videopaidWith" value="check" id="vcheck"/>
					Store Credit: <input type="radio" name="videopaidWith" value="credit" id="vcredit"/>
					
					<div id="videocheckNumDiv"> Check Number: <input type="text" id="videocheckNum" name="vcheckNum" /> </div>
					</form>
				</th>
				<th colspan=1 align="right">Grand Total</th>
				<th id="videogamegrandtotal"></th>
				<th id="videogamegrandquantity"></th>
			</tr>
			</tfoot>
			</table>

			<input type="button" id="videoprocess" value="Process Video Buyback" />

			<div id="videorecentOrder"></div>	
				
			</div><!-- end of tab 2 -->
			
	<!--<div id="tabs-3"><!--Movies -->
			
			<!--<form id="buybackFormMovies">
				<table height="220">
				<tr>
					<td><label>UPC</label></td>
					<td><input type="text" id="Movieupc" name="Movieupc" /></td>
					<td></td>
					<td rowspan=7><a id="MoviedetailURL" href="#" target="_blank"><img id="MovieCover" src="../images/imgNotFound.gif" height="200px" /></a></td>
					<td rowspan=7><input type="button" id="Moviecase" name="Moviecase" value="Missing Case" />
						
						<br/><br/><input type="button" id="MovieModscratch" name="MovieModscratch" value="Moderate Scratches" />
						<br/><br/><input type="button" id="MovieHeavscratch" name="MovieHeavscratch" value="Heavy Scratches" />
						<br/><br/><input type="button" id="MovieMissingInstructions" name="MovieMissingInstructions" value="Missing Instructions" />
						<br /><br/><input type="button" id="Moviepoor" name="Moviepoor" value="Poor Condition" />
					</td>
					
				</tr>
				
				<tr>
					<td><label for="quantity" class="label">Quantity</label></td>
					<td><input type="text" id="Moviequantity" name="Moviequantity" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label for="payPrice" class="label">Price to Pay</label></td>
					<td><input type="text" id="MoviepayPrice" name="MoviepayPrice"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Rating</label></td>
					<td><input type="text" id="Movierating" name="Movierating" readonly="readonly"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Title</label></td>
					<td><input type="text" id="Movietitle" name="Movietitle" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Sales Rank</label></td>
					<td><input type="text" id="MoviesalesRank" name="MoviesalesRank" readonly="readonly" /></td>
					<td></td>
				</tr>
				
				
				<tr>
					<td></td><td><input type="button" id="Moviebuy" value="Buy Movie" /></td><td></td>
		</table>
		</form>

			<div id="moviesloading">
			<img src='../images/loading.gif' />
			</div>

			<!-- TALLY TABLE -->
			<!-- <table class="tablesorter" id="Movietally" cellspacing="1">
			<thead>
			<tr>
				<th>UPC</th>
				<th>Title</th>
				<th>Price Paid</th>
				<th>Quantity</th>
				<th>Original Price</th>
				<th>Remove</th>
				
			</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			<tr>
				<th><u>Paid With: </u><br/>
					<form id="moviesourceForm">
					Cash: <input type="radio" name="moviepaidWith" value="cash" id="moviecash"/>
					Check: <input type="radio" name="moviepaidWith" value="check" id="moviecheck"/>
					Store Credit: <input type="radio" name="moviepaidWith" value="credit" id="moviecredit"/>
					
					<div id="moviecheckNumDiv"> Check Number: <input type="text" id="moviecheckNum"  name="moviecheckNum"/> </div>
				</form>
				</th>
				<th colspan=1 align="right">Grand Total</th>
				<th id="Moviegrandtotal"></th>
				<th id="Moviegrandquantity"></th>
			</tr>
			</tfoot>
			</table>

			<input type="button" id="Movieprocess" value="Process Movie Buyback" />

			<div id="MovierecentOrder"></div>
			</div><!-- end of tab 3 -->
			
	<!--<div id="tabs-4"><!-- Music -->
			
			<!--<form id="buybackFormMusic">
				<table height="220">
				<tr>
					<td><label>UPC</label></td>
					<td><input type="text" id="Musicupc" name="Musicupc" /></td>
					<td></td>
					<td rowspan=7><a id="MusicdetailURL" href="#" target="_blank"><img id="MusicCover" src="../images/imgNotFound.gif" height="200px" /></a></td>
					<td rowspan=7><input type="button" id="Musiccase" name="Musiccase" value="Missing Case" />
						
						<br/><br/><input type="button" id="MusicModscratch" name="MusicModscratch" value="Moderate Scratches" />
						<br/><br/><input type="button" id="MusicHeavscratch" name="MusicHeavscratch" value="Heavy Scratches" />
						<br/><br/><input type="button" id="MusicMissingInstructions" name="MusicMissingInstructions" value="Missing Instructions" />
						<br /><br/><input type="button" id="Musicpoor" name="Musicpoor" value="Poor Condition" />
					</td>
					
				</tr>
				
				<tr>
					<td><label for="quantity" class="label">Quantity</label></td>
					<td><input type="text" id="Musicquantity" name="Musicquantity" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label for="payPrice" class="label">Price to Pay</label></td>
					<td><input type="text" id="MusicpayPrice" name="MusicpayPrice"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Rating</label></td>
					<td><input type="text" id="Musicrating" name="Musicrating" readonly="readonly"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Title</label></td>
					<td><input type="text" id="Musictitle" name="Musictitle" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Sales Rank</label></td>
					<td><input type="text" id="MusicsalesRank" name="MusicsalesRank" readonly="readonly" /></td>
					<td></td>
				</tr>
				
				
				<tr>
					<td></td><td><input type="button" id="Musicbuy" value="Buy Music" /></td><td></td>
		</table>
		</form>

			<div id="musicloading">
			<img src='../images/loading.gif' />
			</div>

			<!-- TALLY TABLE -->
			 <!--<table class="tablesorter" id="Musictally" cellspacing="1">
			<thead>
			<tr>
				<th>UPC</th>
				<th>Title</th>
				<th>Price Paid</th>
				<th>Quantity</th>
				<th>Original Price</th>
				<th>Remove</th>
				
			</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			<tr>
				<th><u>Paid With: </u><br/>
					<form id="musicsourceForm">
					Cash: <input type="radio" name="musicpaidWith" value="cash" id="musiccash"/>
					Check: <input type="radio" name="musicpaidWith" value="check" id="musiccheck"/>
					Store Credit: <input type="radio" name="musicpaidWith" value="credit" id="musiccredit"/>
					
					<div id="musiccheckNumDiv"> Check Number: <input type="text" id="musiccheckNum" name="musiccheckNum"/> </div>
				</form>
				</th>
				<th colspan=1 align="right">Grand Total</th>
				<th id="Musicgrandtotal"></th>
				<th id="Musicgrandquantity"></th>
			</tr>
			</tfoot>
			</table>

			<input type="button" id="Musicprocess" value="Process Music Buyback" />

			<div id="MusicrecentOrder"></div>
			</div><!-- end of tab 4 -->
			
	<!--<div id="tabs-5"><!-- Board Games -->
			
			<!--<form id="buybackFormGames">
				<table height="220">
				<tr>
					<td><label>UPC</label></td>
					<td><input type="text" id="Gamesupc" name="Gamesupc" /></td>
					<td></td>
					<td rowspan=7><a id="GamesdetailURL" href="#" target="_blank"><img id="GamesCover" src="../images/imgNotFound.gif" height="200px" /></a></td>
					<td rowspan=7><input type="button" id="Gamescase" name="Gamescase" value="Missing Case" />
						
						<br/><br/><input type="button" id="GamesModscratch" name="GamesModscratch" value="Moderate Scratches" />
						<br/><br/><input type="button" id="GamesHeavscratch" name="GamesHeavscratch" value="Heavy Scratches" />
						<br/><br/><input type="button" id="GamesMissingInstructions" name="GamesMissingInstructions" value="Missing Instructions" />
						<br /><br/><input type="button" id="Gamespoor" name="Gamespoor" value="Poor Condition" />
					</td>
					
				</tr>
				
				<tr>
					<td><label for="quantity" class="label">Quantity</label></td>
					<td><input type="text" id="Gamesquantity" name="Gamesquantity" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label for="payPrice" class="label">Price to Pay</label></td>
					<td><input type="text" id="GamespayPrice" name="GamespayPrice"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Rating</label></td>
					<td><input type="text" id="Gamesrating" name="Gamesrating" readonly="readonly"/></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Title</label></td>
					<td><input type="text" id="Gamestitle" name="Gamestitle" /></td>
					<td></td>
				</tr>
				<tr>
					<td><label>Sales Rank</label></td>
					<td><input type="text" id="GamessalesRank" name="GamessalesRank" readonly="readonly" /></td>
					<td></td>
				</tr>
				
				
				<tr>
					<td></td><td><input type="button" id="Gamesbuy" value="Buy Game" /></td><td></td>
		</table>
		</form>

			<div id="gamesloading">
			<img src='../images/loading.gif' />
			</div>

			<!-- TALLY TABLE -->
			<!-- <table class="tablesorter" id="Gamestally" cellspacing="1">
			<thead>
			<tr>
				<th>UPC</th>
				<th>Title</th>
				<th>Price Paid</th>
				<th>Quantity</th>
				<th>Original Price</th>
				<th>Remove</th>
				
			</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			<tr>
				<th><u>Paid With: </u><br/>
					<form id="gsourceForm">
					Cash: <input type="radio" name="gamespaidWith" value="cash" id="gamescash"/>
					Check: <input type="radio" name="gamespaidWith" value="check" id="gamescheck"/>
					Store Credit: <input type="radio" name="gamespaidWith" value="credit" id="gamescredit"/>
					
					<div id="gamescheckNumDiv"> Check Number: <input type="text" id="gamescheckNum" name="gamescheckNum"/> </div>
				</form>
				</th>
				<th colspan=1 align="right">Grand Total</th>
				<th id="Gamesgrandtotal"></th>
				<th id="Gamesgrandquantity"></th>
			</tr>
			</tfoot>
			</table>

			<input type="button" id="Gamesprocess" value="Process Game Buyback" />

			<div id="GamesrecentOrder"></div>
			</div> <!--end of tab 5 -->
	<!--<div id="tabs-6"><!-- Forms tab -->
			<!--<div id="placement">
				<center><h2>All Fields with <span>*</span> are Required</h2></center>
			<form id="storeForm">
			<table>
				<tr><td><label >Select Your Store:<span>*</span></label><br/></td></tr>
				<tr><td><select id="store" name="store">
				     		<option value="">--Select Your Store</option>
				     		<?php
				     		/*$query = "select source_id, source from source where (buyer_type_id = 1 or buyer_type_id = 4) 
							and source_id != 303 and source_id !=123 and source_id !=17";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								$store = $row['source'];
	if ($store =="BKSTR") {
                $store = "Nashua";
        } elseif ($store =="MNC") {
                $store = "Manchester";
        } elseif ($store =="FRAM") {
                $store = "Framingham";
        } elseif ($store =="ANCONC") {
                $store = "Annie's Concord";
        } elseif ($store =="ANN") {
                $store = "Annie's Manchester";
        } elseif ($store =="ANWALT") {
                $store = "Annie's Waltham";
        } elseif ($store =="ANNSAMHERSTST") {
                $store = "Annie's Amherst St.";
        }elseif ($store =="AnSharon") {
                $store = "Annie's Sharon";
        }
								echo '<option value="' . $row['source_id'] . '" >' . $store . '</option>';
							}
							?>
						
				</select></td></tr>
				<tr><td>&nbsp;</td></tr>
				<tr><td><label >First Name:<span>*</span></label></td></tr>
				<tr><td><input type="text" id="fname" name="fname"/></td></tr>
				<tr><td><label >Last Name:<span>*</span></label></td></tr>
				<tr><td><input type="text" id="lname" name="lname"/></td></tr>
				<tr><td><label >Phone No.:<span>*</span></label></td></tr>
				<tr><td><input type="text" id="phone" name="phone"/></td></tr>
				<tr><td><label >Email:</label></td></tr>
				<tr><td><input type="text" id="email" name="email" /></td></tr>
					<tr><td>&nbsp;</td></tr>			
				
				
				<tr><td><label >Street Address:</label></td></tr>
				<tr><td><input type="text" id="street" name="street"/></td></tr>
				<tr><td><label>Apt # (optional)</label></td></tr>
				<tr><td><input type="text" id="apt"/></td></tr>
				<tr><td><label >City:</label></td></tr>
				<tr><td><input type="text" id="city" name="city"/></td></tr>
				<tr><td><label >State:</label></td></tr>
				<tr><td><input type="text" id="state" name="state"/></td></tr>
				<tr><td><label >Zip:</label></td></tr></tr>
				<tr><td><input type="text" id="zip" name="zip"/></td></tr>
					<tr><td>&nbsp;</td></tr>
					
				<tr><td><label >How did they Hear of us?<span>*</span></label></td></tr>
				<tr><td><select id="heard" name="heard">
					<option value=""></option>
					<?php
				     		$query = "select id, hear from heard order by hear asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['hear'] . '</option>';
							}
							?>
					
					</select></td></tr>
				<tr><td><label >No. of Items (do not put the words BOOK or BOOKS)<span>*</span></label></td></tr>
				<tr><td><input type="text" id="items" name="items"/></td></tr>
					
					
					
					
				
				
				
				<tr><td><label >Type of Books<span>*</span></label></td></tr>
				<tr><td><select id="type" name="type">
						<option value=""></option>
						<?php
				     		$query = "select id, type from types order by type desc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['type'] . '</option>';
							}
							?>
					</select></td></tr>
				<tr><td><label >Taken By:<span>*</span></label></td></tr>
				<tr><td> <select id="taken" name="taken">
						<option value=""></option>
						<?php
				     		$query = "select user_id, first_name, last_name from users where user_type_id =2 and active = 1 order by last_name asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['user_id'] . '" >' . $row['last_name'] . ' ' .$row['first_name']. '</option>';
							}
							?>
					</select></td></tr>
				<tr><td><label >Paid by:<span>*</span></label></td></tr>
				<tr><td><select id="paid" name="paid">
						<option value=""></option>
						<?php
				     		$query = "select id, type from cash order by type asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['type'] . '</option>';
							}
							?>
					</select></td></tr>
				<tr><td><label id="check_num">Check #</label></td></tr>
				<tr><td><input type="text" id="checks"/></td></tr>
					<tr><td>&nbsp;</td></tr>
					
				<tr><td><label >Date Quoted:<span>*</span></label></td></tr>
				<tr><td><input type="text" id="dateQuoted" name="dateQuoted"/></td></tr>
				<tr><td><label >Quoted By:<span>*</span></label></td></tr>
					<tr><td><select id="quoteBy" name="quoteBy" >
						<option value=""></option>
						<?php
				     		$query = "select user_id, first_name, last_name from users where user_type_id =2 and active = 1 order by last_name asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['user_id'] . '" >' . $row['last_name'] . ' ' .$row['first_name']. '</option>';
							}
							?>
					</select></td></tr>
				<tr><td><label id="qCash">Quoted Cash/ Check:(no $ sign)<span>*</span></label></td></tr>
					<tr><td><input type="text" id="cash" /></td></tr>
				<tr><td><label id="qCredit">Quoted Store Credit:<span>*</span></label></td></tr>	
					<tr><td><input type="text" id="credit"  /></td></tr>
					<tr><td>&nbsp;</td></tr>
				
				<tr><td><label >School:<span>*</span></label></td></tr>
				<tr><td><select id="college" name="college" style="width:250px;">
				     		<option value=""></option>
						<option value="300">Other</option>
				     		<?php
				     		$query = "select id, college from colleges order by college asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['college'] . '</option>';
							}
							?>
							
						</select></td></tr>
					
				<tr><td><label id="other">Please Enter College</label></td></tr>
					<tr><td><input type="text" id="cOther" /></td></tr>	
					
				
				<tr><td><label for="comments" class="label">Comments</label></td></tr>
					<tr><td><textarea name="comments" id="comments" cols="40" rows="5"></textarea></td></tr>
					
				<tr><td>&nbsp;</td></tr>	
					
					
				<tr><td><input type="button" id="formSubmit" value="Submit Form" /></td></tr>
				
				</table>
			</form>
			<h3><div id="storesuccess"></div></h3>
		</div>
		</div> <!-- end of tab 6 -->
	<div id="tabs-7"> 
		<table id="forms" class="tablesorter">
			<label for="stores">Store:</label>
						<select id="stores" name="stores" style="width: 175px" class="text ui-widget-content ui-corner-all">
						<option value="">--Select Your Store</option>
				     		<?php
				     		$query = "select source_id, source from source where (buyer_type_id = 1 or buyer_type_id = 4) 
							and source_id != 303 and source_id !=123 and source_id !=17";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								$store = $row['source'];
	if ($store =="BKSTR") {
                $store = "Nashua";
        } elseif ($store =="MNC") {
                $store = "Manchester";
        } elseif ($store =="FRAM") {
                $store = "Framingham";
        } elseif ($store =="ANCONC") {
                $store = "Annie's Concord";
        } elseif ($store =="ANN") {
                $store = "Annie's Manchester";
        } elseif ($store =="ANWALT") {
                $store = "Annie's Waltham";
        } elseif ($store =="ANNSAMHERSTST") {
                $store = "Annie's Amherst St.";
        }elseif ($store =="AnSharon") {
                $store = "Annie's Sharon";
        }
								echo '<option value="' . $row['source_id'] . '" >' . $store . '</option>';
							}
							?>
						</select>
			<thead>
				<tr>
					<th>Id</th>
					<th>Store</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Phone</th>
					<th>Email</th>
					<!--<th>Street</th>
					<th>Apt</th>
					<th>City</th>
					<th>State</th>
					<th>Zip</th>
					<th>Heard How?</th>
					<th># of Items</th>-->
					<th>Type</th>
					<th>Taken By:</th>
					<!--<th>Paid By:</th>
					<th>Check #</th>-->
					<th>Date Quoted</th>
					<th>Quoted By:</th>
					<!--<th>Quoted Cash/Check</th>
					<th>Quoted Credit</th>
					<th>School</th>
					<th>Comments</th>-->
					
				</tr>
			</thead>
			<tbody>
				
			</tbody>
			<tfoot>
			<tr>
					<th>Id</th>
					<th>Store</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Phone</th>
					<th>Email</th>
					<!--<th>Street</th>
					<th>Apt</th>
					<th>City</th>
					<th>State</th>
					<th>Zip</th>
					<th>Heard How?</th>
					<th># of Items</th>-->
					<th>Type</th>
					<th>Taken By:</th>
					<!--<th>Paid By:</th>
					<th>Check #</th>-->
					<th>Date Quoted</th>
					<th>Quoted By:</th>
					<!--<th>Quoted Cash/Check</th>
					<th>Quoted Credit</th>
					<th>School</th>
					<th>Comments</th>-->
					
				</tr>	
			</tfoot>
		</table>
		<div id="dialog-form" title="Edit Store Forms">
				<!--<p class="validateTips">All form fields are required except for Apt.</p>-->
					<form>
					<fieldset style="width: 350px;height: 550px;float:left;">
						<label for="dialogid" id="dialogId">Id</label>
						<input type="text" name="dialogid" id="dialogid" readonly="readonly" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogstore">Store:</label>
						<select id="dialogstore" name="dialogstore" style="width: 175px" class="text ui-widget-content ui-corner-all">
						<option value="">--Select Your Store</option>
				     		<?php
				     		$query = "select source_id, source from source where (buyer_type_id = 1 or buyer_type_id = 4) 
							and source_id != 303 and source_id !=123 and source_id !=17";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								$store = $row['source'];
	if ($store =="BKSTR") {
                $store = "Nashua";
        } elseif ($store =="MNC") {
                $store = "Manchester";
        } elseif ($store =="FRAM") {
                $store = "Framingham";
        } elseif ($store =="ANCONC") {
                $store = "Annie's Concord";
        } elseif ($store =="ANN") {
                $store = "Annie's Manchester";
        } elseif ($store =="ANWALT") {
                $store = "Annie's Waltham";
        } elseif ($store =="ANNSAMHERSTST") {
                $store = "Annie's Amherst St.";
        }elseif ($store =="AnSharon") {
                $store = "Annie's Sharon";
        }
								echo '<option value="' . $row['source_id'] . '" >' . $store . '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogfname">First Name:</label>
						<input type="text" name="dialogfname" id="dialogfname"  class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialoglname">Last Name:</label>
						<input type="text" name="dialoglname" id="dialoglname" class="text ui-widget-content ui-corner-all" /><br /><br />
						
						<label for="dialogphone">Phone No.:</label>
						<input type="text" name="dialogphone" id="dialogphone" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogemail">Email:</label>
						<input type="text" name="dialogemail" id="dialogemail" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogstreet">Street:</label>
						<input type="text" name="dialogstreet" id="dialogstreet" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogapt">Apt.:</label>
						<input type="text" name="dialogapt" id="dialogapt" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogCity">City:</label>
						<input type="text" name="dialogCity" id="dialogCity" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogState">State:</label>
						<input type="text" name="dialogState" id="dialogState"  class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogZip">Zip:</label>
						<input type = "text name="dialogZip" id="dialogZip" class="text ui-widget-content ui-corner-all" /><br /><br />
						<label for="dialogHeard">How did they hear of us?</label>
						<select id="dialogHeard" name="dialogHeard" style="width: 100px" class="text ui-widget-content ui-corner-all">
							<option value=""></option>
							<?php
							$query = "select id, hear from heard order by hear asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['hear'] . '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogItems">No. of Items:</label>
						<input type="text" id="dialogItems" name="dialogItems" class="text ui-widget-content ui-corner-all"/><br /><br />
							
					</fieldset>
					<fieldset style="width: 500px;height: 550px;float:left;"><br /><br />
						<label for="dialogType">Type:</label>
						<select id="dialogType" name="dialogType" style="width: 300px" class="text ui-widget-content ui-corner-all">
							<option value="">--Select Type of Items --</option>
						<?php
				     		$query = "select id, type from types order by type desc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['type'] . '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogTaken">Taken By:</label>
						<select id="dialogTaken" name="dialogTaken" style="width: 300px" class="text ui-widget-content ui-corner-all">
							<option value="">--Select Taken By:--</option>
						<?php
				     		$query = "select user_id, first_name, last_name from users where user_type_id =2 or user_type_id =4 and active = 1 order by last_name asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['user_id'] . '" >' . $row['last_name'] . ' ' .$row['first_name']. '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogPaid">Paid by:</label>
						<select id="dialogPaid" name="dialogPaid" style="width: 300px" class="text ui-widget-content ui-corner-all">
							<option value="">--Select Paid By:--</option>
						<?php
				     		$query = "select id, type from cash order by type asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['type'] . '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogCheck">Check No.:</label>
						<input type="text" id="dialogCheck" name="dialogCheck" class="text ui-widget-content ui-corner-all"/><br /><br />
						
						<label for="dialogQuote">Quoted By:</label>
						<select id="dialogQuote" name="dialogQuote" style="width: 300px" class="text ui-widget-content ui-corner-all">
							<option value="">--Select Quoted By--</option>
							<?php
				     		$query = "select user_id, first_name, last_name from users where user_type_id =2 or user_type_id =4 and active = 1 order by last_name asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['user_id'] . '" >' . $row['last_name'] . ' ' .$row['first_name']. '</option>';
							}
							?>
						</select><br /><br />
						<label for="dialogCash">Quoted Cash:</label>
						<input type="text" id="dialogCash" name="dialogCash" class="text ui-widget-content ui-corner-all"/><br /><br />
							
						<label for="dialogCredit">Quoted Credit:</label>
						<input type="text" id="dialogCredit" name="dialogCredit" class="text ui-widget-content ui-corner-all"/><br /><br />
							
						<label for="dialogSchool">School:</label>
						<select id="dialogSchool" name="dialogSchool" style="width: 300px" class="text ui-widget-content ui-corner-all">
							<option value="">--Select School--</option>
				     		<?php
				     		$query = "select id, college from colleges order by college asc";
							$result = $conn->query($query);
							while ($row = $result->fetch_assoc()) {
								echo '<option value="' . $row['id'] . '" >' . $row['college'] . '</option>';
							}*/
							?>
						</select><br /><br />
						<label for="dialogComments">Comments:</label>
						<textarea id="dialogComments" name="dialogComments" rows="2" cols="40"class="text ui-widget-content ui-corner-all"></textarea>
					</fieldset>		
						
					</form>
					<br/><br/>
					
				</div> 
	</div>	<!-- end of tab 7 -->
		</div><!-- end of tabs div -->
	</div>
</div>

