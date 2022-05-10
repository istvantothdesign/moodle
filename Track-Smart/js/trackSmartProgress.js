function TrackSmartProgress(controller) {

    this.controller = controller;

    this.dom = {};
    this.dom.table = $('<table>', {"class": "table table-striped"});
    this.dom.thead = $('<thead>').appendTo(this.dom.table);
    this.dom.tbody = $('<tbody>').appendTo(this.dom.table);

    this.labels = {
        elementHeader: "Part of course",
        cardHeader: "Marked as complete on ",
        cardHeaderDateFormat: "Do MMMM YYYY",
        btn: "Mark selected items as complete"
    }

    this.courseData = [];
    this.userData = [];
    this.completeIds = [];
}

TrackSmartProgress.prototype.setUserData = function (courseData, userData) {

    this.courseData = courseData || [];
    this.userData = userData || [];

}

TrackSmartProgress.prototype.getOutput = function (domObj) {

    // Go through each of the userdata elements and show what has been completed on what date block;

    var i, record;
    var dest = $(domObj);

    for(i = 0; i < this.userData.length; i++){
        record = this.userData[i];
        this.createCompleteCard(record, !(i==0)).appendTo(dest);
    }

    // Add a reset progress button.
    if(this.userData.length > 0){
        var $resetBtn = $('<button>', {"class": "btn btn-primary mt-2 brand4"}).html("Clear all progress").appendTo(dest);
        var me = this;
        $resetBtn.on("click", function(){
            me.resetProgress();
        })
    }
    // Then go through what remains to show what is left to tick off.

    // Add individual rows checking if they have children or not and assigning them functions if they do

    var n, record;
    for(n = 0; n < this.courseData.length; n++){
        record = this.courseData[n];
        if(this.completeIds.indexOf(record.id) < 0){
            this.addTableRow(record).appendTo(this.dom.tbody);
        }
    }

    var $card = $("<div>", {"class": "card mt-2"});
    var $cardBody = $('<div>', {"class": "card-body"}).appendTo($card);
    $('<h5>', {"class":"card-title"}).html("The following have not been marked as complete.").appendTo($cardBody);

    $cardBody.append(this.dom.table);
    dest.append($card);

    // Add button at the end and assigning it a function as well.
    var me = this;
    var $btn = $("<button>", {"class": "btn btn-primary brand4"}).html(this.labels.btn).appendTo($cardBody);
    $btn.on("click", function(a) {
        me.SetItemsComplete();

    })

}

TrackSmartProgress.prototype.addTableRow = function (record) {
    var $row = $('<tr>');

    var $chkCell = $('<td>', {"class":"text-center"}).appendTo($row);
    var $chk, icon;
    if(record.hasChildren){
        $chk = $('<input>', {"class": "progressCheckBox progressCheckBoxParent", type: "checkbox", value: record.id, name: "progressChkBox", id: "prog_" + record.id, "ast-parent": record.parent}).appendTo($chkCell);
        //icon = '<i class="fa fa-folder text-warning"></i> ';
    } else {
        $chk = $('<input>', {"class": "progressCheckBox progressCheckBoxChild", type: "checkbox", value: record.id, name: "progressChkBox", id: "prog_" + record.id, "ast-parent": record.parent}).appendTo($chkCell);
        //icon = '<i class="fa fa-list-alt text-primary"></i> ';
    }


    var $itemCell = $('<td>').appendTo($row);
    var $padded = $('<div>').css("margin-left", (record.level * 3) + "%").appendTo($itemCell);
    var $label = $('<label>', {for: "prog_" + record.id}).css({"margin-bottom":"0px"}).appendTo($padded);
    //$('<span>', {"class":"lead"}).html(icon + this.GetTitle(record)).appendTo($label);
    if(record.hasChildren){
        $('<i>',{"class": "fa fa-folder text-warning mr-2"}).appendTo($label);
    } else {
        $('<i>',{"class": "fa fa-list-alt text-primary mr-2"}).appendTo($label);
    }
    if(record.elementName != ""){
        $('<span>', {"class": "lead"}).html('<strong>' + record.elementName + '</strong>').appendTo($label);
    }
    if(record.elementName != "" && record.title != ""){
        $("<br/>").appendTo($label);
    }
    if(record.title != ""){
        $('<small>').html(record.title).appendTo($label);
    }



    var me = this;
    if(record.hasChildren){
        $chk.on("change", function(a) {
            me.SelectChildren(this.value, this.checked);
        });
    }

    return $row;
}

TrackSmartProgress.prototype.createCompleteCard = function(record, mt){
    var recordDate = moment(record.date);
    // record.progress
    var mt2 = mt ? " mt-2" : "";
    var $card = $("<div>", {"class": "card" + mt2});
    var $cardBody = $('<div>', {"class": "card-body"}).appendTo($card);
    $('<h5>', {"class":"card-title"}).html(this.labels.cardHeader + recordDate.format(this.labels.cardHeaderDateFormat)).appendTo($cardBody);

    var $listGroup = $('<ul>', {"class":"list-group"}).appendTo($cardBody);
    for(var n = 0; n < record.progress.length; n ++){
        $('<li>', {"class":"list-group-item"}).html('<i class="fa fa-check-circle text-success"></i> ' + record.progress[n]).appendTo($listGroup);
        this.completeIds.push(record.ids[n]);
    }
    return $card;
}


TrackSmartProgress.prototype.addHeader = function(){

    var $row = $('<tr>').appendTo(this.dom.thead);
    $('<th>', {scope: "col", "class":"text-center"}).html('').appendTo($row);
    $('<th>', {scope: "col"}).html('<small><strong>' + this.labels.elementHeader + '</strong></small>').appendTo($row);

}


TrackSmartProgress.prototype.GetTitle = function (record) {
    var hasEN = record.elementName != "";
    var hasTL = record.title != "";

    if(hasEN == false && hasTL == false) {
        return "";
    } else if(hasEN == false && hasTL == true){
        return record.title;
    } else if (hasTL == true) {
        return "<strong>" + record.elementName + "</strong><br/>" + record.title;
    } else {
        return "<strong>" + record.elementName + "</strong>";
    }
}

TrackSmartProgress.prototype.SelectChildren = function(id, checked) {
    // Select all of the children who have the parent attribute id and set their checked to be the same as this checked.

    var list = $("input:checkbox[ast-parent='" + id + "']").prop('checked', checked);

    var n, item;
    for(n = 0; n < list.length; n++){
        item = list[n];
        this.SelectChildren(item.value, checked);
    }

}


TrackSmartProgress.prototype.SetItemsComplete = function() {

    var check = $(".progressCheckBox:checked");

    var progressList = [];

    var i, item;

    for (i = 0; i < check.length; i++){
        item = check[i];
        progressList.push(Number(item.value));
    }

    var saveDate = moment().format("YYYY-MM-DD");

    var newEntry = {
        date: saveDate,
        progress: progressList
    }
    this.controller.addToUserRecord(newEntry);
}


TrackSmartProgress.prototype.resetProgress = function(){

    this.controller.clearUserRecords();

}
