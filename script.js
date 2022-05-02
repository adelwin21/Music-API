



$("#search-button").on("click", function () {
    searchArtist();
});

$("#search-input").on('keyup', function(e){
  
  if(e.keyCode ==  13){
  
    searchArtist();
  }
 
});

$('#track-list').on("click",".see-album", function(){ 
  //console.log($(this).data('id')) ;

  $('.modal-body').html('');
  $.ajax({
    headers: {  'Access-Control-Allow-Origin': 'https://adelwin21.github.io/Music-API/' },
    url: 'https://api.musixmatch.com/ws/1.1/artist.albums.get?',
    type: 'get',
    dataType: 'json',
    data: {
      'artist_id': $(this).data('id'),
      'g_album_name':1,
      's_release_date':'desc',
      'apikey':'1fa347d1f8efa22a2d09d05298d7a79a',
    },

    success: function (result) {
      if (result.message.header.status_code == 200){
        let story = result.message.body.album_list;

        $.each(story, function(i, data) {
          $('.modal-body').append(`
          
            <ul class="list-group mb-2 border border-primary">
              <li class="list-group-item">Nama Album : `+ data.album.album_name +`</li>
              <li class="list-group-item">Tanggal Release : `+ data.album.album_release_date+`</li>
              <li class="list-group-item">Label Album : `+ data.album.album_label+`</li>
            </ul>
          
          `);
        });
      }else{
        $('#track-list').html(`
        <div class="col">
          <h1 class="text-center"> `+"Data tidak ditemukan "+`</h1>
        </div>
        `)
      }


    },
  });
})

function searchArtist(){
  $('#track-list').html('');
  $.ajax({
       headers: {  'Access-Control-Allow-Origin': 'https://adelwin21.github.io/Music-API/' },
    url: 'https://api.musixmatch.com/ws/1.1/artist.search',
    type: 'get',
    dataType: 'json',
    data: {
      'q_artist': $('#search-input').val(),
      'page_size': 5,
      'apikey':'1fa347d1f8efa22a2d09d05298d7a79a',
    },

    success: function (result) {
      if (result.message.body.artist_list != ''){
        let story = result.message.body.artist_list;

        $.each(story, function(i, data) {
          $('#track-list').append(`
          <div class="col-md-4 mt-2 shadow">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">`+ data.artist.artist_name +`</h5>
                  <h6 class="card-subtitle mb-2 text-muted"> Artist ID`+ data.artist.artist_id +`</h6>
                  <a href="#" class="card-link see-album" data-toggle="modal" data-target="#exampleModal" data-id="`+data.artist.artist_id+`">Cek Album</a>
                  <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
          `);
        });
        $("#search-input").val('');
      }else{
        $('#track-list').html(`
        <div class="col">
          <h1 class="text-center"> `+"Data tidak ditemukan "+`</h1>
        </div>
        `)
      }


    },
  });
}


function searchAlbum(){
  $.ajax({
    url: 'https://api.musixmatch.com/ws/1.1/artist.albums.get?',
    type: 'get',
    dataType: 'json',
    data: {
      'artist_id': $(this).data('id'),
      'g_album_name':1,
      's_release_date':desc,
      'apikey':'1fa347d1f8efa22a2d09d05298d7a79a',
    },

    success: function (result) {
      if (result.message.header.status_code == 200){
        let story = result.message.body.artist_list;

        $.each(story, function(i, data) {
          $('.modal-body').html(`
          
          `);
        });
      }else{
        $('#track-list').html(`
        <div class="col">
          <h1 class="text-center"> `+"Data tidak ditemukan "+`</h1>
        </div>
        `)
      }


    },
  });
}
