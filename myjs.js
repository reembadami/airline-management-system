$(".nav li").on("click", function() {
	$(".nav li").removeClass("active");
	$(this).addClass("active");
});



function navbar_movment(event)
{
		$(event.data.param1).slideToggle("fast");
	/*	$(event.data.param2).slideUp("fast");
		$(event.data.param3).slideUp("fast");
		$(event.data.param4).slideUp("fast"); */
};


// Accessing data
function calcValue() {
	var user_flight_info = document.getElementById("user-flight-info").value
	var user_departure = document.getElementById("user-departure").value
	var user_destination = document.getElementById("user-destination").value
	var user_departure_date = document.getElementById("user-departure-date").value
	var user_return_date = document.getElementById("user-return-date").value
	var user_no_of_adults = document.getElementById("user-no-of-adults").value
	var user_no_of_children = document.getElementById("user-no-of-children").value

	var user_details = [user_flight_info, user_departure, user_destination, user_departure_date, user_return_date, user_no_of_adults, user_no_of_children]
	console.log(user_details)

	// Displaying the data collected from the top
	document.getElementById("user_display").innerHTML = user_details;
}

// class one{

// 	write(){
// 	  console.log("Yes! I did!");
// 	}
//   }
  
//   class two {
// 	 var object=new one();
  
// 	 tryingMethod(){
// 	 object.write();
// 	 }
//   }