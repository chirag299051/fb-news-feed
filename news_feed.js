let fbToken

$(document).ready(() => {
	fbToken = prompt("Enter your facebook token:")
	if (fbToken == null || fbToken == "") {
		alert("No user token found")
	} else {
		$('#get-data').click(() => {
			getDetails()
		})
	}
})

let getDetails = () => {

	$.ajax({
		type: 'Get',
		dataType: 'json',
		async: true,
		url: 'https://graph.facebook.com/me?fields=name,posts{created_time,type,full_picture,story,message,source}&access_token=' + fbToken,
		success: (response) => {

			console.log(response)
			let allData = response.posts.data
			for(person of allData){
				let tempRow =  ` <div class="row">
								    <div class="col">${person.created_time}</div>
								    <div class="col">${person.type}</div>
								    <div class="col">${person.story}</div>
								    <div class="col">${person.id}</div>
								</div> `
				$("#showData").append(tempRow);				
			}



		}, error: (err) => {
			console.log(err.responseJSON.error.message)
		}

	})

}