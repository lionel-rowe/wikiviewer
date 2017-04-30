$(document).ready(function() {

  
  $('#searchButton').click(function(e) {
    e.preventDefault();
    
    $.ajax({
      dataType: 'json',
      url: `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${$('#searchField').val()}&origin=*`,
      beforeSend: loadingMsg,
      success: showResults,
      error: errorMsg
    });
    
    function loadingMsg() {
      $('#searchResults').html('<p>Loading...</p>');
    }
    
    function showResults(data) {
            
      $('#searchResults').html('');
      
      try {
        $('#searchResults').append(`<p class="showResultsMsg">Showing results ${1} to ${data.query.search.length} of ${data.query.searchinfo.totalhits}.</p>`);
        
        for (i=0;i<data.query.search.length;i++) {
          $('#searchResults').append(
            `
            
            <h3>
              <a href="https://en.wikipedia.org/wiki/${data.query.search[i].title.replace(' ','%20')}" target="_blank">
                ${data.query.search[i].title}
              </a>
            </h3>
            <p>${data.query.search[i].snippet}...</p>
            
            `
          );
        }
      } catch (e) {
        $('#searchResults').html('<p>No results found.</p>');
      }
      
        
    }
    
    function errorMsg(x, e) {
      
      var m;
      
      if (x.status === 0) {
        m = 'network error';
      } else if (x.status === 404) {
        m = 'URL not found';
      } else if (x.status === 500) {
        m = 'server error';
      } else if (e === 'parsererror') {
        m = 'failed to parse JSON request';
      } else if (e === 'timeout') {
        m = 'request timed out';
      } else {
        m = 'unknown error';
      }
      
      $('#searchResults').html(`<p>Failed to retrieve results. Error returned: ${x.status} - ${m}.</p>`);
    }
    
  });
  
  $('#randomButton').click(function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  });
  
  
});
