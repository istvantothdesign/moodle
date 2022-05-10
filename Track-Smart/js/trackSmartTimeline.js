// This script is designed to work with the courseCalculator.js controller file.

function TrackSmartTimeline(startDate, examDate, data, events) {

    this.uid = Math.floor(Math.random() * 900) + 100;

    this.startDate = startDate;
    this.examDate = examDate;

    // Data needs to be formatted in a linear style rather than nested
    // e.g. [{width: 5, color: "#ffd", "Prep for course"}, {width: 10, color: "#ffd", "Fsdfs"}...]
    this.data = data;
    this.events = events || [];

    this.dom = {
        dateRow     : $("<div>", {id: this.uid + "_dates"}),
        timelineRow : $("<div>", {id: this.uid + "_timeline", "class": "row"}),
        currentRow  : $("<div>", {id: this.uid + "_current",  "class": "row mb-3"})
    };

    /*this.strings = {
        timelineStart : "Start",
        timelineEnd   : "Exam",
        userTarget    : "You should be here",
        userComplete  : "User marked sections as complete"
    }*/

    // How to split the date segments
    this.dateSegments = 6;
}

TrackSmartTimeline.prototype.setData = function ( data ) {

    this.data = data;

}

TrackSmartTimeline.prototype.getOutput = function ( target ) {

    target.html('');
    target.append(this.getDatesOutput());
    target.append(this.getProgressOutput());
    target.append(this.getEventOutput());

}

TrackSmartTimeline.prototype.getDatesOutput = function () {

    var sdate, edate;
    var dateDif;
    var dayInterval;
    var bsCols;
    var i, $col;
    var intDate, mCls;
    var dateString;

    sdate = typeof(this.startDate) == "string" ? moment(this.startDate) : this.startDate;
    edate = typeof(this.examDate) == "string" ? moment(this.examDate) : this.examDate;

    dateDif = moment.duration(edate.diff(sdate));

    dayInterval = dateDif.asMilliseconds() / (this.dateSegments - 1);
    bsCols = 12 / this.dateSegments;

    $headerRow = $('<div>', {"class": "row"}).appendTo(this.dom.dateRow);
    $("<div>", { "class": "col-6" }).html('<p class="text-left mb-0"><lead>' + transTimeline.timelineStart + '</lead></p>').appendTo($headerRow);
    $("<div>", { "class": "col-6" }).html('<p class="text-right mb-0"><lead>' + transTimeline.timelineEnd + '</lead></p>').appendTo($headerRow);

    var $bodyRow = $('<div>', {"class": "row"}).appendTo(this.dom.dateRow);
    for(i = 0; i < this.dateSegments; i++) {
        $col = $("<div>", {"class": "col-" + bsCols}).appendTo($bodyRow);
        intDate = moment(sdate).add(dayInterval * i, 'ms');

        dateString = moment(intDate).format("D-MMM-YY");
        $("<p>", {"class": "mb-0 text-center"}).html("<small>"+dateString+"</small>").appendTo($col);
        $("<p>", {"class": "text-center mb-0 mt-0"}).html('<i class="fas fa-angle-down"></i>').appendTo($col);
        $col.appendTo($bodyRow);
    }

    return this.dom.dateRow;
}

TrackSmartTimeline.prototype.getProgressOutput = function () {

    $("<div>", {"class" : "col-1"}).html("&nbsp;").appendTo(this.dom.timelineRow);
    var $col = $("<div>", {"class" : "col-10"}).css("padding", "0px").appendTo(this.dom.timelineRow);
    var $prog = $("<div>", {"class" : "progress"}).appendTo($col);

    var len = this.data.length;
    var i, item, current;

    for(i = 0; i < len; i++){
        item = this.data[i];
        current = $("<div>", {"class": "progress-bar text-truncate"}).appendTo($prog);
        current.css({"background-color": item.color, "width": item.width + "%"});
        current.attr({"data-toggle":"tooltip", "data-placement":"bottom", "data-html":"true", title:item.label});
    }

    return this.dom.timelineRow;
}

TrackSmartTimeline.prototype.getEventOutput = function () {

    $("<div>", {"class" : "col-1"}).html("&nbsp;").appendTo(this.dom.currentRow);

    var $col = $("<div>", {"class": "col-10"})
        .css({
            "padding": "0px",
            "position": "relative",
            "height": "100px"
        })
        .appendTo(this.dom.currentRow);

    var sdate = typeof(this.startDate) == "string" ? moment(this.startDate) : this.startDate;
    var edate = typeof(this.examDate) == "string" ? moment(this.examDate) : this.examDate;

    var totalDuration = moment.duration(edate.diff(sdate));

    // Add the "You should be here" arrow.
    var todayDuration = moment.duration(moment().diff(sdate));
    var perc = ( todayDuration.asMilliseconds() / totalDuration.asMilliseconds() ) * 100;

    if(perc > 0 && perc < 100) {
        var $youAreHere = $("<div>", {"class": "timeline_event"}).css("left", perc + "%").appendTo($col);
        $("<p>",{"class":"text-center mb-0 mt-0"}).html('<i class="fas fa-arrow-up"></i>').appendTo($youAreHere);
        $("<p>",{"class":"small"}).html(transTimeline.userTarget).appendTo($youAreHere);
    }

    // Add the events - When the users has logged completion of elements.
    var i;
    var thisDuration;
    var thisPerc;
    var $thisEvent;

    for (i = 0; i < this.events.length; i++){
        thisDuration = moment.duration(moment(this.events[i].date).diff(sdate));
        perc = ( thisDuration.asMilliseconds() / totalDuration.asMilliseconds() ) * 100;

        if(perc > 0 && perc < 100){
            $thisEvent = $("<div>", {"class": "timeline_event"}).css("left", perc + "%").appendTo($col);
            $("<p>",{"class":"text-center mb-0 mt-0"})
                .html('<i class="fas fa-angle-up"></i>')
                .attr({
                    "data-toggle": "tooltip",
                    "data-placement": "bottom",
                    "data-html":"true",
                    "title": "<strong>" + moment(this.events[i].date).format("D-MMM-YY") + "</strong><br/>" + transTimeline.userComplete
                })
                .appendTo($thisEvent);

        }
    }


    return this.dom.currentRow;
}

TrackSmartTimeline.prototype.getMonthName = function (monthNum) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum];
}

TrackSmartTimeline.prototype.setString = function (key, value) {
    this.strings[key] = value;
}
