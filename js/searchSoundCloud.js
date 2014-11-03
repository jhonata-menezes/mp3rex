function getSearch()
{
	searchAudio($('.text-search').val());
}

function searchAudio(search)
{
  if( $('#search-box').val() === '')
  {
    alert('Por favor preencha o campo de pesquisa');
     $('#search-box').focus();
  }
  else
  {
    url = 'http://api.soundcloud.com/search';
    limitRows = parseInt($('#limit').val());
    $.getJSON(url, {q: search, client_id: clientId(), format: 'json', limit: limitRows }).done(function(data){
      $.each(data.collection, function(i, item){
        $('.list-music').prepend(verifyExistsAudio(item));
      }
  )});
  }
}


function createPlayer(link)
{
	$('.audio-player').html('<audio controls="controls" autoplay="autoplay" preload="auto"><source src="'+ link +'" type="audio/mpeg">Your browser does not support the audio element.</audio>');
}


function verifyExistsAudio(item)
{
	if(typeof item.title === "undefined" || typeof item.stream_url === "undefined")
	{
		return null;
	}
	else
    {
    	duracao = new String(item.duration);
    	link = $.trim(item.stream_url+'?client_id='+clientId());
    	return '<a name="teste.mp3" class="list-group-item list-item-color"> <span onclick="createPlayer(\''+link+'\')">'
              + item.title +'</span> <span class="pull-right"><b> Duração: '+ formatTime(parseInt(duracao.substring(0,(duracao.length-3)))) 
              +' Segundos Tamanho: '+ Math.round(parseInt(item.original_content_size)/1024) 
              +'Kb <b><img onclick="saveAudio(\''+ link +'\', \''+ item.title +'\')" title="Download" src="img/down-small63.png"></a></span>';
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

function saveAudio(link, name){
  $.get(link, function(data) {
    var blob = new Blob([data], {type: "audio/mpeg3"});
    saveAs(blob, name+".mp3");
  });
  
}

$("#search-box").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $("#search").click();
    }
});

