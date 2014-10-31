function getSearch()
{
	searchAudio($('.text-search').val());
}

function searchAudio(search)
{
	url = 'http://api.soundcloud.com/search';
	limitRows = parseInt($('#limit').val())+1;
	$.getJSON(url, {q: search, client_id: clientId(), format: 'json', limit: limitRows }).done(function(data){
		$.each(data.collection, function(i, item){
			$('.list-music').prepend(verifyExistsAudio(item));
		}
	)});
}


function createPlayer(link)
{
	$('.audio-player').html('<audio controls="controls" autoplay="autoplay" preload="auto"><source src="'+ link +'" type="audio/mpeg">Your browser does not support the audio element.</audio>');
}


function verifyExistsAudio(item)
{
	if(typeof item.title === "undefined" && typeof item.stream_url === "undefined")
	{
		return null;
	}
	else
    {
    	link = $.trim(item.stream_url+'?client_id='+clientId());
    	return '<a class="list-group-item list-item-color" onclick="createPlayer(\''+link+'\')" > '+ item.title +'</a>';
    }
	
}

function clearDiv(div)
{
	$(div).empty();
}