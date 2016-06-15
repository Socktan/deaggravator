if($('.bootswatcher')[0]){
  $('.bootswatcher').remove();
} else {
  var $e = $('<select class="bootswatcher"><option>Amelia</option><option>Cerulean</option><option>Cosmo</option><option>Cyborg</option><option>Journal</option><option>Readable</option><option>Simplex</option><option>Slate</option><option>Spacelab</option><option>Spruce</option><option>Superhero</option><option>United</option></select>');
  var l = 1 + Math.floor(Math.random() * $e.children().length);
  var r = '<link rel="stylesheet" href="http://bootswatch.com/default/bootstrap-responsive.min.css">';
  $e.css({'z-index': '99999', 'position': 'fixed', 'top': '5px', 'right': '5px', 'opacity': '0.5'}
  ).hover(
      function(){$(this).css('opacity', '1');},
      function(){$(this).css('opacity', '0.5');}
  ).change(function(){
        if(!$('link.bootswatcher')[0]){
          $('head').append('<link rel="stylesheet" class="bootswatcher">' + r);
        }
        $('link.bootswatcher').attr('href', 'http://bootswatch.com/' + $(this).find(':selected').text().toLowerCase() + '/bootstrap.min.css');
      })
      .find('option:nth-child(' + l + ')').attr('selected', 'selected').end()
      .trigger('change');
  $('body').append($e);
}