
$("#search-button").on("click", function () {
  $.ajax({
    url: 'https://api.musixmatch.com/ws/1.1/artist.search',
    type: 'get',
    dataType: 'json',
    data: {
      'q_artist': $('#search-input').val(),
      'page_size': 5,
      'apikey':'1fa347d1f8efa22a2d09d05298d7a79a',
    },

    success: function (result) {
      if (result.status == 200){
        let story = result.data.history;

        $.each(story, function(i, data) {
          $('#track-list').append(`
            <div class= "shadow" >
              <li class="list-group-item">DATE : `+ data.date +` </li>
              <li class="list-group-item mb-3">DESC : `+ data.desc +` </li>
            </div>
          
          `);
        });

      }else{
        $('#track-list').html(`
        <div class="col">
          <h1 class="text-center"> `+"Tidak Ditemukan"+`</h1>
        </div>
        `)
      }

    },
  });
});
