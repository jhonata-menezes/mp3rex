function getSearch()
{
	searchAudio($('.text-search').val());
}

function searchAudio(search)
{
	url = 'http://api.soundcloud.com/search';
	limitRows = parseInt($('#limit').val());
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
    	duracao = new String(item.duration);
    	link = $.trim(item.stream_url+'?client_id='+clientId());
    	return '<a class="list-group-item list-item-color" onclick="createPlayer(\''+link+'\')" > '+ item.title +' <span class="pull-right"><b> Duração: '+ formatTime(parseInt(duracao.substring(0,(duracao.length-3)))) +' Segundos Tamanho: '+ Math.round(parseInt(item.original_content_size)/1024) +'MB <b></span></a>';
    }
	
}

function clearDiv(div)
{
	$(div).empty();
}

function formatTime(secs){
   var times = new Array(3600, 60, 1);
   var time = '';
   var tmp;
   for(var i = 0; i < times.length; i++){
      tmp = Math.floor(secs / times[i]);
      if(tmp < 1){
         tmp = '00';
      }
      else if(tmp < 10){
         tmp = '0' + tmp;
      }
      time += tmp;
      if(i < 2){
         time += ':';
      }
      secs = secs % times[i];
   }
   return time;
}

