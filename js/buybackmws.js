$(document).ready(function() {
    // call the tablesorter plugin
    $("#tally").tablesorter();
    $("#gametally").tablesorter();
    $("#forms").tablesorter();
    $("#isbn").select();
    $("#supply").hide();
    $("#problem").hide();
    $("#checkNumDiv").hide();
    $("#videocheckNumDiv").hide();
    $("#moviecheckNumDiv").hide();
    $("#musiccheckNumDiv").hide();
    $("#gamescheckNumDiv").hide();
    $("#check_num").hide();
    $("#qCredit").hide();
    $("#credit").hide();
    $("#noAmz").hide();
    $("#check").hide();
     $('#other').hide();
    $('#cOther').hide();
    //$("#dialogid").hide();
   // $("#dialogId").hide();
    /*$('input[name="paidWith"]').filter("[value=check]").attr('checked', true);
    $('input[name="videopaidWith"]').filter("[value=cash]").attr('checked', true);
    $('input[name="moviepaidWith"]').filter("[value=cash]").attr('checked', true);
    $('input[name="musicpaidWith"]').filter("[value=cash]").attr('checked', true);
    $('input[name="gamespaidWith"]').filter("[value=cash]").attr('checked', true);*/
    var maxPriceAllowed = 0;
    var previousPriceOffered = 0;
    var maxQtyAllowed = 0;
     var maxQty =0;
     
    $("#dateQuoted").datepicker();
	$("#dateQuoted").datepicker( "option", "dateFormat", 'yy-mm-dd' );
    
$("#tabs").tabs({
		selected:0
	});
	
	//Validate rules for Buy button
	$("#buybackForm").validate({
		rules: {
			isbn: "required",
			quantity: "required",
			edition: "required",
			title: "required",
			
		},
  		errorPlacement: function(error, element) {
     		error.appendTo( element.parent("td").next("td") );
   		}
	});
    
	$("#sourceForm").validate({
	rules: {
	    paidwith: "required",
	    checkNum: "required"
	    },
	    messages: {
		checkNum: "You must enter a valid check number.",
		paidwith: "You must choose a payment method."
	    },
	    errorPlacement: function(error, element) {
		if ( element.is(":radio") || element.is(":checkbox")){
		    error.appendTo(element.parent());
		} else {
     		error.insertAfter(element);
   		}
	    }
	    });
	
	$("#vsourceForm").validate({
	rules: {
	    videopaidWith: "required",
	    vcheckNum: "required"
	    },
	    messages: {
		vcheckNum: "You must enter a valid check number.",
		videopaidWith: "You must choose a payment method."
	    },
	    errorPlacement: function(error, element) {
		if ( element.is(":radio") || element.is(":checkbox")){
		    error.appendTo(element.parent());
		} else {
     		error.insertAfter(element);
   		}
	    }
	    });
	
	$("#moviesourceForm").validate({
	rules: {
	    moviepaidWith: "required",
	    moviecheckNum: "required"
	    },
	    messages: {
		moviecheckNum: "You must enter a valid check number.",
		moviepaidWith: "You must choose a payment method."
	    },
	    errorPlacement: function(error, element) {
		if ( element.is(":radio") || element.is(":checkbox")){
		    error.appendTo(element.parent());
		} else {
     		error.insertAfter(element);
   		}
	    }
	    });
	
	$("#musicsourceForm").validate({
	rules: {
	    musicpaidWith: "required",
	    musiccheckNum: "required"
	    },
	    messages: {
		musiccheckNum: "You must enter a valid check number.",
		musicpaidWith: "You must choose a payment method."
	    },
	    errorPlacement: function(error, element) {
		if ( element.is(":radio") || element.is(":checkbox")){
		    error.appendTo(element.parent());
		} else {
     		error.insertAfter(element);
   		}
	    }
	    });
	
	$("#gsourceForm").validate({
	rules: {
	    gamespaidWith: "required",
	    gamescheckNum: "required"
	    },
	    messages: {
		gamescheckNum: "You must enter a valid check number.",
		gamespaidWith: "You must choose a payment method."
	    },
	    errorPlacement: function(error, element) {
		if ( element.is(":radio") || element.is(":checkbox")){
		    error.appendTo(element.parent());
		} else {
     		error.insertAfter(element);
   		}
	    }
	    });
    
	//Validate rules for Video Game Buy button
	$("#buybackFormVideoGames").validate({
		rules: {
			upc: "required",
			quantity: "required",
			platform: "required",
			title: "required"
		},
  		errorPlacement: function(error, element) {
     		error.appendTo( element.parent("td").next("td") );
   		}
	});
	
	//Validate rules for Movie Buy button
	$("#buybackFormMovies").validate({
		rules: {
			upc: "required",
			quantity: "required",
			//platform: "required",
			title: "required"
		},
  		errorPlacement: function(error, element) {
     		error.appendTo( element.parent("td").next("td") );
   		}
	});
	
	//Validate rules for Process Buyback button
	$("#tally").validate({
		rules: {
			price: "required"
		}
	});
	$("#videotally").validate({
		rules: {
			price: "required"
		}
	});
	
    $("#Movietally").validate({
		rules: {
			price: "required"
		}
	});
    $("#storeForm").validate({
	rules: {
	    store: "required",
	    fname: "required",
	    lname: "required",
	    
	    phone: {
		required: true,
		
	    },
	    /*street: "required",
	    city: "required",
	    state: "required",
	    zip: {
		required: true,
		rangelength:[5,10]
	    },*/
	    heard: "required",
	    paid: "required",
	    items: "required",
	    type: "required",
	    taken: "required",
	    dateQuoted: {
		date: true,
		required: true
	    },
	    quoteBy: "required",
	    college: "required"
	}, //end of rules
	messages: {
	   email: {
	    required: "Please enter an email address.",
	    email: "Please enter a valid email address."
	   }
	}, // end of messages
	errorPlacement: function(error, element) {
     		error.appendTo( element.parent());
   		}
    }); //  end of store form validate

	
	    $("#buy").click(function() {
		if($("#buybackForm").valid())
		{
	        if ($('#quantity').val()> maxQtyAllowed) {
    $('#quantity').val(maxQtyAllowed);
}
	        $("#tally").append('<tr><td name="tableISBN" class="tableISBN">'+$('#isbn').val()+
		'</td><td class="title">'+$('#title').val()+'</td><td><input type="text" id="price" class="price" value="'+$('#payPrice').val()+
		'" /></td><td><input type="text" class="quantity" value="'+$('#quantity').val()+
		'"/></td><td name="origPrice" class="origPrice" >'+$('#payPrice').val()+
		'</td><td name="edition" class="edition">'+$('#edition').val()+
		'</td><td><img class="delete" src="../images/delete.gif"/></td></tr>');
	        $("#tally").trigger("update");

			//calulate total price to pay
			var sum = 0;
			var qty = 0;
			$('#tally tbody tr').each(function() {
	    		sum += $(this).find('.price').val() * $(this).find('.quantity').val();
	    		qty += parseInt($(this).find('.quantity').val());
			});
			$('#grandtotal').html("$"+sum.toFixed(2));
			$('#grandquantity').html("Total Qty: "+qty);

			//clear the buyback form / supply table after clicking "buy"
			$('#isbn').val('');
			$('#quantity').val('');
			$('#payPrice').val('');
			$('#title').val('');
			$('#salesRank').val('');
			$('#edition').val('');
			$("#isbn").select();
			$("#supply").hide();
			$('#quantity').css('border', '');
			$('#payPrice').css('border', '');
			$('#payPrice').css('backgroundColor', '');
			$('#payPrice').css('color', '');
			$("#supply tbody tr").remove();
			$("#detailURL").attr("href","");
			$("#bookCover").attr("src","../images/imgNotFound.gif");
			$("#keeping").attr('checked', false);
			$('#isIE').attr("disabled", false);
        	$('#isAIE').attr("disabled", false);
        	$('#isModHighlight').attr("disabled", false);
        	$('#isHeavHighlight').attr("disabled", false);
        	$('#isMissingSupply').attr("disabled", false);
		$('#waterDamage').attr("disabled", false);
		}
    });

// to check if the changed price in the table is not greater than 10% of original price
   
       var tempPrice =0;
    var pnew =0;
    var origPrice = 0 ;
   $('#tally tr').live ('click', function(){
 
	 tempPrice = $(this).find('.price').val();
	 origPrice = $(this).find('.origPrice').html();
	  
   if(tempPrice <= (origPrice*1.1)){
   $('.price').change(function(){
	    
	    $current_element = $(this);
	    var value = $current_element.val(); 
	    if (value > (origPrice*1.1)){
		pnew = origPrice*1.1;
		$current_element.val(pnew.toFixed(2));
		alert("Your cannot raise the price by more than 10%");
		
	    }
	}); // end of change function
   } //end of original price check if statement
    }); // end of new price change function

    $('#quantity').change(function() {
    if ($('#quantity').val()> maxQtyAllowed) {
    $('#quantity').val(maxQtyAllowed);
}
});
        //remove row from tally table
	$('#tally td img.delete').live('click',function(){
		var answer = confirm("Delete Row?");
		if (answer){
			$(this).parent().parent().remove();
			$("#tally").trigger("update");
		}

		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#tally tbody tr').each(function() {
    		sum += $(this).find('.price').val() * $(this).find('.quantity').val();
    		qty += parseInt($(this).find('.quantity').val());
		});
		$('#grandtotal').html("$"+sum.toFixed(2));
		$('#grandquantity').html("Total Qty: "+qty);
    });


    $('.price').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#tally tbody tr').each(function() {
    		sum += $(this).find('.price').val() * $(this).find('.quantity').val();
    		qty += parseInt($(this).find('.quantity').val());
		});
		$('#grandtotal').html("$"+sum.toFixed(2));
		$('#grandquantity').html("Total Qty: "+qty);
	});
	$('.quantity').live('change', function() {
		var sum = 0;
		var qty = 0;
		$('#tally tbody tr').each(function() {
		    $.ajax({
				type: "POST",
				url: "../maxLimit.php",
				async:false,
				dataType: "json",
				data: ({isbn: parseInt($(this).find('.tableISBN').val())}),
				success: function(data){
				  maxQty = data.maxQtyLimit;
				}
		    });
		  if ((parseInt($(this).find('.quantity').val()))>maxQty) {
		    parseInt($(this).find('.quantity').val(maxQty));
		}		
		});
		
		$('#tally tbody tr').each(function() {
		  
    		sum += $(this).find('.price').val() * $(this).find('.quantity').val();
    		qty += parseInt($(this).find('.quantity').val());
		});
		
		$('#grandtotal').html("$"+sum.toFixed(2));
		$('#grandquantity').html("Total Qty: "+qty);	
	});


	$('#isbn').keydown(function () {
		//retrieve price to pay (and other data)
    	var isbn = $('#isbn').val();
    		ISBNusedNew();
			ISBN1013();
			$("#supply").hide(); //clear the supply table
			$("#supply tbody tr").remove(); //clear the supply table
			$("#problem").hide(); //clear the problem table
			$("#problem tbody tr").remove();
	    	$('#quantity').val('0'); //default quantity to 0
		$('#buy').attr('disabled', false).css('backgroundColor', '');
		$('#quantity').css('border', '');
		$('#payPrice').css('border', '');
		$('#payPrice').css('backgroundColor', '');
		$('#payPrice').css('color', '');
	    	//setTimeout(function() {$("#isbn").focus();},50); //focus on isbn after tab


			$.ajax({
				type: "POST",
				url: ' ../verifybuyback/title',
				async:false,
				dataType: "json",
				data: ({isbn: isbn }),
				success: function(data){
				   
	            	$('#title').val(data.title);
	            	$('#salesRank').val(data.salesRank);
	            	$('#edition').val(data.edition);
			$('#binding').val(data.binding);
	            	$("#detailURL").attr("href",data.DetailURL);
			$('#asin').val(data.asin);
			
					maxQtyAllowed = data.maxQtyLimit;

	            	if( parseInt(data.maxQtyLimit) > 0 ){
	            		$('#quantity').val('1');
	            	} else {
			    $('#buy').attr('disabled', true).css('backgroundColor', '#e5e5e5');
			    
			    $('#quantity').css('border', '1px solid red');
			    $('#payPrice').css('backgroundColor', '#cccccc');
			}
if ($('#quantity').val()> maxQtyAllowed) {
    $('#quantity').val(maxQtyAllowed);
}
				    doNotBuy = data.doNotBuy;
					if(doNotBuy){
					    	$('#payPrice').val(data.payPrice);//$('#payPrice').val('0');
						$('#payPrice').css('border', '1px solid red');
						$('#payPrice').css('backgroundColor', '#cccccc');
						$('#payPrice').css('color', '#ff0000');
						maxPriceAllowed = 0;
						previousPriceOffered = 0;
						//$('#buy').attr("disabled", true); // disable the buy button if the book should not be bought
						message = data.message;
						if (message != null){ 
						alert(message); //puts the message from the database into an alert so the book will not be bought
						note = "<tr><td>"+message+"</td></tr>";
						$("#problem").show();
	   					$("#problem > tbody").append(note);
						}//}
					}else{
						$('#payPrice').val(data.payPrice);
						maxPriceAllowed = data.payPrice;
						previousPriceOffered = data.payPrice;
					}

	            	if(data.ImageURL){
	            		$("#bookCover").attr("src",data.ImageURL);
	            	}else{
	            		$("#bookCover").attr("src","../images/imgNotFound.gif");
	            	}
	
			
			
	            	//Check Supply Algorithm
	            	var tableData = '';
			var popup = '';
	            	$.each(data.supply, function(preindex, supplygroup) {
	            		$.each(supplygroup, function(index, supply) {
							switch(index)
							{
								case 0:
		  							if((supply && preindex==0) || (supply && preindex==1)){ 
		  								popup = "CD is required";
										tableData = "<tr><td>CD</td></tr>";}
		  							/*else if(supply && preindex==1){
		  								popup = '';
										popup += "CD ";
										tableData += "<tr><td>CD</td></tr>";}*/
		  						break;
								case 1:
		  							if(supply && preindex==0){
		  								popup += "MathLab is required";
										tableData += "<tr><td>MathLab</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "MathLab is required";
										tableData += "<tr><td>MathLab</td></tr>";}
		  						break;
		  						case 2:
		  							if(supply && preindex==0){
		  								popup += "Access Card. If the code number is visible please hit the missing supply button.";
										tableData += "<tr><td>Access Card. If the code number is visible please hit the missing supply button.</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Access Card. If the code number is visible please hit the missing supply button.";
										tableData += "<tr><td>Access Card. If the code number is visible please hit the missing supply button.</td></tr>";}
		  						break;
		  						case 3:
		  							if(supply && preindex==0){
		  								popup += "Access Code. If the code number is visible please hit the missing supply button.";
										tableData += "<tr><td>Access Code. If the code number is visible please hit the missing supply button.</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Access Code. If the code number is visible please hit the missing supply button.";
										tableData += "<tr><td>Access Caode. If the code number is visible please hit the missing supply button.</td></tr>";}
		  						break;
		  						case 4:
		  							if(supply && preindex==0){
		  								popup += "Pass Card is required";
										tableData += "<tr><td>Pass Card</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Pass Card is required";
										tableData += "<tr><td>Pass Card</td></tr>";}
		  						break;
		  						case 5:
		  							if(supply && preindex==0){
		  								popup += "MyELT Card is required";
										tableData += "<tr><td>MyELT Card</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "MyELT Card is required";
										tableData += "<tr><td>MyELT Card</td></tr>";}
		  						break;
		  						case 6:
		  							if(supply && preindex==0){
		  								popup += "OLC Card is required";
										tableData += "<tr><td>OLC Card</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "OLC Card is required";
										tableData += "<tr><td>OLC Card</td></tr>";}
		  						break;
		  						case 7:
		  							if(supply && preindex==0){
		  								popup += "Infotrac is required";
										tableData += "<tr><td>Infotrac</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Infotrac is required";
										tableData += "<tr><td>Infotrac</td></tr>";}
		  						break;
		  						case 8:
		  							if(supply && preindex==0){
		  								popup += "Online Research Guide is required";
										tableData += "<tr><td>Online Research Guide</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Online Research Guide is required";
										tableData += "<tr><td>Online Research Guide</td></tr>";}
		  						break;
								case 9:
		  							if(supply && preindex==0){
		  								popup += "Passcode is required";
										tableData += "<tr><td>Passcode</td></tr>";}
		  							if(supply && preindex==1){
										//popup = '';
		  								popup += "Passcode is required";
										tableData += "<tr><td>Passcode</td></tr>";}
		  						break;
								case 10:
									if(supply && preindex==0) {
									    popup += "Custom Edition - DO NOT BUY!";
									    //tableData += "<tr><td>Passcode</td></tr>";
									}
									if(supply && preindex==1){
										popup += "Custom Edition - DO NOT BUY! ";
										//tableData += "<tr><td>Passcode</td></tr>";
									}
								default:
							}
						});
	   				});
	   				if((tableData) && ($('#payPrice').val() > 0 )){
					    alert ("Check Supply! " +popup+" ");
					    $("#supply").show();
	   					$("#supply > tbody").append(tableData);
					}else if(tableData){
						//if no price just show table
						$("#supply").show();
	   					$("#supply > tbody").append(tableData);
						}
						else if (popup) {
						    alert ("Caution: " + popup + " ");
						}
					
	   				 payPrice=data.payPrice;
					if(payPrice> 90) {
					    alert('Please call warehouse to verify price 603-880-6400 x 104 or 105');
					}
				
				} // end of success function
			});
			// disable the buy button if the quantity is zero
			if ($('#quantity').val() < 1) {
			 $('#buy').attr("disabled", true);
			}
			//focus on either isbn or edition
			setTimeout(function() {
			    if($('#payPrice').val() <= 0 ) {
					    $("#isbn").focus();
					} else {
					    $("#edition").focus();
					}
					}, 10);
    	
	});

	//process order and print barcodes
	$("#process").click(function() {
	    if ($("#sourceForm").valid()) {
		$('#tally tbody tr').each(function()
		{
			if(($(this).find('.price').val() >= 0) && ($(this).find('.quantity').val() > 0)){
				tableValidate = true;
			}else{
				tableValidate = false;
			}
		});

		//validating table first
		if(tableValidate)
		{
			var first = '';
			var second = '';
			var indexGlobal = 0;
			var title = '';
			var orderId = '';
			$('#tally tbody tr').each(function()
			{
				title = $(this).find('.title').html();
				title = title.substring(0,16);
				$.ajax({
					type: "POST",
					async:false,
					url: "finalProcess.php",
					dataType: "json",
					data: ({payPrice: $(this).find('.price').val(), isbn: $(this).find('.tableISBN').html(),
					       quantity: $(this).find('.quantity').val(), checkNum: $('#checkNum').val(),
					       origPrice: $(this).find('.origPrice').html(), edition: $(this).find('.edition').html(),
					       source: $('#source').val(), orderId: orderId}),
					success: function(data){
						sku = data.sku;
						orderId = data.orderId;
						var x=0;
						for (x=0;x<data.quantity;x++)
						{
							first += '$("#'+indexGlobal+'").barcode("'+sku+'", "code128",{barHeight:40, fontSize:30, output:"bmp"});';
							second += '<div class="wrapper"><img src="../images/temp.jpg" /><div id="'+indexGlobal+'"></div><div class="fullSKU">&nbsp &nbsp &nbsp '+sku+'</div><br/><div class="title">'+title+'</div></div><br/><div class="page-break"></div>';
						indexGlobal++;
							//second += '<center><img src="../images/temp.jpg" /><br/><div id="'+indexGlobal+'"></div>'+sku+'<br/>'+title+'</center><div class="page-break"></div>';
							//indexGlobal++;
						}
					}
				});
			});
			var barcode =  window.open('','BarcodeWindow','width=200');
			var html = '<html><head><title>Barcode</title><style type="text/css">'+
   			'.page-break{display:block; page-break-before:always; }'+
			'body{width: 2in;}'+
			'.wrapper{height: 1in;margin-left:10px;margin-top:5px;margin-right:5px;}'+
			'.fullSKU{float: left;}'+
			'.shortSKU{float: right;font-size:25px;font-weight:bold;}'+
			'.title{float: left;}'+
   			'</style><script type="text/javascript"src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script><script type="text/javascript" src="../barcode/jquery-barcode.js"></script><script>$(document).ready(function() {'+first+'window.print();window.close();});</script></head><body>'+second+'</body></html>';
			barcode.document.open();
			barcode.document.write(html);
			barcode.document.close();

			//clear all data and focus on isbn
			$("#tally tbody tr").remove();
			$('#checkNum').val('');
			$("#bcash").attr('checked', false);
			$("#bcheck").attr('checked', false);
			$("#bcredit").attr('checked', false);
			$('#isbn').val('');
			$('#quantity').val('');
			$('#payPrice').val('');
			$('#title').val('');
			$('#grandtotal').html('');
			$('#grandquantity').html('');
			$('#salesRank').val('');
			$('#edition').val('');
			$("#detailURL").attr("href","");
			$("#bookCover").attr("src","../images/imgNotFound.gif");
			$("#recentOrder").html("<h3>Last Order Number: " + orderId + "</h3>");
		}else{
			alert('Table is not filled in properly, look over the prices and quantities and try again!');
		}
	    }
    });

//Get Video Game info and process
    $('#upc').keydown(function (e) {
		//retrieve price to pay (and other data)
    	if (e.keyCode == 9 || e.keyCode == 13) {
    		
			//$("#supply").hide(); //clear the supply table
			//$("#supply tbody tr").remove(); //clear the supply table
	    	$('#videoquantity').val('0'); //default quantity to 0
		$('#videobuy').attr('disabled', false).css('backgroundColor', '');
		$('#videoquantity').css('border', '');
		$('#videopayPrice').css('border', '');
		$('#videopayPrice').css('backgroundColor', '');
		$('#videopayPrice').css('color', '');

		$.ajax({
				type: "POST",
				url: "VideoGamepriceProcessmws.php",
				async:false,
				dataType: "json",
				data: ({title: $('#upc').val(), platform: $('#platform').val()}),
				success: function(data){
				    
					//$('#payPrice').val(data.payPrice);
	            	$('#videotitle').val(data.title);
	            	$('#videosalesRank').val(data.salesRank);
	            	$('#videoedition').val(data.rating);
	            	$("#videodetailURL").attr("href",data.DetailURL);

					maxQtyAllowed = data.maxQtyLimit;

	            	if( parseInt(data.maxQtyLimit) > 0 ){
	            		$('#videoquantity').val('1');
	            	} else {
			    $('#videobuy').attr('disabled', true).css('backgroundColor', '#e5e5e5');
			    
			    $('#videoquantity').css('border', '1px solid red');
			    $('#videopayPrice').css('backgroundColor', '#cccccc');
			}

				    doNotBuy = data.doNotBuy;
					if(doNotBuy){
					    	$('#videopayPrice').val(data.payPrice);//$('#payPrice').val('0');
						$('#videopayPrice').css('border', '1px solid red');
						$('#videopayPrice').css('backgroundColor', '#cccccc');
						$('#videopayPrice').css('color', '#ff0000');
						maxPriceAllowed = 0;
						previousPriceOffered = 0;
						//$('#buy').attr("disabled", true); // disable the buy button if the book should not be bought
						message = data.message;
						if (message != null){ 
						alert(message); //puts the message from the database into an alert so the book will not be bought
						}
					}else{
						$('#videopayPrice').val(data.payPrice);
						//maxPriceAllowed = data.payPrice;
						//previousPriceOffered = data.payPrice;
					}

	            	if(data.ImageURL){
	            		$("#VideoCover").attr("src",data.ImageURL);
	            	}else{
	            		$("#VideoCover").attr("src","../images/imgNotFound.gif");
	            	}
				} // end of success function
		}); // end of ajax call
	}
    });// end of video games

//append new row to tally table
    $("#videobuy").click(function() {
	    /*if ($("#keeping").attr('checked')){
		$("#keeping").val("Yes");
	    } else {
		$("#keeping").val("No");
	    }*/	    
	    
		if($("#buybackFormVideoGames").valid())
		{
	        $("#videogametally").append('<tr><td name="tableUPC" class="tableUPC">'+$('#upc').val()+'</td><td class="videotitle">'+
	        $('#videotitle').val()+'</td><td><input type="text" id="videoprice" class="videoprice" value="'+$('#videopayPrice').val()+
		'" /></td><td><input type="text" class="videoquantity" value="'+$('#videoquantity').val()+
		'"/></td><td name="vorigPrice" class="vorigPrice" >'+$('#videopayPrice').val()+
		'</td><td><img class="delete" src="../images/delete.gif"/></td></tr>');
//<td><input type"checkbox" id="keeping" value="'+$('#keeping').val()+'"/></td>
	        $("#videogametally").trigger("update");

			//calulate total price to pay
			var sum = 0;
			var qty = 0;
			$('#videogametally tbody tr').each(function() {
	    		sum += $(this).find('.videoprice').val() * $(this).find('.videoquantity').val();
	    		qty += parseInt($(this).find('.videoquantity').val());
			});
			$('#grandtotal').html("$"+sum.toFixed(2));
			$('#grandquantity').html("Total Qty: "+qty);

			//clear the buyback form / supply table after clicking "buy"
			$('#upc').val('');
			$('#videoquantity').val('');
			$('#videopayPrice').val('');
			$('#videotitle').val('');
			$('#videosalesRank').val('');
			$('#platform').val('');
			$("#upc").select();
			//$("#supply").hide();
			$('#videoquantity').css('border', '');
			$('#videopayPrice').css('border', '');
			$('#videopayPrice').css('backgroundColor', '');
			$('#videopayPrice').css('color', '');
			//$("#supply tbody tr").remove();
			$("#videodetailURL").attr("href","");
			$("#VideoCover").attr("src","../images/imgNotFound.gif");
			//$("#keeping").attr('checked', false);
			$('#poor').attr("disabled", false);
        	$('#case').attr("disabled", false);
        	$('#Modscratch').attr("disabled", false);
        	$('#isHeavscratch').attr("disabled", false);
        	$('#isMissingInstructions').attr("disabled", false);
		}
    });


    //remove row from tally table
	$('#videogametally td img.delete').click(function() {
		var answer = confirm("Delete Row?");
		if (answer){
			$(this).parent().parent().remove();
			$("#videogametally").trigger("update");
		}

		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#videogametally tbody tr').each(function() {
    		sum += $(this).find('.videoprice').val() * $(this).find('.videoquantity').val();
    		qty += parseInt($(this).find('.videoquantity').val());
		});
		$('#videogamegrandtotal').html("$"+sum.toFixed(2));
		$('#videogamegrandquantity').html("Total Qty: "+qty);
    });


    $('.videoprice').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#videogametally tbody tr').each(function() {
    		sum += $(this).find('.videoprice').val() * $(this).find('.videoquantity').val();
    		qty += parseInt($(this).find('.videoquantity').val());
		});
		$('#videogamegrandtotal').html("$"+sum.toFixed(2));
		$('#videogamegrandquantity').html("Total Qty: "+qty);
	});
	$('.videoquantity').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#videogametally tbody tr').each(function() {
    		sum += $(this).find('.videoprice').val() * $(this).find('.videoquantity').val();
    		qty += parseInt($(this).find('.videoquantity').val());
		});
		$('#videogamegrandtotal').html("$"+sum.toFixed(2));
		$('#videogamegrandquantity').html("Total Qty: "+qty);
	});
	
// Video Game Process Buy
//process order and print barcodes
	$("#videoprocess").click(function() {
	    if ($("#vsourceForm").valid()) {
		$('#videogametally tbody tr').each(function()
		{
			if(($(this).find('.videoprice').val() >= 0) && ($(this).find('.videoquantity').val() > 0)){
				videotableValidate = true;
			}else{
				videotableValidate = false;
			}
		});

		//validating table first
		if(videotableValidate)
		{
			var first = '';
			var second = '';
			var indexGlobal = 0;
			var title = '';
			var orderId = '';
			$('#videogametally tbody tr').each(function()
			{
				title = $(this).find('.videotitle').html();
				title = title.substring(0,16);
				$.ajax({
					type: "POST",
					async:false,
					url: "finalProcess.php",
					dataType: "json",
					data: ({payPrice: $(this).find('.videoprice').val(), isbn: $(this).find('.tableUPC').html(),
					       quantity: $(this).find('.videoquantity').val(),
					       checkNum: $('#videocheckNum').val(), origPrice: $(this).find('.vorigPrice').html(), source: $('#source').val(),
					       orderId: orderId}),
					success: function(data){
						sku = data.sku;
						orderId = data.orderId;
						var x=0;
						for (x=0;x<data.quantity;x++)
						{
							first += '$("#'+indexGlobal+'").barcode("'+sku+'", "codabar",{barHeight:40, fontSize:30, output:"bmp"});';
							second += '<div class="wrapper"><img src="../images/temp.jpg" /><div id="'+indexGlobal+'"></div><div class="fullSKU">&nbsp &nbsp &nbsp '+sku+'</div><br/><div class="title">'+title+'</div></div><br/><div class="page-break"></div>';
						indexGlobal++;
							//second += '<center><img src="../images/temp.jpg" /><br/><div id="'+indexGlobal+'"></div>'+sku+'<br/>'+title+'</center><div class="page-break"></div>';
							//indexGlobal++;
						}
					}
				});
			});
			var barcode =  window.open('','BarcodeWindow','width=200');
			var html = '<html><head><title>Barcode</title><style type="text/css">'+
   			'.page-break{display:block; page-break-before:always; }'+
			'body{width: 2in;}'+
			'.wrapper{height: 1in;margin-left:10px;margin-top:5px;margin-right:5px;}'+
			'.fullSKU{float: left;}'+
			'.shortSKU{float: right;font-size:25px;font-weight:bold;}'+
			'.title{float: left;}'+
   			'</style><script type="text/javascript"src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script><script type="text/javascript" src="../barcode/jquery-barcode.js"></script><script>$(document).ready(function() {'+first+'window.print();window.close();});</script></head><body>'+second+'</body></html>';
			barcode.document.open();
			barcode.document.write(html);
			barcode.document.close();

			//clear all data and focus on isbn
			$("#videogametally tbody tr").remove();
			$('#videocheckNum').val('');
			$("#vcash").attr('checked', false);
			$("#vcheck").attr('checked', false);
			$("#vcredit").attr('checked', false);
			$('#upc').val('');
			$('#videoquantity').val('');
			$('#videopayPrice').val('');
			$('#videotitle').val('');
			$('#videogamegrandtotal').html('');
			$('#videogamegrandquantity').html('');
			$('#videosalesRank').val('');
			$('#videoedition').val('');
			$("#videodetailURL").attr("href","");
			$("#videobookCover").attr("src","../images/imgNotFound.gif");
			$("#videorecentOrder").html("<h3>Last Order Number: " + orderId + "</h3>");
		}else{
			alert('Table is not filled in properly, look over the prices and quantities and try again!');
		}
	    }
    }); // end of Video Game Buy section

//Get movie info and process
    $('#Movieupc').keydown(function (e) {
		//retrieve price to pay (and other data)
    	if (e.keyCode == 9 || e.keyCode == 13) {
    		
			//$("#supply").hide(); //clear the supply table
			//$("#supply tbody tr").remove(); //clear the supply table
	    	$('#Moviequantity').val('0'); //default quantity to 0
		$('#Moviebuy').attr('disabled', false).css('backgroundColor', '');
		$('#Moviequantity').css('border', '');
		$('#MoviepayPrice').css('border', '');
		$('#MoviepayPrice').css('backgroundColor', '');
		$('#MoviepayPrice').css('color', '');

		$.ajax({
				type: "POST",
				url: "MoviepriceProcessmws.php",
				async:false,
				dataType: "json",
				data: ({title: $('#Movieupc').val()}),
				success: function(data){
				    
					//$('#payPrice').val(data.payPrice);
	            	$('#Movietitle').val(data.title);
	            	$('#MoviesalesRank').val(data.salesRank);
	            	$('#Movierating').val(data.rating);
	            	$("#MoviedetailURL").attr("href",data.DetailURL);

					maxQtyAllowed = data.maxQtyLimit;

	            	if( parseInt(data.maxQtyLimit) > 0 ){
	            		$('#Moviequantity').val('1');
	            	} else {
			    $('#Moviebuy').attr('disabled', true).css('backgroundColor', '#e5e5e5');
			    
			    $('#Moviequantity').css('border', '1px solid red');
			    $('#MoviepayPrice').css('backgroundColor', '#cccccc');
			}

				    doNotBuy = data.doNotBuy;
					if(doNotBuy){
					    	$('#MoviepayPrice').val(data.payPrice);//$('#payPrice').val('0');
						$('#MoviepayPrice').css('border', '1px solid red');
						$('#MoviepayPrice').css('backgroundColor', '#cccccc');
						$('#MoviepayPrice').css('color', '#ff0000');
						maxPriceAllowed = 0;
						previousPriceOffered = 0;
						//$('#buy').attr("disabled", true); // disable the buy button if the book should not be bought
						message = data.message;
						if (message != null){ 
						alert(message); //puts the message from the database into an alert so the book will not be bought
						}//}
					}else{
						$('#MoviepayPrice').val(data.payPrice);
						//maxPriceAllowed = data.payPrice;
						//previousPriceOffered = data.payPrice;
					}

	            	if(data.ImageURL){
	            		$("#MovieCover").attr("src",data.ImageURL);
	            	}else{
	            		$("#MovieCover").attr("src","../images/imgNotFound.gif");
	            	}
				} // end of success function
		}); // end of ajax call
	}
    });// end of movie amazon call info

//append new row to tally table
    $("#Moviebuy").click(function() {
	    /*if ($("#keeping").attr('checked')){
		$("#keeping").val("Yes");
	    } else {
		$("#keeping").val("No");
	    }*/	    
	    
		if($("#buybackFormMovies").valid())
		{
	        $("#Movietally").append('<tr><td name="tableUPC" class="MovieUPC">'+$('#Movieupc').val()+'</td><td class="Movietitle">'+
	        $('#Movietitle').val()+'</td><td><input type="text" id="Movieprice" class="Movieprice" value="'+$('#MoviepayPrice').val()+
		'" /></td><td><input type="text" class="Moviequantity" value="'+$('#Moviequantity').val()+
		'"/></td><td name="morigPrice" class="morigPrice" >'+$('#MoviepayPrice').val()+
		'</td><td><img class="delete" src="../images/delete.gif"/></td></tr>');
//<td><input type"checkbox" id="keeping" value="'+$('#keeping').val()+'"/></td>
	        $("#Movietally").trigger("update");

			//calulate total price to pay
			var sum = 0;
			var qty = 0;
			$('#Movietally tbody tr').each(function() {
	    		sum += $(this).find('.Movieprice').val() * $(this).find('.Moviequantity').val();
	    		qty += parseInt($(this).find('.Moviequantity').val());
			});
			$('#moviegrandtotal').html("$"+sum.toFixed(2));
			$('#moviegrandquantity').html("Total Qty: "+qty);

			//clear the buyback form / supply table after clicking "buy"
			$('#Movieupc').val('');
			$('#Moviequantity').val('');
			$('#MoviepayPrice').val('');
			$('#Movietitle').val('');
			$('#MoviesalesRank').val('');
			$('#Movierating').val('');
			$("#Movieupc").select();
			//$("#supply").hide();
			$('#Moviequantity').css('border', '');
			$('#MoviepayPrice').css('border', '');
			$('#MoviepayPrice').css('backgroundColor', '');
			$('#MoviepayPrice').css('color', '');
			//$("#supply tbody tr").remove();
			$("#MoviedetailURL").attr("href","");
			$("#MovieCover").attr("src","../images/imgNotFound.gif");
			//$("#keeping").attr('checked', false);
			$('#Moviepoor').attr("disabled", false);
        	$('#Moviecase').attr("disabled", false);
        	$('#MovieModscratch').attr("disabled", false);
        	$('#MovieHeavscratch').attr("disabled", false);
        	$('#MovieMissingInstructions').attr("disabled", false);
		}
    });


    //remove row from tally table
	$('#Movietally td img.delete').click(function() {
		var answer = confirm("Delete Row?");
		if (answer){
			$(this).parent().parent().remove();
			$("#Movietally").trigger("update");
		}

		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Movietally tbody tr').each(function() {
    		sum += $(this).find('.Movieprice').val() * $(this).find('.Moviequantity').val();
    		qty += parseInt($(this).find('.Moviequantity').val());
		});
		$('#Moviegrandtotal').html("$"+sum.toFixed(2));
		$('#Moviegrandquantity').html("Total Qty: "+qty);
    });


    $('.Movieprice').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Movietally tbody tr').each(function() {
    		sum += $(this).find('.Movieprice').val() * $(this).find('.Moviequantity').val();
    		qty += parseInt($(this).find('.Moviequantity').val());
		});
		$('#Moviegrandtotal').html("$"+sum.toFixed(2));
		$('#Moviegrandquantity').html("Total Qty: "+qty);
	});
	$('.Moviequantity').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Movietally tbody tr').each(function() {
    		sum += $(this).find('.Movieprice').val() * $(this).find('.Moviequantity').val();
    		qty += parseInt($(this).find('.Moviequantity').val());
		});
		$('#Moviegrandtotal').html("$"+sum.toFixed(2));
		$('#Moviegrandquantity').html("Total Qty: "+qty);
	});
	
// Movie Process Buy
//process order and print barcodes
	$("#Movieprocess").click(function() {
	    if ($("#moviesourceForm").valid()) {
		$('#Movietally tbody tr').each(function()
		{
			if(($(this).find('.Movieprice').val() >= 0) && ($(this).find('.Moviequantity').val() > 0)){
				MovietableValidate = true;
			}else{
				MovietableValidate = false;
			}
		});

		//validating table first
		if(MovietableValidate)
		{
			var first = '';
			var second = '';
			var indexGlobal = 0;
			var title = '';
			var orderId = '';
			$('#Movietally tbody tr').each(function()
			{
				title = $(this).find('.Movietitle').html();
				title = title.substring(0,16);
				$.ajax({
					type: "POST",
					async:false,
					url: "finalProcess.php",
					dataType: "json",
					data: ({payPrice: $(this).find('.Movieprice').val(), isbn: $(this).find('.MovieUPC').html(),
					       quantity: $(this).find('.Moviequantity').val(),
					       checkNum: $('#moviecheckNum').val(), origPrice: $(this).find('.morigPrice').html(), source: $('#source').val(),
					       orderId: orderId}),
					success: function(data){
						sku = data.sku;
						orderId = data.orderId;
						var x=0;
						for (x=0;x<data.quantity;x++)
						{
							first += '$("#'+indexGlobal+'").barcode("'+sku+'", "codabar",{barHeight:40, fontSize:30, output:"bmp"});';
							second += '<div class="wrapper"><img src="../images/temp.jpg" /><div id="'+indexGlobal+'"></div><div class="fullSKU">&nbsp &nbsp &nbsp '+sku+'</div><br/><div class="title">'+title+'</div></div><br/><div class="page-break"></div>';
						indexGlobal++;
							//second += '<center><img src="../images/temp.jpg" /><br/><div id="'+indexGlobal+'"></div>'+sku+'<br/>'+title+'</center><div class="page-break"></div>';
							//indexGlobal++;
						}
					}
				});
			});
			var barcode =  window.open('','BarcodeWindow','width=200');
			var html = '<html><head><title>Barcode</title><style type="text/css">'+
   			'.page-break{display:block; page-break-before:always; }'+
			'body{width: 2in;}'+
			'.wrapper{height: 1in;margin-left:10px;margin-top:5px;margin-right:5px;}'+
			'.fullSKU{float: left;}'+
			'.shortSKU{float: right;font-size:25px;font-weight:bold;}'+
			'.title{float: left;}'+
   			'</style><script type="text/javascript"src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script><script type="text/javascript" src="../barcode/jquery-barcode.js"></script><script>$(document).ready(function() {'+first+'window.print();window.close();});</script></head><body>'+second+'</body></html>';
			barcode.document.open();
			barcode.document.write(html);
			barcode.document.close();

			//clear all data and focus on isbn
			$("#Movietally tbody tr").remove();
			$('#moviecheckNum').val('');
			$("#moviecash").attr('checked', false);
			$("#moviecheck").attr('checked', false);
			$("#moviecredit").attr('checked', false);
			$('#Movieupc').val('');
			$('#Moviequantity').val('');
			$('#MoviepayPrice').val('');
			$('#Movietitle').val('');
			$('#Moviegrandtotal').html('');
			$('#Moviegrandquantity').html('');
			$('#MoviesalesRank').val('');
			$('#Movierating').val('');
			$("#MoviedetailURL").attr("href","");
			$("#MoviebookCover").attr("src","../images/imgNotFound.gif");
			$("#MovierecentOrder").html("<h3>Last Order Number: " + orderId + "</h3>");
		}else{
			alert('Table is not filled in properly, look over the prices and quantities and try again!');
		}
	    }
    }); // end of Movie Buy section
	
//Get music info and process
    $('#Musicupc').keydown(function (e) {
		//retrieve price to pay (and other data)
    	if (e.keyCode == 9 || e.keyCode == 13) {
    		
			//$("#supply").hide(); //clear the supply table
			//$("#supply tbody tr").remove(); //clear the supply table
	    	$('#Musicquantity').val('0'); //default quantity to 0
		$('#Musicbuy').attr('disabled', false).css('backgroundColor', '');
		$('#Musicquantity').css('border', '');
		$('#MusicpayPrice').css('border', '');
		$('#MusicpayPrice').css('backgroundColor', '');
		$('#MusicpayPrice').css('color', '');

		$.ajax({
				type: "POST",
				url: "MusicpriceProcessmws.php",
				async:false,
				dataType: "json",
				data: ({title: $('#Musicupc').val()}),
				success: function(data){
				    
					//$('#payPrice').val(data.payPrice);
	            	$('#Musictitle').val(data.title);
	            	$('#MusicsalesRank').val(data.salesRank);
	            	$('#Musicedition').val(data.rating);
	            	$("#MusicdetailURL").attr("href",data.DetailURL);

					maxQtyAllowed = data.maxQtyLimit;

	            	if( parseInt(data.maxQtyLimit) > 0 ){
	            		$('#Musicquantity').val('1');
	            	} else {
			    $('#Musicbuy').attr('disabled', true).css('backgroundColor', '#e5e5e5');
			    
			    $('#Musicquantity').css('border', '1px solid red');
			    $('#MusicpayPrice').css('backgroundColor', '#cccccc');
			}

				    doNotBuy = data.doNotBuy;
					if(doNotBuy){
					    	$('#MusicpayPrice').val(data.payPrice);//$('#payPrice').val('0');
						$('#MusicpayPrice').css('border', '1px solid red');
						$('#MusicpayPrice').css('backgroundColor', '#cccccc');
						$('#MusicpayPrice').css('color', '#ff0000');
						maxPriceAllowed = 0;
						previousPriceOffered = 0;
						//$('#buy').attr("disabled", true); // disable the buy button if the book should not be bought
						message = data.message;
						if (message != null){ 
						alert(message); //puts the message from the database into an alert so the book will not be bought
						}//}
					}else{
						$('#MusicpayPrice').val(data.payPrice);
						//maxPriceAllowed = data.payPrice;
						//previousPriceOffered = data.payPrice;
					}

	            	if(data.ImageURL){
	            		$("#MusicCover").attr("src",data.ImageURL);
	            	}else{
	            		$("#MusicCover").attr("src","../images/imgNotFound.gif");
	            	}
				} // end of success function
		}); // end of ajax call
	}
    });// end of video games

//append new row to tally table
    $("#Musicbuy").click(function() {
	    /*if ($("#keeping").attr('checked')){
		$("#keeping").val("Yes");
	    } else {
		$("#keeping").val("No");
	    }*/	    
	    
		if($("#buybackFormMusic").valid())
		{
	        $("#Musictally").append('<tr><td name="tableUPC" class="MusicUPC">'+$('#Musicupc').val()+'</td><td class="Musictitle">'+
	        $('#Musictitle').val()+'</td><td><input type="text" id="Musicprice" class="Musicprice" value="'+$('#MusicpayPrice').val()+
		'" /></td><td><input type="text" class="Musicquantity" value="'+$('#Musicquantity').val()+
		'"/></td><td name="MusicorigPrice" class="MusicorigPrice" >'+$('#MusicpayPrice').val()+
		'</td><td><img class="delete" src="../images/delete.gif"/></td></tr>');
//<td><input type"checkbox" id="keeping" value="'+$('#keeping').val()+'"/></td>
	        $("#Musictally").trigger("update");

			//calulate total price to pay
			var sum = 0;
			var qty = 0;
			$('#Musictally tbody tr').each(function() {
	    		sum += $(this).find('.Musicprice').val() * $(this).find('.Musicquantity').val();
	    		qty += parseInt($(this).find('.Musicquantity').val());
			});
			$('#Musicgrandtotal').html("$"+sum.toFixed(2));
			$('#Musicgrandquantity').html("Total Qty: "+qty);

			//clear the buyback form / supply table after clicking "buy"
			$('#Musicupc').val('');
			$('#Musicquantity').val('');
			$('#MusicpayPrice').val('');
			$('#Musictitle').val('');
			$('#MusicsalesRank').val('');
			//$('#platform').val('');
			$("#Musicupc").select();
			//$("#supply").hide();
			$('#Musicquantity').css('border', '');
			$('#MusicpayPrice').css('border', '');
			$('#MusicpayPrice').css('backgroundColor', '');
			$('#MusicpayPrice').css('color', '');
			//$("#supply tbody tr").remove();
			$("#MusicdetailURL").attr("href","");
			$("#MusicCover").attr("src","../images/imgNotFound.gif");
			//$("#keeping").attr('checked', false);
			$('#Musicpoor').attr("disabled", false);
        	$('#Musiccase').attr("disabled", false);
        	$('#MusicModscratch').attr("disabled", false);
        	$('#MusicHeavscratch').attr("disabled", false);
        	$('#MusicMissingInstructions').attr("disabled", false);
		}
    });


    //remove row from tally table
	$('#Musictally td img.delete').click(function() {
		var answer = confirm("Delete Row?");
		if (answer){
			$(this).parent().parent().remove();
			$("#Musictally").trigger("update");
		}

		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Musictally tbody tr').each(function() {
    		sum += $(this).find('.Musicprice').val() * $(this).find('.Musicquantity').val();
    		qty += parseInt($(this).find('.Musicquantity').val());
		});
		$('#Musicgrandtotal').html("$"+sum.toFixed(2));
		$('#Musicgrandquantity').html("Total Qty: "+qty);
    });


    $('.Musicprice').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Musictally tbody tr').each(function() {
    		sum += $(this).find('.Musicprice').val() * $(this).find('.Musicquantity').val();
    		qty += parseInt($(this).find('.Musicquantity').val());
		});
		$('#Musicgrandtotal').html("$"+sum.toFixed(2));
		$('#Musicgrandquantity').html("Total Qty: "+qty);
	});
	$('.Musicquantity').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Musictally tbody tr').each(function() {
    		sum += $(this).find('.Musicprice').val() * $(this).find('.Musicquantity').val();
    		qty += parseInt($(this).find('.Musicquantity').val());
		});
		$('#Musicgrandtotal').html("$"+sum.toFixed(2));
		$('#Musicgrandquantity').html("Total Qty: "+qty);
	});
	
// Video Game Process Buy
//process order and print barcodes
	$("#Musicprocess").click(function() {
	    if ($("#musicsourceForm").valid()) {
		$('#Musictally tbody tr').each(function()
		{
			if(($(this).find('.Musicprice').val() >= 0) && ($(this).find('.Musicquantity').val() > 0)){
				MusictableValidate = true;
			}else{
				MusictableValidate = false;
			}
		});

		//validating table first
		if(MusictableValidate)
		{
			var first = '';
			var second = '';
			var indexGlobal = 0;
			var title = '';
			var orderId = '';
			$('#Musictally tbody tr').each(function()
			{
				title = $(this).find('.Musictitle').html();
				title = title.substring(0,16);
				$.ajax({
					type: "POST",
					async:false,
					url: "finalProcess.php",
					dataType: "json",
					data: ({payPrice: $(this).find('.Musicprice').val(), isbn: $(this).find('.MusicUPC').html(),
					       quantity: $(this).find('.Musicquantity').val(),
					       checkNum: $('#musiccheckNum').val(), origPrice: $(this).find('.MusicorigPrice').html(), source: $('#source').val(),
					       orderId: orderId}),
					success: function(data){
						sku = data.sku;
						orderId = data.orderId;
						var x=0;
						for (x=0;x<data.quantity;x++)
						{
							first += '$("#'+indexGlobal+'").barcode("'+sku+'", "codabar",{barHeight:40, fontSize:30, output:"bmp"});';
							second += '<div class="wrapper"><img src="../images/temp.jpg" /><div id="'+indexGlobal+'"></div><div class="fullSKU">&nbsp &nbsp &nbsp '+sku+'</div><br/><div class="title">'+title+'</div></div><br/><div class="page-break"></div>';
						indexGlobal++;
							//second += '<center><img src="../images/temp.jpg" /><br/><div id="'+indexGlobal+'"></div>'+sku+'<br/>'+title+'</center><div class="page-break"></div>';
							//indexGlobal++;
						}
					}
				});
			});
			var barcode =  window.open('','BarcodeWindow','width=200');
			var html = '<html><head><title>Barcode</title><style type="text/css">'+
   			'.page-break{display:block; page-break-before:always; }'+
			'body{width: 2in;}'+
			'.wrapper{height: 1in;margin-left:10px;margin-top:5px;margin-right:5px;}'+
			'.fullSKU{float: left;}'+
			'.shortSKU{float: right;font-size:25px;font-weight:bold;}'+
			'.title{float: left;}'+
   			'</style><script type="text/javascript"src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script><script type="text/javascript" src="../barcode/jquery-barcode.js"></script><script>$(document).ready(function() {'+first+'window.print();window.close();});</script></head><body>'+second+'</body></html>';
			barcode.document.open();
			barcode.document.write(html);
			barcode.document.close();

			//clear all data and focus on isbn
			$("#Musictally tbody tr").remove();
			$('#musiccheckNum').val('');
			$("#musiccash").attr('checked', false);
			$("#musiccheck").attr('checked', false);
			$("#musiccredit").attr('checked', false);
			$('#Musicupc').val('');
			$('#Musicquantity').val('');
			$('#MusicpayPrice').val('');
			$('#Musictitle').val('');
			$('#Musicgrandtotal').html('');
			$('#Musicgrandquantity').html('');
			$('#MusicsalesRank').val('');
			$('#Musicrating').val('');
			$("#MusicdetailURL").attr("href","");
			$("#MusicbookCover").attr("src","../images/imgNotFound.gif");
			$("#MusicrecentOrder").html("<h3>Last Order Number: " + orderId + "</h3>");
		}else{
			alert('Table is not filled in properly, look over the prices and quantities and try again!');
		}
	    }
    }); // end of Music Buy section
	
//Get Video Game info and process
    $('#Gamesupc').keydown(function (e) {
		//retrieve price to pay (and other data)
    	if (e.keyCode == 9 || e.keyCode == 13) {
    		
			//$("#supply").hide(); //clear the supply table
			//$("#supply tbody tr").remove(); //clear the supply table
	    	$('#Gamesquantity').val('0'); //default quantity to 0
		$('#Gamesbuy').attr('disabled', false).css('backgroundColor', '');
		$('#Gamesquantity').css('border', '');
		$('#GamespayPrice').css('border', '');
		$('#GamespayPrice').css('backgroundColor', '');
		$('#GamespayPrice').css('color', '');

		$.ajax({
				type: "POST",
				url: "GamespriceProcessmws.php",
				async:false,
				dataType: "json",
				data: ({title: $('#Gamesupc').val()}),
				success: function(data){
				    
					//$('#payPrice').val(data.payPrice);
	            	$('#Gamestitle').val(data.title);
	            	$('#GamessalesRank').val(data.salesRank);
	            	$('#Gamesrating').val(data.rating);
	            	$("#GamesdetailURL").attr("href",data.DetailURL);

					maxQtyAllowed = data.maxQtyLimit;

	            	if( parseInt(data.maxQtyLimit) > 0 ){
	            		$('#Gamesquantity').val('1');
	            	} else {
			    $('#Gamesbuy').attr('disabled', true).css('backgroundColor', '#e5e5e5');
			    
			    $('#Gamesquantity').css('border', '1px solid red');
			    $('#GamespayPrice').css('backgroundColor', '#cccccc');
			}

				    doNotBuy = data.doNotBuy;
					if(doNotBuy){
					    	$('#GamespayPrice').val(data.payPrice);//$('#payPrice').val('0');
						$('#GamespayPrice').css('border', '1px solid red');
						$('#GamespayPrice').css('backgroundColor', '#cccccc');
						$('#GamespayPrice').css('color', '#ff0000');
						maxPriceAllowed = 0;
						previousPriceOffered = 0;
						//$('#buy').attr("disabled", true); // disable the buy button if the book should not be bought
						message = data.message;
						if (message != null){ 
						alert(message); //puts the message from the database into an alert so the book will not be bought
						}//}
					}else{
						$('#GamespayPrice').val(data.payPrice);
						//maxPriceAllowed = data.payPrice;
						//previousPriceOffered = data.payPrice;
					}

	            	if(data.ImageURL){
	            		$("#GamesCover").attr("src",data.ImageURL);
	            	}else{
	            		$("#GamesCover").attr("src","../images/imgNotFound.gif");
	            	}
				} // end of success function
		}); // end of ajax call
	}
    });// end of video games

//append new row to tally table
    $("#Gamesbuy").click(function() {
	    /*if ($("#keeping").attr('checked')){
		$("#keeping").val("Yes");
	    } else {
		$("#keeping").val("No");
	    }*/	    
	    
		if($("#buybackFormGames").valid())
		{
	        $("#Gamestally").append('<tr><td name="tableUPC" class="GamesUPC">'+$('#Gamesupc').val()+'</td><td class="Gamestitle">'+
	        $('#Gamestitle').val()+'</td><td><input type="text" id="Gamesprice" class="Gamesprice" value="'+$('#GamespayPrice').val()+
		'" /></td><td><input type="text" class="Gamesquantity" value="'+$('#Gamesquantity').val()+
		'"/></td><td name="gorigPrice" class="gorigPrice" >'+$('#GamespayPrice').val()+
		'<td><img class="delete" src="../images/delete.gif"/></td></tr>');
//<td><input type"checkbox" id="keeping" value="'+$('#keeping').val()+'"/></td>
	        $("#Gamestally").trigger("update");

			//calulate total price to pay
			var sum = 0;
			var qty = 0;
			$('#Gamestally tbody tr').each(function() {
	    		sum += $(this).find('.Gamesprice').val() * $(this).find('.Gamesquantity').val();
	    		qty += parseInt($(this).find('.Gamesquantity').val());
			});
			$('#Gamesgrandtotal').html("$"+sum.toFixed(2));
			$('#Gamesgrandquantity').html("Total Qty: "+qty);

			//clear the buyback form / supply table after clicking "buy"
			$('#Gamesupc').val('');
			$('#Gamesquantity').val('');
			$('#GamespayPrice').val('');
			$('#Gamestitle').val('');
			$('#GamessalesRank').val('');
			$('#platform').val('');
			$("#Gamesupc").select();
			//$("#supply").hide();
			$('#Gamesquantity').css('border', '');
			$('#GamespayPrice').css('border', '');
			$('#GamespayPrice').css('backgroundColor', '');
			$('#GamespayPrice').css('color', '');
			//$("#supply tbody tr").remove();
			$("#GamesdetailURL").attr("href","");
			$("#GamesCover").attr("src","../images/imgNotFound.gif");
			//$("#keeping").attr('checked', false);
			$('#Gamespoor').attr("disabled", false);
        	$('#Gamescase').attr("disabled", false);
        	$('#GamesModscratch').attr("disabled", false);
        	$('#GamesHeavscratch').attr("disabled", false);
        	$('#GamesMissingInstructions').attr("disabled", false);
		}
    });


    //remove row from tally table
	$('#Gamestally td img.delete').click(function() {
		var answer = confirm("Delete Row?");
		if (answer){
			$(this).parent().parent().remove();
			$("#Gamestally").trigger("update");
		}

		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Gamestally tbody tr').each(function() {
    		sum += $(this).find('.Gamesprice').val() * $(this).find('.Gamesquantity').val();
    		qty += parseInt($(this).find('.Gamesquantity').val());
		});
		$('#Gamesgrandtotal').html("$"+sum.toFixed(2));
		$('#Gamesgrandquantity').html("Total Qty: "+qty);
    });


    $('.Games').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Gamestally tbody tr').each(function() {
    		sum += $(this).find('.Gamesprice').val() * $(this).find('.Gamesquantity').val();
    		qty += parseInt($(this).find('.Gamesquantity').val());
		});
		$('#Gamesgrandtotal').html("$"+sum.toFixed(2));
		$('#Gamesgrandquantity').html("Total Qty: "+qty);
	});
	$('.Gamesquantity').change(function() {
		//calulate total price to pay
		var sum = 0;
		var qty = 0;
		$('#Gamesgametally tbody tr').each(function() {
    		sum += $(this).find('.Gamesprice').val() * $(this).find('.Gamesquantity').val();
    		qty += parseInt($(this).find('.Gamesquantity').val());
		});
		$('#Gamesgrandtotal').html("$"+sum.toFixed(2));
		$('#Gamesgrandquantity').html("Total Qty: "+qty);
	});
	
// Video Game Process Buy
//process order and print barcodes
	$("#Gamesprocess").click(function() {
	    if ($("#gsourceForm").valid()) {
		$('#Gamestally tbody tr').each(function()
		{
			if(($(this).find('.Gamesprice').val() >= 0) && ($(this).find('.Gamesquantity').val() > 0)){
				GamestableValidate = true;
			}else{
				GamestableValidate = false;
			}
		});

		//validating table first
		if(GamestableValidate)
		{
			var first = '';
			var second = '';
			var indexGlobal = 0;
			var title = '';
			var orderId = '';
			$('#Gamestally tbody tr').each(function()
			{
				title = $(this).find('.Gamestitle').html();
				title = title.substring(0,16);
				$.ajax({
					type: "POST",
					async:false,
					url: "finalProcess.php",
					dataType: "json",
					data: ({payPrice: $(this).find('.Gamesprice').val(), isbn: $(this).find('.GamesUPC').html(),
					       quantity: $(this).find('.Gamesquantity').val(),
					       checkNum: $('#checkNum').val(), origPrice: $(this).find('.gorigPrice').html(), source: $('#source').val(),
					       orderId: orderId}),
					success: function(data){
						sku = data.sku;
						orderId = data.orderId;
						var x=0;
						for (x=0;x<data.quantity;x++)
						{
							first += '$("#'+indexGlobal+'").barcode("'+sku+'", "codabar",{barHeight:40, fontSize:30, output:"bmp"});';
							second += '<div class="wrapper"><img src="../images/temp.jpg" /><div id="'+indexGlobal+'"></div><div class="fullSKU">&nbsp &nbsp &nbsp '+sku+'</div><br/><div class="title">'+title+'</div></div><br/><div class="page-break"></div>';
						indexGlobal++;
							//second += '<center><img src="../images/temp.jpg" /><br/><div id="'+indexGlobal+'"></div>'+sku+'<br/>'+title+'</center><div class="page-break"></div>';
							//indexGlobal++;
						}
					}
				});
			});
			var barcode =  window.open('','BarcodeWindow','width=200');
			var html = '<html><head><title>Barcode</title><style type="text/css">'+
   			'.page-break{display:block; page-break-before:always; }'+
			'body{width: 2in;}'+
			'.wrapper{height: 1in;margin-left:10px;margin-top:5px;margin-right:5px;}'+
			'.fullSKU{float: left;}'+
			'.shortSKU{float: right;font-size:25px;font-weight:bold;}'+
			'.title{float: left;}'+
   			'</style><script type="text/javascript"src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script><script type="text/javascript" src="../barcode/jquery-barcode.js"></script><script>$(document).ready(function() {'+first+'window.print();window.close();});</script></head><body>'+second+'</body></html>';
			barcode.document.open();
			barcode.document.write(html);
			barcode.document.close();

			//clear all data and focus on isbn
			$("#Gamestally tbody tr").remove();
			$('#gamescheckNum').val('');
			$("#gamescash").attr('checked', false);
			$("#gamescheck").attr('checked', false);
			$("#gamescredit").attr('checked', false);
			$('#Gamesupc').val('');
			$('#Gamesquantity').val('');
			$('#GamespayPrice').val('');
			$('#Gamestitle').val('');
			$('#Gamesgrandtotal').html('');
			$('#Gamesgrandquantity').html('');
			$('#GamessalesRank').val('');
			$('#Gamesrating').val('');
			$("#GamesdetailURL").attr("href","");
			$("#GamesbookCover").attr("src","../images/imgNotFound.gif");
			$("#GamesrecentOrder").html("<h3>Last Order Number: " + orderId + "</h3>");
		}else{
			alert('Table is not filled in properly, look over the prices and quantities and try again!');
		}
	    }
    }); // end of Games Buy section
	
// cash change function
$('#paid').change(function() {
    if($('#paid').val() == 2) {
	 $("#check_num").show();
    $("#check").show();
    $("#qCash").show();
    $("#cash").show();
    $("#qCredit").hide();
    $("#credit").hide();
    } else if ($('#paid').val() == 3) {
	$("#qCredit").show();
    $("#credit").show();
    $("#check_num").hide();
    $("#check").hide();
    $("#qCash").hide();
    $("#cash").hide();
    }else if ($('#paid').val() == 5){
    $("#qCredit").show();
    $("#credit").show();
    $("#qCash").show();
    $("#cash").show();
    $("#check_num").show();
    $("#check").show();
    } else {
	$("#qCash").show();
    $("#cash").show();
    $("#qCredit").hide();
    $("#credit").hide();
    $("#check_num").hide();
    $("#check").hide();
    }
});
$('#college').change(function() {
    if($('#college').val() == 300) {
	$('#other').show();
	$('#cOther').show();
	var college = $('#other').html();
    } else {
	var college = $('#college').val();
    }
});
// Store forms submit
    $("#formSubmit").click(function() {
	if($("#storeForm").valid()) {
	    $.ajax ({
		type: "POST",
		async:false,
		url: "storeForm.php",
		dataType: "json",
		data: ({store: $('#store').val(), first:$('#fname').val(), last: $('#lname').val(),phone: $('#phone').val(),
		       email: $('#email').val(), street: $('#street').val(), apt: $('#apt').val(), city:$('#city').val(),
		       state:$('#state').val(), zip: $('#zip').val(),heard: $('#heard').val(), paid: $('#paid').val(),
		       items: $('#items').val(), type: $('#type').val(), taken: $('#taken').val(), cash: $('#cash').val(),
		       credit: $('#credit').val(), dateQuote: $('#dateQuoted').val(), by: $('#quoteBy').val(),
			school: $('#college').val(), comments: $('#comments').val(), check: $('#checks').val()}),
		success: function(data){
		}
		
	    }); // end of ajax call
	    $('#storesuccess').html("The form was successfully submitted");
	    // clear the form
	$('#store').val('');
	$('#fname').val('');
	$('#lname').val('');
	$('#phone').val('');
	$('#email').val('');
	$('#street').val('');
	$('#apt').val('');
	$('#city').val('');
	$('#state').val('');
	$('#zip').val('');
	$('#heard').val('');
	$('#paid').val('');
	$('#items').val('');
	$('#type').val('');
	$('#taken').val('');
	$('#cash').val('');
	$('#credit').val('');
	$('#dateQuoted').val('');
	$('#quoteBy').val('');
	$('#college').val('');
	$('#cOther').val('');
	$('#comments').val('');
	$('#check').val('');
	$('#other').hide();
    $('#cOther').hide();
	}
	setTimeout(function() {
	    $("#store").focus();
	    $('#storesuccess').html();
		    }, 3);
	
    }); // end of form Submit 

// populate edit forms table
$("#stores").change(function(){
    $("#forms tbody tr").remove();
    $("#donates").val();
    $("#rejects").val();
$.ajax ({
	type: "POST",
	async:false,
	url: "editForms.php",
	dataType: "json",
	data: ({store: $('#stores').val()}),
	success: function(data) {
	    if(data.store == null){
					$("#forms").append('<tr><td>No records found.</td></tr>');
				}else{
	    for (x=0;x<data.store.length;x++)
		{
		    $("#forms").append('<tr><td id="tableId">'+data.id[x]+'<td id="tableStore">'+data.store[x]+
					'</td><td id="tableFirstName">'+data.fname[x]+
					'</td><td>'+data.lname[x]+'</td><td>'+data.phone[x]+
					'</td><td>'+data.email[x]+
					'</td><td>'+data.type[x]+'</td><td>'+data.taken[x]+
					'</td><td>'+data.date[x]+'</td><td>'+data.quotedby[x]+
					'</td></tr>');//
		}
		$("#forms").trigger("update");
		var reject = data.rejects;
		$("#rejects").val(reject);
		var donate = data.donates;
		$("#donates").val(donate);
	    }
	}
});
	});
//dialog box for inv editting
	$("#dialog-form").dialog({
			autoOpen: false,
			height: 800,
			width: 1000,
			modal: true,
			buttons: {
				"Save": function() {
    $.ajax ({
	type: "POST",
	async:false,
	url: "formsSave.php",
	dataType: "json",
	data: ({id: $('#dialogid').val(),store: $('#dialogstore').val(), first: $('#dialogfname').val(), last: $('#dialoglname').val(),
								phone: $('#dialogphone').val(), email: $('#dialogemail').val(),
								street: $('#dialogstreet').val(),apt: $('#dialogapt').val(), city: $('#dialogCity').val(),
								state: $('#dialogState').val(), zip: $('#dialogZip').val(), heard: $('#dialogHeard').val(),
								items: $('#dialogItems').val(),
								type: $('#dialogType').val(), taken: $('#dialogTaken').val(), paid: $('#dialogPaid').val(),
								check: $('#dialogCheck').val(),
								quoteby: $('#dialogQuote').val(), cash: $('#dialogCash').val(), credit: $('#dialogCredit').val(),
								school: $('#dialogSchool').val(), comments: $('#dialogComments').val()
								}),
	success: function(data) {
	alert('Form was successfully updated!');
						}
					});//end ajax cal
				},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
			},
			close: function() {
				//allFields.val( "" ).removeClass( "ui-state-error" );
			}
	});
//});

$("#forms tbody tr").live('click', function() {

		//highlight chosen record
		$('#forms tbody tr').removeClass('highlight');
    	$(this).addClass('highlight');

		$.ajax({
			type: "POST",
			url: "formsRetrieve.php",
			dataType: "json",
			async:false,
			data: ({id: $(this).closest('tr').children('#tableId').html()}),
			success: function(data){
				
				$('#dialogid').val(data.id);
				$('#dialogstore').val(data.store);
				$('#dialogfname').val(data.fname);
				$('#dialoglname').val(data.lname);
				$('#dialogphone').val(data.phone);
				$('#dialogemail').val(data.email);
				$('#dialogstreet').val(data.street);
				$('#dialogapt').val(data.apt);
				$('#dialogCity').val(data.city);
				$('#dialogState').val(data.state);
				$('#dialogZip').val(data.zip);
				$('#dialogHeard').val(data.heard);
				$('#dialogItems').val(data.items);
				$('#dialogType').val(data.type);
				$('#dialogTaken').val(data.taken);
				$('#dialogPaid').val(data.paid);
				$('#dialogCredit').val(data.credit);
				$('#dialogQuote').val(data.quotedby);
				$('#dialogCash').val(data.cash);
				$('#dialogCheck').val(data.check);
				$('#dialogSchool').val(data.school);
				$('#dialogComments').val(data.comments);
				

	
			}
		});
		$("#dialog-form").dialog("open");
	});

    //IE price drop functionality
    $("#isIE").click(function() {
   		$('#payPrice').val(		Math.round($('#payPrice').val() * 0.66 * 100)/100	);
   		$('#isIE').attr("disabled", true);
 	});

 	//AIE price drop functionality
    $("#isAIE").click(function() {
   		$('#payPrice').val(		Math.round($('#payPrice').val() * 0.1 * 100)/100	);
   		$('#isAIE').attr("disabled", true);
 	});

 	//Moderate Highlighting price drop functionality
    $("#isModHighlight").click(function() {
   		$('#payPrice').val(		Math.round($('#payPrice').val() * 0.9 * 100)/100	);
   		$('#isModHighlight').attr("disabled", true);
 	});

 	//Heavy Highlighting price drop functionality
    $("#isHeavHighlight").click(function() {
   		$('#payPrice').val(		Math.round($('#payPrice').val() * 0.75 * 100)/100	);
   		$('#isHeavHighlight').attr("disabled", true);
 	});

 	//Missing Supply price drop functionality
    $("#isMissingSupply").click(function() {
	if($('#edition').val()== "Current") {
   		$.ajax({
			type: "POST",
			url: "../missSupp.php",
			dataType: "json",
			async:false,
			data: ({asin: $("#asin").val(), rank:$("#salesRank").val(), price: $("#payPrice").val()}),
			success: function(data){
			    $('#payPrice').val(data.payPrice);
   		$('#isMissingSupply').attr("disabled", true);
			}
		});
	} else{
		$('#payPrice').val(Math.round($('#payPrice').val() * 0.7));
   		$('#isMissingSupply').attr("disabled", true);
		
		}
 	});
//Water damage or poor condition funtionality
	$("#waterDamage").live('click', function() {
		$('#payPrice').val(		Math.round($('#payPrice').val() * 0.5 * 100)/100	);
   		$('#waterDamage').attr("disabled", true);
	});
	//can't change pay price above max price allowed
 	$('#payPrice').change(function() {
 		if( parseInt($('#payPrice').val()) > parseInt(maxPriceAllowed) ){
 			$('#payPrice').val(previousPriceOffered);
 		}else{
 			previousPriceOffered = $('#payPrice').val();
 		}
 	});

//Video Game price drop
 //IE price drop functionality
    $("#case").click(function() {
   		$('#videopayPrice').val(		Math.round($('#videopayPrice').val() * 0.1 * 100)/100	);
   		$('#case').attr("disabled", true);
 	});

 	//AIE price drop functionality
    $("#poor").click(function() {
   		$('#videopayPrice').val(		Math.round($('#videopayPrice').val() * 0.1 * 100)/100	);
   		$('#poor').attr("disabled", true);
 	});

 	//Moderate Highlighting price drop functionality
    $("#isModscratch").click(function() {
   		$('#videopayPrice').val(		Math.round($('#videopayPrice').val() * 0.9 * 100)/100	);
   		$('#isModscratch').attr("disabled", true);
 	});

 	//Heavy Highlighting price drop functionality
    $("#isHeavscratch").click(function() {
   		$('#videopayPrice').val(		Math.round($('#videopayPrice').val() * 0.75 * 100)/100	);
   		$('#isHeavscratch').attr("disabled", true);
 	});

 	//Missing Supply price drop functionality
    $("#isMissingInstructions").click(function() {
   		$('#videopayPrice').val(		Math.round($('#videopayPrice').val() * 0.5 * 100)/100	);
   		$('#isMissingInstructions').attr("disabled", true);
 	});

	//can't change pay price above max price allowed
 	$('#videopayPrice').change(function() {
 		if( parseInt($('#videopayPrice').val()) > parseInt(maxPriceAllowed) ){
 			$('#videopayPrice').val(previousPriceOffered);
 		}else{
 			previousPriceOffered = $('#videopayPrice').val();
 		}
 	});

 	//can't change quantity above max qty allowed
 	$('#videoquantity').change(function() {
 		if( parseInt($('#videoquantity').val()) > parseInt(maxQtyAllowed) ){
 			$('#videoquantity').val(maxQtyAllowed);
 		}
 	});
	
	//Movie price drop
 //IE price drop functionality
    $("#Moviecase").click(function() {
   		$('#MoviepayPrice').val(		Math.round($('#MoviepayPrice').val() * 0.1 * 100)/100	);
   		$('#Moviecase').attr("disabled", true);
 	});

 	//AIE price drop functionality
    $("#Moviepoor").click(function() {
   		$('#MoviepayPrice').val(		Math.round($('#MoviepayPrice').val() * 0.1 * 100)/100	);
   		$('#Moviepoor').attr("disabled", true);
 	});

 	//Moderate Highlighting price drop functionality
    $("#MovieModscratch").click(function() {
   		$('#MoviepayPrice').val(		Math.round($('#MoviepayPrice').val() * 0.9 * 100)/100	);
   		$('#MovieModscratch').attr("disabled", true);
 	});

 	//Heavy Highlighting price drop functionality
    $("#MovieHeavscratch").click(function() {
   		$('#MoviepayPrice').val(		Math.round($('#MoviepayPrice').val() * 0.75 * 100)/100	);
   		$('#MovieHeavscratch').attr("disabled", true);
 	});

 	//Missing Supply price drop functionality
    $("#MovieMissingInstructions").click(function() {
   		$('#MoviepayPrice').val(		Math.round($('#MoviepayPrice').val() * 0.5 * 100)/100	);
   		$('#MovieMissingInstructions').attr("disabled", true);
 	});

	//can't change pay price above max price allowed
 	$('#MoviepayPrice').change(function() {
 		if( parseInt($('#MoviepayPrice').val()) > parseInt(maxPriceAllowed) ){
 			$('#MoviepayPrice').val(previousPriceOffered);
 		}else{
 			previousPriceOffered = $('#MoviepayPrice').val();
 		}
 	});

 	//can't change quantity above max qty allowed
 	$('#Moviequantity').change(function() {
 		if( parseInt($('#Moviequantity').val()) > parseInt(maxQtyAllowed) ){
 			$('#Moviequantity').val(maxQtyAllowed);
 		}
 	});
	
	//Music price drop
 //IE price drop functionality
    $("#Musiccase").click(function() {
   		$('#MusicpayPrice').val(		Math.round($('#MusicpayPrice').val() * 0.1 * 100)/100	);
   		$('#Musiccase').attr("disabled", true);
 	});

 	//AIE price drop functionality
    $("#Musicpoor").click(function() {
   		$('#MusicpayPrice').val(		Math.round($('#MusicpayPrice').val() * 0.1 * 100)/100	);
   		$('#Musicpoor').attr("disabled", true);
 	});

 	//Moderate Highlighting price drop functionality
    $("#MusicModscratch").click(function() {
   		$('#MusicpayPrice').val(		Math.round($('#MusicpayPrice').val() * 0.9 * 100)/100	);
   		$('#MusicModscratch').attr("disabled", true);
 	});

 	//Heavy Highlighting price drop functionality
    $("#MusicHeavscratch").click(function() {
   		$('#MusicpayPrice').val(		Math.round($('#MusicpayPrice').val() * 0.75 * 100)/100	);
   		$('#MusicHeavscratch').attr("disabled", true);
 	});

 	//Missing Supply price drop functionality
    $("#MusicMissingInstructions").click(function() {
   		$('#MusicpayPrice').val(		Math.round($('#MusicpayPrice').val() * 0.5 * 100)/100	);
   		$('#MusicMissingInstructions').attr("disabled", true);
 	});

	//can't change pay price above max price allowed
 	$('#MusicpayPrice').change(function() {
 		if( parseInt($('#MusicpayPrice').val()) > parseInt(maxPriceAllowed) ){
 			$('#MusicpayPrice').val(previousPriceOffered);
 		}else{
 			previousPriceOffered = $('#MusicpayPrice').val();
 		}
 	});

 	//can't change quantity above max qty allowed
 	$('#Musicquantity').change(function() {
 		if( parseInt($('#Musicquantity').val()) > parseInt(maxQtyAllowed) ){
 			$('#Musicquantity').val(maxQtyAllowed);
 		}
 	});
	
	// Game price drop
 //IE price drop functionality
    $("#Gamescase").click(function() {
   		$('#GamespayPrice').val(		Math.round($('#GamespayPrice').val() * 0.1 * 100)/100	);
   		$('#Gamescase').attr("disabled", true);
 	});

 	//AIE price drop functionality
    $("#Gamespoor").click(function() {
   		$('#GamespayPrice').val(		Math.round($('#GamespayPrice').val() * 0.1 * 100)/100	);
   		$('#Gamespoor').attr("disabled", true);
 	});

 	//Moderate Highlighting price drop functionality
    $("#GamesModscratch").click(function() {
   		$('#GamespayPrice').val(		Math.round($('#GamespayPrice').val() * 0.9 * 100)/100	);
   		$('#GamesModscratch').attr("disabled", true);
 	});

 	//Heavy Highlighting price drop functionality
    $("#GamesHeavscratch").click(function() {
   		$('#GamespayPrice').val(		Math.round($('#GamespayPrice').val() * 0.75 * 100)/100	);
   		$('#GamesHeavscratch').attr("disabled", true);
 	});

 	//Missing Supply price drop functionality
    $("#GamesMissingInstructions").click(function() {
   		$('#GamespayPrice').val(		Math.round($('#GamespayPrice').val() * 0.5 * 100)/100	);
   		$('#GamesMissingInstructions').attr("disabled", true);
 	});

	//can't change pay price above max price allowed
 	$('#GamespayPrice').change(function() {
 		if( parseInt($('#GamespayPrice').val()) > parseInt(maxPriceAllowed) ){
 			$('#GamespayPrice').val(previousPriceOffered);
 		}else{
 			previousPriceOffered = $('#GamespayPrice').val();
 		}
 	});

 	//can't change quantity above max qty allowed
 	$('#Gamesquantity').change(function() {
 		if( parseInt($('#Gamesquantity').val()) > parseInt(maxQtyAllowed) ){
 			$('#Gamesquantity').val(maxQtyAllowed);
 		}
 	});

// Show Check number field or cash/store credit
$('input[name="paidwith"]').click(function(){
   		if($(this).val() == "cash"){
   			$('#checkNum').val("0");
   			$('#checkNumDiv').hide();
   		} else if($(this).val() == "credit") {
			$('#checkNum').val("0");
   			$('#checkNumDiv').hide();
		}
   		else {
		$('#checkNum').val("");    
    		$('#checkNumDiv').show();
   		}
 	});
$('input[name="videopaidWith"]').click(function(){
   		if($(this).val() == "cash"){
   			$('#videocheckNum').val("0");
   			$('#videocheckNumDiv').hide();
   		} else if($(this).val() == "credit") {
			$('#videocheckNum').val("0");
   			$('#videocheckNumDiv').hide();
		}
   		else {
		$('#videocheckNum').val("");    
    		$('#videocheckNumDiv').show();
   		}
 	});
$('input[name="moviepaidWith"]').click(function(){
   		if($(this).val() == "cash"){
   			$('#moviecheckNum').val("0");
   			$('#moviecheckNumDiv').hide();
   		} else if($(this).val() == "credit") {
			$('#moviecheckNum').val("0");
   			$('#moviecheckNumDiv').hide();
		}
   		else {
		$('#moviecheckNum').val("");    
    		$('#moviecheckNumDiv').show();
   		}
 	});
$('input[name="musicpaidWith"]').click(function(){
   		if($(this).val() == "cash"){
   			$('#musiccheckNum').val("0");
   			$('#musiccheckNumDiv').hide();
   		} else if($(this).val() == "credit") {
			$('#musiccheckNum').val("0");
   			$('#musiccheckNumDiv').hide();
		}
   		else {
		$('#musiccheckNum').val("");    
    		$('#musiccheckNumDiv').show();
   		}
 	});
$('input[name="gamespaidWith"]').click(function(){
   		if($(this).val() == "cash"){
   			$('#gamescheckNum').val("0");
   			$('#gamescheckNumDiv').hide();
   		} else if($(this).val() == "credit") {
			$('#gamescheckNum').val("0");
   			$('#gamescheckNumDiv').hide();
		}
   		else {
		$('#gamescheckNum').val("");    
    		$('#gamescheckNumDiv').show();
   		}
 	});

	//loading img and disable buttons while running backend (focus on isbn after ajax is complete)
    $('#loading').hide()
    .ajaxStart(function() {
        $('#loading').show();
        $('#buy').attr("disabled", true);
        //$('#process').attr("disabled", true);
    })
    .ajaxStop(function() {
        $('#loading').hide();
        $('#buy').attr("disabled", false);
        $('#process').attr("disabled", false);
		$('#isIE').attr("disabled", false);
        $('#isAIE').attr("disabled", false);
        $('#isModHighlight').attr("disabled", false);
        $('#isHeavHighlight').attr("disabled", false);
        $('#isMissingSupply').attr("disabled", false);
	$('#waterDamage').attr("disabled", false);
        $('#isbn').select();
	$('#videobuy').attr("disabled", false);
        $('#videoprocess').attr("disabled", false);
		$('#Modscratch').attr("disabled", false);
        $('#isHeavscratch').attr("disabled", false);
        $('#isMissingSupply').attr("disabled", false);
        $('#poor').attr("disabled", false);
        $('#upc').select();
    });
    $('#videoloading').hide()
    .ajaxStart(function() {
        $('#videoloading').show();
        $('#videobuy').attr("disabled", true);
        //$('#process').attr("disabled", true);
    })
    .ajaxStop(function() {
        $('#videoloading').hide();
        $('#videobuy').attr("disabled", false);
        $('#videoprocess').attr("disabled", false);
	$('#Modscratch').attr("disabled", false);
        $('#isHeavscratch').attr("disabled", false);
        $('#isMissingSupply').attr("disabled", false);
        $('#poor').attr("disabled", false);
        $('#upc').select();
    });
    $('#moviesloading').hide()
    .ajaxStart(function() {
        $('#moviesloading').show();
        $('#Moviebuy').attr("disabled", true);
        //$('#process').attr("disabled", true);
    })
    .ajaxStop(function() {
        $('#moviesloading').hide();
	$('#Moviebuy').attr("disabled", false);
        $('#Movieprocess').attr("disabled", false);
		$('#MovieModscratch').attr("disabled", false);
        $('#MovieHeavscratch').attr("disabled", false);
        $('#MovieMissingSupply').attr("disabled", false);
        $('#Moviepoor').attr("disabled", false);
        $('#Movieupc').select();
    });
    $('#musicloading').hide()
    .ajaxStart(function() {
        $('#moviesloading').show();
        $('#Musicbuy').attr("disabled", true);
        //$('#process').attr("disabled", true);
    })
    .ajaxStop(function() {
        $('#musicloading').hide();
        
	$('#Musicbuy').attr("disabled", false);
        $('#Musicprocess').attr("disabled", false);
		$('#MusicModscratch').attr("disabled", false);
        $('#MusicHeavscratch').attr("disabled", false);
        $('#MusicMissingSupply').attr("disabled", false);
        $('#Musicpoor').attr("disabled", false);
        $('#Musicupc').select();
    });
    $('#gamesloading').hide()
    .ajaxStart(function() {
        $('#gamesloading').show();
        $('#Gamesbuy').attr("disabled", true);
        //$('#process').attr("disabled", true);
    })
    .ajaxStop(function() {
        $('#gamesloading').hide();
        $('#Gamesbuy').attr("disabled", false);
        $('#Gamesprocess').attr("disabled", false);
		$('#Gamescase').attr("disabled", false);
        //$('#isAIE').attr("disabled", false);
        $('#GamesModscratch').attr("disabled", false);
        $('#GamesHeavscratch').attr("disabled", false);
        $('#GamesMissingInstructions').attr("disabled", false);
        $('#Gamespoor').attr("disabled", false);
        $('#upc').select();
    });
});


//idleTimeout Function for use with jquery-idleTimeout.js
$(document).idleTimeout();


//----------ISBN Conversion functions----------

function ISBNusedNew() {
  var isbn_dig = new Array();
  var even = 1;
  var odd = 3;
  var total = 0;
  var check_dig = 0;
  var s12 = "";
  var ISBN = $('#isbn').val();
  ISBN = ISBN.replace(/[-' ']/g,'');
  var len = ISBN.length;
  if (ISBN.substring(0,3) == "290")
  {
	s12 = "978" + ISBN.substring(3,12);

	for(i=0; i<12; i++)
	{
		isbn_dig[i] = s12.charAt(i);

		if(i % 2 == 0)
		{
			isbn_dig[i] = isbn_dig[i] * even;
		}
		else
		{
			isbn_dig[i] = isbn_dig[i] * odd;
		}
		total = total + isbn_dig[i];
	}
	if (total % 10 == 0)
	{
		Result = s12 + "0";
	}
	else
	{
		Result = s12 + String(10-(total%10));
	}
  }
  else
  {
  	Result = $('#isbn').val();
  }
  $('#isbn').val(Result);
}

function ISBN1013() {
  var i = 0;
  var v = 0;
  var n = 0;
  var c = "";
  var Result = "";
  var s12 = "";
  var ISBN10 = $('#isbn').val();
  ISBN10 = ISBN10.replace(/[-' ']/g,'');
  var len = ISBN10.length;
  if (len<9 || len>10) Result = $('#isbn').val();
  else {
    s12 = "978" + ISBN10.substring(0, 9);
    for (i=0; i<12; i++) {
      if (Result=="") {
        c = s12.charAt(i);
        if (c>="0" && c<="9") {
          v = c - 0;
          if ((i % 2)!=0) v = 3 * v;
          n = n + v;
        }
        else Result = "ERROR"
      }
    }
    if (Result=="") {
      n = n % 10;
      if (n!=0) n = 10 - n;
      Result = s12 + n;
    }
  }
  $('#isbn').val(Result);
}
    