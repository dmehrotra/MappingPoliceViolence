var availableTags = [
	"policeKillings",
	"trend",
	"likelihood",
	"location",
	"cities"
];
//can this be recieved by an api call ?

var JSONData =
{
	"banner": "Police killed at least 346 black people in the U.S. in 2015.",
	"data":
	[
		{
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

function filterByTag(tagName)
{
	var projects = $('.post-container-class').css("display","none");
  var projects = $('.post-container-'+tagName).css("display","block");
}

//NEED TO FIX THE FONT
var isOpen = 0;
var widgetCreate = 0;
widgetOnLoad();

function widgetOnLoad()
{
	addStyleSheet();
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

}

function addStyleSheet()
{

	var style1 = document.createElement('link');
	style1.rel = 'stylesheet';
	style1.type = 'text/css';
	style1.href = chrome.extension.getURL('jquery-ui.css');
	(document.head||document.documentElement).appendChild(style1);

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

	var widgetHeading = $("<div/>");
	widgetHeading.attr('class','widget-heading');
	$(".widget-main-bar-container").append(widgetHeading);
	$('.widget-heading').html('MAPPING POLICE VIOLENCE');

	//3 tabs
	window.console.log('create the tabs');
	var widgetTabId = ['widget-all-tag','widget-faq-tag'];
	var widgetTabHeadings = ['ALL','FAQ'];

	for(var i=0;i<2;i++)
	{
		var widgetTab = $("<div/>");
		widgetTab.attr('class','widget-tabs');
		widgetTab.attr('id',widgetTabId[i]);
		$(".widget-main-bar-container").append(widgetTab);

		var tempId = '#'  + widgetTabId[i];
		$(tempId).html(widgetTabHeadings[i]);

	}

	//add the widget search box
	window.console.log('create the search box');
	var widgetSearchBox = $("<input/>");
	widgetSearchBox.attr('class','widget-search-box');
	widgetSearchBox.attr('placeholder','Search topics or tags...');
	$(".widget-main-bar-container").append(widgetSearchBox);

	$( ".widget-search-box" ).autocomplete({
      source: availableTags,
			select: function( event, ui ) {
				window.console.log('selected Tag -- ' + ui.item.value);
				filterByTag(ui.item.value);
			}
    });
	// $('.widget-heading').html('MAPPING POLICE VIOLENCE');

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
	//console.log(JSONData);

	var widgetBanner = $("<div/>");
	widgetBanner.attr('class','widget-banner');
	$(".widget-main-bar-container").append(widgetBanner);
	$('.widget-banner').html(JSONData.banner);

	var allPostsContainer = $("<section/>");
	allPostsContainer.attr('class','all-posts-container');
	$(".widget-container-class").append(allPostsContainer);

	for(var i =0;i<JSONData.data.length;i++)
	{
		var postContainer = $("<div/>");
		var postContainerId = 'post-container-' + i;
		postContainer.attr('class','post-container-class');
		postContainer.attr('id',postContainerId);
		$(".all-posts-container").append(postContainer);


		var postContainerReferId = '#'+ postContainerId;
		var postTitle = $("<h4/>");
		postTitle.attr('class','post-title');
		$(postContainerReferId).append(postTitle);
		postTitle.html(JSONData.data[i].title);

		for(var j =0;j<JSONData.data[i].tags.length;j++)
		{
			var postTag = $("<h6/>");
			postTag.attr('class','post-tags');

			//window.console.log(JSONData.data[i].tags[j]);
			$(postContainerReferId).append(postTag);

			postTag.html(JSONData.data[i].tags[j]);
			postTag.data("tagTag", JSONData.data[i].tags[j]);
			postTag.click(function(){
				filterByTag(this.innerHTML);
			});
			var tagBasedClassName = 'post-container-'+JSONData.data[i].tags[j];
			$(postContainerReferId).addClass(tagBasedClassName);
		}

		var postImage = $("<img/>");
		postImage.attr('class','post-image');
		$(postContainerReferId).append(postImage);
		postImage.attr('src',JSONData.data[i].imgUrl);

		var postEnd = $("<hr/>");
		postEnd.attr('class','widget-line-divide');
		$(postContainerReferId).append(postEnd);


	}


	window.console.log('loaded the json file');
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
