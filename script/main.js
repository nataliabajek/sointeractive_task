// Events data array
var timelineData = [];
timelineData[0] = ['02.06.2015','Lorem ipsum dolor sit','<i class="fa fa-heart" aria-hidden="true"></i>'];
timelineData[1] = ['11.06.2015','Consectetur adipisicing elit','<i class="fa fa-flask" aria-hidden="true"></i>'];
timelineData[2] = ['15.06.2015','Ducimus alias similique','<i class="fa fa-gavel" aria-hidden="true"></i>'];
timelineData[3] = ['22.06.2015','Officiis voluptate suscipit','<i class="fa fa-graduation-cap" aria-hidden="true"></i>'];
timelineData[4] = ['30.06.2015','Non cum nobis aspernatur','<i class="fa fa-trophy" aria-hidden="true"></i>'];

var regexp = /^\w+/g;
var timelineWidth = ($('.timeline').width());
var timelineMinDist = timelineWidth / 30;
var distance = [];
var marginLeft = [];
var eventDate = [];
var eventName = [];
var currentDate = ['10.06.2015'];

function fillDateArray() {
  timelineData.forEach(function (eventdate){
    var date = eventdate[0];
    var day = parseInt(date.match(regexp));
    eventdate.push(day);
  });
}

function distanceFromBeggining() {
  timelineData.forEach(function (day) {
    var date = parseInt(day[3]);
    distance.push(date * timelineMinDist);
  });
}  

function distanceBetweenDates() {
  distance.forEach(function (dist) {
    marginLeft.push(dist - 20)
  });
}

function fillEventArrays() {
  timelineData.forEach(function (event) {
    eventName.push(event[1]);
    eventDate.push(event[0]);
  });
}

function fillCurrentDateArray() {
  currentDate.push(parseInt(currentDate[0].match(regexp)));
  currentDate.push(currentDate[1] * timelineMinDist);
}

function addPointsToTimeline() {
  timelineData.forEach(function (icon) {
    $('.timeline').append(icon[2]);
    $('.mobileTimeline').append(icon[2]);
  });
  $('i').wrap('<div class="container"><div class="iconWrap"><div class="icon"></div></div></div>');
  for (var i=0; i<=marginLeft.length; i++){
    $('.timeline > .container:nth-of-type('+i+')').css('margin-left', marginLeft[i-1] / timelineWidth * 100 + "%");
  };
}

function tollTipDiv() {
  $('.timeline').find('.icon').append('<div class="tooltipText"></div>');
  for (var i=0; i<=timelineData.length; i++){
    $('.timeline > .container:nth-of-type('+i+') > .iconWrap > .icon > .tooltipText').wrapInner('<h1>'+eventDate[i-1]+'</h1><p>'+eventName[i-1]+'</p>');
  };
}

function textContainer() {
  $('.mobileTimeline').find('.container').append('<div class="textContainer"></div>');
  for (var i=0; i<=timelineData.length; i++){
    $('.mobileTimeline > .container:nth-of-type('+i+') > .textContainer').wrapInner('<h1>'+eventDate[i-1]+'</h1><p>'+eventName[i-1]+'</p>');
  };
}

function highlight() {
  // Timeline highlight
  $('.timeline').prepend('<div class="timelineHighlight"></div>');
  $('.timelineHighlight').css('width', currentDate[2] / timelineWidth * 100 + "%");
  // Icon and Tooltip highlight
  for (var i=0; i<timelineData.length; i++){
    if ( currentDate[1] > timelineData[i][3] ) {
      $('.timeline > .container:nth-of-type('+(i+2)+')').find('.icon').addClass('iconHighlight');
      $('.timeline > .container:nth-of-type('+(i+2)+')').find('i').addClass('iHighlight');
      $('.mobileTimeline > .container:nth-of-type('+(i+1)+')').find('.icon').addClass('iconHighlight');
      $('.mobileTimeline > .container:nth-of-type('+(i+1)+')').find('i').addClass('iHighlight');
      $('.timeline > .container:nth-of-type('+(i+2)+')').find('.tooltipText').addClass('tooltipHighlight');
    }
  };
}

$( document ).ready(function() {
  fillDateArray();
  distanceFromBeggining();
  distanceBetweenDates();
  fillEventArrays();
  fillCurrentDateArray();
  addPointsToTimeline();
  tollTipDiv();
  textContainer();
  highlight();

});