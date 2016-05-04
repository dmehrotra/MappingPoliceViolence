var postTags = [
	"#mpv1",
	"#mpv2",
	"#mpv3",
	"#mpv4",
	"#mpv5"
];
//can this be recieved by an api call ?

var JSONData =
{
	"banner": "Police killed at least 346 black people in the U.S. in 2015.",
	"data":
	[
		{
			"id":1,
		  "description": "",
		  "title": "Police are killing black people at persistently high rates.",
		  "imgUrl": "http://static1.squarespace.com/static/54ecf211e4b0ed744420c5b6/t/	57114501b654f9ca26514ef6/1460749577385/PoliceKillingsTrendline.png?format=1000w",
		  "tags": [
		    "policeKillings",
		    "trend"
		  ],
		  "questions" : [
		    "question 1",
		    "question 2"
		  ]
		},
		{
			"id":2,
		  "description": "",
		  "title": "Black people are most likely to be killed by police.",
		  "imgUrl": "http://static1.squarespace.com/static/54ecf211e4b0ed744420c5b6/t/5695519969492ee091ce55a1/1452626355687/blackpeoplemorelikelytobekilled.png?format=1000w",
		  "tags": [
		    "policeKillings",
		    "likelihood"
		  ],
		  "questions" : [
		    "question 2",
		    "question 3"
		  ]
		},
		{
			"id":3,
		  "description": "",
		  "title": "Where you live matters.",
		  "imgUrl": "http://static1.squarespace.com/static/54ecf211e4b0ed744420c5b6/t/570e8e0c356fb0af9cde3faf/1460571675358/?format=1000w",
		  "tags": [
		    "policeKillings",
		    "location",
				"cities"
		  ],
		  "questions" : [
		    "question 4",
		    "question 5"
		  ]
		},
		{
			"id":4,
		  "description": "",
		  "title": "Where you live matters.",
		  "imgUrl": "http://static1.squarespace.com/static/54ecf211e4b0ed744420c5b6/t/570e8e0c356fb0af9cde3faf/1460571675358/?format=1000w",
		  "tags": [
		    "policeKillings",
		    "location",
				"cities"
		  ],
		  "questions" : [
		    "question 4",
		    "question 5"
		  ]
		},
		{
			"id":5,
		  "description": "",
		  "title": "Where you live matters.",
		  "imgUrl": "http://static1.squarespace.com/static/54ecf211e4b0ed744420c5b6/t/570e8e0c356fb0af9cde3faf/1460571675358/?format=1000w",
		  "tags": [
		    "policeKillings",
		    "location",
				"cities"
		  ],
		  "questions" : [
		    "question 4",
		    "question 5"
		  ]
		}
	]
};

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
	var data = JSONData.data[postNumber];
  window.console.log('postNumber -- ' + JSONData.data[postNumber] + ' -- conteiner -- ' + container + ' -- ' +  data.id);
  var textContainer = $('<div>');
	var tagString = '';
	for(var i =0;i<data.tags.length;i++)
	{
		tagString = tagString.concat(' #' + data.tags[i] );
	}
	var postUrl = "https://mpv-admin.herokuapp.com/posts/" + data.id;
  textContainer.html(postUrl + tagString);

  $(container).append(textContainer);


}
