var postTags = [];

var JSONApiData;
makeAjaxRequest();

function makeAjaxRequest()
{
		window.console.log('inside the ajax call');
	$.ajax({
		dataType: 'json',
		url:"https://mpv-admin.herokuapp.com/api/posts",
		success: function(result){
			window.console.log('success');
			window.console.log(result);
			var data = JSON.parse(result["posts"]);
			// debugger;
			JSONApiData = data;
			getPostTagArray();
		}
	});
}

function getPostTagArray(){
	for(var i =0;i<JSONApiData.length;i++){
		postTags.push(JSONApiData[i].shortcode);
	}
}

$('.tweet-box.rich-editor').keyup(function() {
  var that = this;
	window.console.log( that.innerHTML );

  var matchingTag = findMatchingWords($(that).text(),'#mpv');
  var postTag = matchingTag[0];
  window.console.log(matchingTag,postTag,postTags);
  var postNumber = $.inArray(postTag,postTags);
  if(postNumber>-1)
  {
    insertPost(postNumber,'.tweet-box.rich-editor');
    var replaceText = $(that).text().replace(postTag,'');
    $(that).text(replaceText);
  }
});

function findMatchingWords(t, s) {
    var re = new RegExp(s+"\\w*", "g");
    return t.match(re);
}

function insertPost(postNumber,container)
{
	var data = JSONApiData[postNumber];
  window.console.log('postNumber -- ' + JSONApiData[postNumber] + ' -- conteiner -- ' + container + ' -- ' +  data.id);
  var textContainer = $('<div>');
	var tagString = '';
	for(var i =0;i<data.tags.length;i++)
	{
		tagString = tagString.concat(' #' + data.tags[i].name );
	}
	var postUrl = "https://mpv-admin.herokuapp.com/posts/" + data.id;
  textContainer.html(postUrl + tagString);

  $(container).append(textContainer);

}
