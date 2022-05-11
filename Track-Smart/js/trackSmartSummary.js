// This code takes data in the format returned from the GetLinearData function of courseCalculator.
// Linear set of data with the required fields:
// - ID
// - Element Name
// - Title
// - Duration (recommended hours)
// - Available hours

function TrackSmartSummary (mode) {

    this.dom = {};
    this.dom.table = $('<table>', {"class": "table table-striped"});
    this.dom.thead = $('<thead>').appendTo(this.dom.table);
    this.dom.tbody = $('<tbody>').appendTo(this.dom.table);

    this.data = [];
    this.userData = [];

    this.mode = mode; // can be 'Exam' or 'Time'
}

TrackSmartSummary.prototype.setCourseData = function (data){

    this.data = data;

}

TrackSmartSummary.prototype.setUserData = function (data){

    this.userData = data;

}

TrackSmartSummary.prototype.outputTable = function (id, multiplier) {
    var i, item;
    var $row, $col1, $col2, $col3;
    var userData, icon;

    this.addHeader();
    for (i = 0; i < this.data.length; i++ ) {
        item = this.data[i];
        $row = $("<tr>").appendTo(this.dom.tbody);

        $col1 = $('<td>').appendTo($row);
        var indent = item.level * 3;
        var $div = $('<div>').css("marginLeft", indent + "%").appendTo($col1);
        if(item.hasChildren){
            $('<i>',{"class": "fa fa-folder text-warning mr-2"}).appendTo($div);
        } else {
            $('<i>',{"class": "fa fa-list-alt text-primary mr-2"}).appendTo($div);
        }

        if(item.elementName != ""){
            $('<span>', {"class": "lead"}).html('<strong>' + item.elementName + '</strong>').appendTo($div);
        }
        if(item.elementName != "" && item.title != ""){
            $("<br/>").appendTo($div);
        }
        if(item.title != ""){
            $('<small>').html(item.title).appendTo($div);
        }
        $col2 = $('<td>', {"class":"text-center"}).html(item.totalHours.toFixed(1)).appendTo($row);

        //userData = this.getUserDataById(item.id);
        //var avail = "";
        //if(userData != 0){
            //var dur = moment.duration(userData.totalDur, 'milliseconds');
            var dur = moment.duration(item.totalHours * multiplier, 'hours');
            var days = dur.as("days");
            var weeks = dur.as("weeks");
            if(days < 1){
                avail = "< a day";
            } else if (days == 1){
                avail = "1 day";
            } else if (days < 14) {
                avail = Math.ceil(days) + " days";
            } else if (days >= 14) {
                avail = Math.ceil(weeks) + " weeks";
            }
        //}
        if(this.mode == "Exam"){
            $col3 = $('<td>', {"class":"text-center"}).html(avail).appendTo($row);
        }
    }
    $('#' + id).html('').append(this.dom.table);
}

TrackSmartSummary.prototype.addHeader = function(){

    var $row = $('<tr>').appendTo(this.dom.thead);
    $('<th>', {scope: "col"}).html('<small><strong>' + transSummary.elementHeader + '</strong></small>').appendTo($row);
    $('<th>', {scope: "col", "class":"text-center"}).html('<small><strong>' + transSummary.recommendedHours + '</strong></small>').appendTo($row);
    if(this.mode == "Exam"){
        $('<th>', {scope: "col", "class":"text-center"}).html('<small><strong>' + transSummary.availableDays + '</strong></small>').appendTo($row);
    }
}

TrackSmartSummary.prototype.outputNarrative = function (targetId) {

    // Based on the last recorded userDate and what is left.
    // number of hours study / number of weeks left = how many hours a week of study to put in.



}

TrackSmartSummary.prototype.getUserDataById = function (id) {

    var i, item;

    for(i = 0; i < this.userData.length; i++ ) {
        item = this.userData[i];

        if(item.id == id){
            return item;
        }
    }
    return this.getUserDataBySectionId(id);
}


TrackSmartSummary.prototype.getUserDataBySectionId = function (id) {

    var i;
    var output = {
        duration: 0,
        pages: 0
    }
    return 0;
    //for(i = 0;)
}
