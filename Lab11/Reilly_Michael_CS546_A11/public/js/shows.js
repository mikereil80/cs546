(function($) {
	// Let's start writing AJAX calls!

	// Michael Reilly
	// I pledge my honor that I have abided by the Stevens Honor Student.

	$(document).ready(function (){
	$('#searchForm').submit(function(event) {
		event.preventDefault();
		var search_term = $('#search_term').val();
		if (search_term.trim().length !== 0) {
				$('#showList').html("");
				$('#homeLink').show();
				$('#show').hide();
				$("#error").empty();
				var requestConfig = {
					method: "GET",
					url: `http://api.tvmaze.com/search/shows?q=${search_term.trim().toString()}`
					};
				$.ajax(requestConfig).done(function(data){
					$.each(data, function(i, shows){
						$('#showList').append(`<li><a class="links" id=${shows.show.id} href="${shows.show._links.self.href}">${shows.show.name}</a></li>`);
						$('#showList').show();
					})
				});
		}
		else{
			document.getElementById("error").innerHTML = "search_term is invalid";
			$("#error").show();
		}
	});

	$(document).on('click', ".links", function(event){
		event.preventDefault();
		var requestConfig = {
			method: "GET",
			url: `http://api.tvmaze.com/shows/${this.id}`
		};
		$.ajax(requestConfig).done(function(data){
			$("#error").empty();
			$('#showname').text(`${data.name}`);
			if(data.image){
				if(data.image.medium){
					$('#showimage').attr("src",data.image.medium);
				}
				else{
					$('#showimage').attr("src", "../public/img/no_image.jpeg");
				}
			}
			else{
				$('#showimage').attr("src", "/public/img/no_image.jpeg");
			}
			if(data.language){
				$('#showlanguage').text(`${data.language}`);
			}
			else{
				$('#showlangauge').text("N/A");
			}
			if(data.genres){
				for(let i=0; i<data.genres.length; i++){
					$('#showgenres').append(`<li>${data.genres[i]}</li>`);
				}
			}
			else{
				$('#showgenres').text("<li>N/A</li>");
			}
			if(data.rating){
				if(data.rating.average){
					$('#showratingaverage').text(`${data.rating.average}`);
				}
				else{
					$('#showratingaverage').text("N/A");
				}
			}
			else{
				$('#showratingaverage').text("N/A");
			}
			if(data.network){
				if(data.network.name){
					$('#shownetworkname').text(`${data.network.name}`);
				}
				else{
					$('#shownetworkname').text("N/A");
				}
			}
			else{
				$('#shownetworkname').text("N/A");
			}
			if(data.summary){
				$('#showsummary').text(`${data.summary.toString().replace( /(<([^>]+)>)/ig, '')}`);
			}
			else{
				$('#showsummary').text("N/A");
			}
			$('#showList').hide();
			$('#search').show();
			$('#show').show();
			$('#homeLink').show();
		})
	});
	window.onload = function () {
		var requestConfig = {
		method: "GET",
		url: "http://api.tvmaze.com/shows"
		};
		$.ajax(requestConfig).done(function(data){
			$.each(data, function(i, show){
				$('#showList').append(`<li><a class="links" id=${show.id} href="${show._links.self.href}">${show.name}</a></li>`);
				$('#showList').show();
			})
		})
	}
	});	
})(window.jQuery);