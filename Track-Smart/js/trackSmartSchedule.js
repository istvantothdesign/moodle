function TrackSmartSchedule () {

}

TrackSmartSchedule.prototype.setCoreData = function (data) {

    this.coreData = data;

}

TrackSmartSchedule.prototype.setTimelineData = function (data) {

    this.timelineData = data;

}

TrackSmartSchedule.prototype.getOutput = function(dom){

    dom.html('');
    // Repeat from startDate to end of items
    var startWeekDay = moment(this.coreData.startDate).day(0);
    var stopper = 0;
    var i;
    var startDay, endDay;
    var weekCard, weekList;
    var thisItem, startIn, endIn;

    while(stopper < 500){
        startDay = moment(startWeekDay).add(stopper,"weeks");
        endDay = moment(startDay).add(6, "days");
        weekCard = $('<div>', {"class": "card mb-2"});
        $('<div>', {"class":"card-header"}).html('<strong>Week: ' + startDay.format("Do MMMM") + " - " + endDay.format("Do MMMM YYYY") + '</strong>').appendTo(weekCard);
        weekList = $('<ul>', {"class": "list-group list-group-flush"}).appendTo(weekCard);

        var courseMatches = 0;

        for(i = 0; i < this.timelineData.length; i ++){
            thisItem = this.timelineData[i];
            // check if startdate is between these
            // check if end date is between these
            // moment().isBetween(startDate, endDate, null, "[]");
            startIn = moment(thisItem.start).isBetween(startDay, endDay, null, "[]");
            endIn = moment(thisItem.end).isBetween(startDay, endDay, null, "[]");
            spansWeek = moment(thisItem.start).isBefore(startDay) && moment(thisItem.end).isAfter(endDay);
            var aMatch = false;
            var matchIcon, matchString, matchColor;
            if(spansWeek){
                aMatch = true;
                matchIcon = "fa-hourglass";
                matchString = transSchedule.continueStudy;
                matchColor = "text-primary";
            } else if(startIn && endIn){
                aMatch = true;
                matchIcon = "fa-hourglass";
                matchString = transSchedule.covered;
                matchColor = "text-primary";
            } else if (startIn) {
                aMatch = true;
                matchIcon = "fa-hourglass-start";
                matchString = transSchedule.startStudy;
                matchColor = "text-success";
            } else if (endIn){
                aMatch = true;
                matchIcon = "fa-hourglass-end";
                matchString = transSchedule.finishStudy;
                matchColor = "text-danger";
            }
            if(aMatch){
                $('<li>', {"class": "list-group-item"}).html( '<span class="'+matchColor+' font-weight-bold"><span class="fa '+matchIcon+'"></span> ' +  matchString +'</span><span style="color: '+thisItem.color + '">' + thisItem.title + '</span>' ).appendTo(weekList);
                courseMatches ++;
            }
        }
        if (courseMatches > 0) {
            dom.append(weekCard);
        } else {
            stopper = 501;
        }
        stopper ++;
    }

    //dom.html(output);
}
