var availableTags = [
	"policeKillings",
	"trend",
	"likelihood",
	"location",
	"cities"
];
//can this be recieved by an api call ?
var JSONApiData;

function filterByTag(tagName)
{
	var projects = $('.post-container-class').css("display","none");
  var projects = $('.post-container-'+tagName).css("display","block");
}

//NEED TO FIX THE FONT
var isOpen = 0;
var widgetCreate = 0;
var widgetContainer;

widgetOnLoad();

function widgetOnLoad()
{
	makeAjaxRequest();
}

function makeAjaxRequest()
{
		window.console.log('inside the ajax call');
	$.ajax({
		dataType: 'json',
		url:"https://mpv-admin.herokuapp.com/api/posts",
		success: function(result){
			window.console.log('success');
			window.console.log(result);
	// debugger;
			var data = JSON.parse(result["posts"]);
			// debugger;
			JSONApiData = data;
			window.console.log(data);

			addStyleSheet();
			checkSearchBox();
			if($('.widget-container-class')[0])
			{
				window.console.log('already created');
				toggleWidget();
			}
			else
			{
				createWidget();
				loadStartJSONContent();
				widgetCreate = 1;
				window.console.log('creating the widget');
			}
			//test();
			//LOAD THE JSON
			tabSwitch();
			//debugger;
		}
	});
}

function tabSwitch()
{
	$('#widget-all-tag').click(
		function(){
			$('#widget-all-tag').addClass('tab-selected');
			$('#widget-about-tag').removeClass('tab-selected');
			$('.all-posts-container').show();
			$('.about-container').hide();
		}
	)
	$('#widget-about-tag').click(
		function(){
			$('#widget-about-tag').addClass('tab-selected');
			$('#widget-all-tag').removeClass('tab-selected');
			$('.all-posts-container').hide();
			$('.about-container').show();
		}
	)
}

function checkSearchBox()
{
	// $('.widget-search-box').on("keydown",function(){
	// 	window.console.log('hello');
	// })
}

function addStyleSheet()
{

	var style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = chrome.extension.getURL('mpvstyle.css');
	(document.head||document.documentElement).appendChild(style);

	//<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,300,800,600' rel='stylesheet' type='text/css'>
	// var fontStyle = document.createElement('link');
	// fontStyle.rel = 'stylesheet';
	// fontStyle.type = 'text/css';
	// fontStyle.href = chrome.extension.getURL('https://fonts.googleapis.com/css?family=Open+Sans:400,700,300,800,600');
	// (document.head||document.documentElement).appendChild(fontStyle);

}

/*********************************************************
FUNCTIONS TO CREATE AND TOGGLE WIDGET
*********************************************************/

function addWidgetMainContents()
{
	//Main heading
	window.console.log('create the heading');

	var widgetMainBarContainer = $("<div/>");
	widgetMainBarContainer.attr('class','widget-main-bar-container');
	$(".widget-container-class").append(widgetMainBarContainer);

	var widgetSearchContainer = $('<div>');
	widgetSearchContainer.attr('class', 'widget-search-container');
	$(widgetMainBarContainer).append(widgetSearchContainer);

	var widgetSearchText = $('<div>');
	widgetSearchText.attr('class','widget-search-text-show');
	$(widgetSearchContainer).append(widgetSearchText);

	widgetSearchText.click(function(){
		window.console.log('clicked clicked');
		$('.widget-search-box').toggleClass('full-width-text-box');
		}
	)

	//add the widget search box
	window.console.log('create the search box');
	var widgetSearchBox = $("<input/>");
	widgetSearchBox.attr('class','widget-search-box');
	widgetSearchBox.attr('placeholder','SEARCH TOPICS OR TAGS...');
	$(widgetSearchContainer).append(widgetSearchBox);

	$( widgetSearchBox ).keyup( function(){
		var filter =  $(this).val();
		window.console.log($(this).val());
		$(".post-container-class").each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			}
			else {
				$(this).show();
			}
		});
	});

	var widgetCoverContainer = $('<div>');
	widgetCoverContainer.attr('class','widget-cover-container');
	// widgetCoverContainer.attr('data-image-src',chrome.extension.getURL('assets/cover3.jpg'));

	widgetCoverContainer.css('background-image','url(\"'+chrome.extension.getURL('assets/cover3.jpg')+'\")' );
	widgetCoverContainer.html('WE CAN </br> END POLICE </br> VIOLENCE </br> IN </br>AMERICA.');
	//
	$(widgetMainBarContainer).append(widgetCoverContainer);

}

function createWidget()
{
	window.console.log('creating the container');
	var widgetContainer = $("<div/>");
	widgetContainer.attr('class','widget-container-class');
	$("body").append(widgetContainer);

	addWidgetMainContents()

}

function toggleWidget()
{
	console.log('toggle');
	if($('.widget-container-class').css('display') == 'none')
	{
		$('.widget-container-class').css('display','block');
	}
	else
	{
		$('.widget-container-class').css('display','none');
	}
}

/*********************************************************
LOAD JSON FILE
*********************************************************/

function loadStartJSONContent()
{

	window.console.log('loading the json file');

	var allPostsContainer = $("<section/>");
	allPostsContainer.attr('class','all-posts-container');
	$(".widget-container-class").append(allPostsContainer);

	var postContainerHeading = $("<div/>");
	postContainerHeading.attr('class','post-container-heading');
	postContainerHeading.html('Newest Reseach from Campaign Zero');
	$(allPostsContainer).append(postContainerHeading);

	window.console.log(JSONApiData);


	for(var i =0;i<JSONApiData.length;i++)
	{

		var postContainer = $("<div/>");
		var postContainerId = 'post-container-' + i;
		postContainer.attr('class','post-container-class');
		postContainer.attr('id',postContainerId);
		$(allPostsContainer).append(postContainer);


		var postContainerReferId = '#'+ postContainerId;
		var postTitle = $("<h4/>");
		postTitle.attr('class','post-title');
		$(postContainerReferId).append(postTitle);
		postTitle.html(JSONApiData[i].title);

		for(var j =0;j<JSONApiData[i]["tags"].length;j++)
		{
			var postTag = $("<h6/>");
			postTag.attr('class','post-tags');

			window.console.log(JSONApiData[i].tags.length);
			$(postContainerReferId).append(postTag);

			postTag.html(JSONApiData[i].tags[j].name);
			postTag.data("tagTag", JSONApiData[i].tags[j].name);
			postTag.click(function(){
				$( ".widget-search-box" )[0].value = this.innerHTML;
				filterByTag(this.innerHTML);
			});
			var tagBasedClassName = 'post-container-'+JSONApiData[i].tags[j].name;
			$(postContainerReferId).addClass(tagBasedClassName);


		}

		var postImage = $("<img/>");
		postImage.attr('class','post-image');
		$(postContainerReferId).append(postImage);
		postImage.attr('src','https://mpv-admin.herokuapp.com/'+JSONApiData[i].image.url);

		createTweet(JSONApiData[i],postContainerReferId);

		var postEnd = $("<hr/>");
		postEnd.attr('class','widget-line-divide');
		$(postContainerReferId).append(postEnd);

	}

}

/*********************************************************
TEST FUNCTIONS
*********************************************************/
function test()
{
	// document.body.style.backgroundColor="green";
	// window.console.log('yo machha');
	document.getElementById('tweet-box-home-timeline').innerHTML = 'tes test test test';
}

function createTweet(data, postContainer)
{

	var tweetDiv = $('<div>');
	tweetDiv.attr('class','custom-tweet-button');
	$(postContainer).append(tweetDiv);

	var tweetContainer = $('<a>');
	var tags = [];

	//add the tags
	for(var i =0;i<data.tags.length;i++){
		tags.push('%23'+data.tags[i].name);
	}
	tags = tags.toString();
	// tags = tags.replace(/#/g,'%23');

	//add the postUrl
	var postUrl = "https://mpv-admin.herokuapp.com/posts/" + data.id;

	//add the title
	var title = data.title;
	title = title.replace(/\s+/g, '%20')

	tweetContainer.attr('href','http://twitter.com/share?url=' + postUrl + '&text=' + tags);

	$(tweetDiv).append(tweetContainer);

}

! function(d, s, id) {
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (!d.getElementById(id)) {
				 js = d.createElement(s);
				 js.id = id;
				 js.src = "https://platform.twitter.com/widgets.js";
				 fjs.parentNode.insertBefore(js, fjs);
		 }
 }(document, "script", "twitter-wjs");
