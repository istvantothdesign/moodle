function TrackSmart(mode, data, cookies, refreshFnc) {

    this.SetData(data);

    this.cookies = cookies;
    this.refreshFnc = refreshFnc;

    this.mode = mode;

    this.studyEndDate = 0;
}

TrackSmart.prototype.SetData = function(data) {
    // The parameters for the calculations
    this.startDate   = data.startDate; // "2019-08-01",
    this.examDate    = data.examDate;
    this.studyHours  = data.studyHours;
    this.userRecords = data.userRecords; //[{date: "2019-08-12", progress: [7,8,9]}],
    this.multiplier  = 0;
    this.examDates   = data.examDates || [];

    // The main data holder of the data
    this.data = {
        source: data.courseData,
        timeline   : [],
        calendar   : [],
        summary    : [],
        totalTime  : 0,
        totalPages : 0,
        totalDays  : 0,
        examDif    : 0
    };
}

TrackSmart.prototype.Initialise = function () {

    // Calculate totals
    this.data.totalTime = this.GetTotalTime(this.data.source);
    this.data.totalPages = this.GetTotalPages(this.data.source);
    if(this.mode == "Exam") {
        this.data.examDif = this.GetSpanDuration(this.startDate, this.examDate);
        this.multiplier = this.data.examDif.asMilliseconds() / moment.duration(this.data.totalTime, "hours").asMilliseconds();
    }
    if(this.mode == "Time") {
        this.multiplier = 7 / this.studyHours;
    }

};

TrackSmart.prototype.LoadDataFile = function (data) {
    // Load the data as a whole

    this.data = data;
};

TrackSmart.prototype.GetTotalTime = function (section) {
    // Launch recursive function to return the total time
    var hours = 0;
    if(section.hasOwnProperty("hours")){
        hours += section.hours;
    }
    if(section.hasOwnProperty("subElements")){
        var sublength = section.subElements.length;
        var i = 0;
        for(i = 0; i < sublength; i++){
            hours += this.GetTotalTime(section.subElements[i]);
        }
    }
    return hours;
};

TrackSmart.prototype.GetTotalPages = function (section) {
    // Launch recursive function to return the total pages
    // Launch recursive function to return the total time
    var pages = 0;
    if(section.hasOwnProperty("pages")){
        pages += section.pages;
    }
    if(section.hasOwnProperty("subElements")){
        var sublength = section.subElements.length;
        var i = 0;
        for(i = 0; i < sublength; i++){
            pages += this.GetTotalPages(section.subElements[i]);
        }
    }
    return pages;
};

TrackSmart.prototype.GetLinearData = function (section, lvl, parentId) {

    var arr = [];
    parentId = parentId || "";

    if(lvl === undefined){
        lvl = 0;
    }

    var data = {
        id: section.hasOwnProperty("id") ? section.id : "",
        level: lvl,
        totalHours: this.GetTotalTime(section),
        totalPages: this.GetTotalPages(section),
        elementName: section.hasOwnProperty("elementName") ? section.elementName : "",
        title: section.hasOwnProperty("title") ? section.title : "",
        color: section.hasOwnProperty("color") ? section.color : "",
        parent: parentId,
        hasChildren: section.hasOwnProperty("subElements")
    }

    arr.push(data);

    if(section.hasOwnProperty("subElements")){
        var subLength = section.subElements.length;
        var subArr = [];
        var i = 0;
        var s;
        for(i = 0; i < subLength; i++){
            subArr = this.GetLinearData(section.subElements[i], lvl + 1, data.id);
            for(s = 0; s < subArr.length; s++){
                arr.push(subArr[s]);
            }
        }
    }
    return arr;
}

TrackSmart.prototype.CalculateOnUserRecords = function (upToLvl, section) {

    var usedList = [];
    var unusedList = [];

    var output = [];
    var lastDate = moment(this.startDate);

    var i, p;
    var sections = [];
    if(this.userRecords.length > 0){
        // Repeat through all of the user records

        var record, dur;

        for(i = 0; i < this.userRecords.length; i++){
            record = this.userRecords[i];
            dur = this.GetSpanDuration(lastDate, record.date);

            percent = dur.asMilliseconds() / this.data.examDif.asMilliseconds();

            // Get all of the section matching ids - if section has subElements, get summary of subElements
            var sec = {
                duration: dur,
                percent: percent,
                items: []
            }
            var thisItem;
            for(p = 0; p < record.progress.length; p++){
                thisItem = this.GetItemById(record.progress[p]);
                thisItem['complete'] = 1;
                if(thisItem.hasChildren == false){
                    sec.items.push(thisItem);
                    usedList.push(record.progress[p]);
                }
            }

            sections.push(sec);

            lastDate = moment(record.date);
        }
    }
    // Now, I should have all of the sections that the user has recorded as being finished.
    // Time to go through and get the remaining sections that haven't been completed yet up to the level set.

    // Now I need to recurse through to the certain level and check against what has already been used.
    // If it hasn't been used then I can add it to the unused list.
    var unusedDur = this.GetSpanDuration(lastDate, this.examDate);
    var unusedPer = unusedDur.asMilliseconds() / this.data.examDif.asMilliseconds();
    var unusedList = this.GetUnusedList(upToLvl, section, usedList);

    unusedSec = {
        duration: unusedDur,
        percent: unusedPer,
        items: unusedList
    }
    sections.push(unusedSec);

    // I now have all of the sections and all of the bits, I now need to calculate the percent of each individual based on the length of the section and generate the list needed for the actual timeline.
    // Calculate by finding the total time for the section by adding up all of the items.

    var lastTime = moment(this.startDate).add(12, "hours"); // This is to calculate the startDate and EndDate;

    for(i = 0; i < sections.length; i++){
        var totalTime = moment.duration(this.GetTotalItemTime(sections[i].items), "hours");
        for(p = 0; p < sections[i].items.length; p++){
            var item = sections[i].items[p];
            var mItemDuration = moment.duration(item.hours, "hours");
            var itemPercent = mItemDuration.asMilliseconds() / totalTime.asMilliseconds();
            var totalPerc = (itemPercent * sections[i].percent) * 100;

            var thisMil = this.data.examDif.asMilliseconds() * (totalPerc / 100);
            var endDate = moment(lastTime).add(thisMil, "milliseconds");

            output.push({
                id:    item.id,
                width: totalPerc,
                color: item.color,
                label: item.label,
                title: item.label.replace("<strong>","").replace("</strong><br/>", ": "),
                start: lastTime.format("YYYY-MM-DD"),
                end:   endDate.format("YYYY-MM-DD"),
                totalDur: thisMil,
                level: item.level
            });
            lastTime = endDate;
        }

    }

    return output;
}

TrackSmart.prototype.CalculateTimeOnUserRecords = function(upToLvl, section){

    // For the user records, we need to calclate the time within the user record and work out percentages within the user record.
    // Then once we know the full extent, we can calculate the percentage of the whole.

    // The remaining course items can we worked out differently but added to the whole list.
    // Then percentages of the whole worked out at the end.

  var usedList = [];
  var unusedList = [];

  var output = [];
  var lastTime = moment(this.startDate).add(0, "hours");
  var lastDate = moment(lastTime);

  var i, p;
  var sections = [];
  if(this.userRecords.length > 0){
      // Repeat through all of the user records

      var record, dur;

      for(i = 0; i < this.userRecords.length; i++){
          record = this.userRecords[i];
          dur = this.GetSpanDuration(lastDate, record.date);

          //percent = dur.asMilliseconds() / this.data.examDif.asMilliseconds();

          // Get all of the section matching ids - if section has subElements, get summary of subElements
          var sec = {
              duration: dur,
              percent: 0,
              items: []
          }

          var subItem, totalTime = 0;
          for(p = 0; p < record.progress.length; p++){
              subItem = this.GetItemById(record.progress[p]);
              if(subItem.hasChildren == false) {
                  sec.items.push(subItem);
                  usedList.push(record.progress[p]);
                  totalTime += subItem.hours;
              }
          }
          var itemPercent, itemDuration;
          var lastItemDate = moment(lastDate);
          var itemEndDate;
          for(p = 0; p < sec.items.length; p++){
              subItem = sec.items[p];
              itemPercent = subItem.hours / totalTime;
              itemDuration = dur.asMilliseconds() * itemPercent;
              itemEndDate = moment(lastItemDate).add(itemDuration, "milliseconds");

              output.push({
                  id:    subItem.id,
                  width: 0,
                  color: subItem.color,
                  label: subItem.label,
                  title: subItem.label.replace("<strong>","").replace("</strong><br/>", ": "),
                  start: lastItemDate.format("YYYY-MM-DD"),
                  end:   itemEndDate.format("YYYY-MM-DD"),
                  totalDur: itemDuration,
                  level: subItem.level,
                  complete: 1
              });
              lastItemDate = itemEndDate;
          }


          sections.push(sec);

          lastDate = moment(record.date);
      }
  }
  // Now, I should have all of the sections that the user has recorded as being finished.
  // Time to go through and get the remaining sections that haven't been completed yet up to the level set.

  var unusedList = this.GetUnusedList(upToLvl, section, usedList);

  unusedSec = {
      duration: 0,
      percent: 0,
      items: unusedList
  }
  sections.push(unusedSec);

  // I now have all of the sections and all of the bits, I now need to calculate the percent of each individual based on the length of the section and generate the list needed for the actual timeline.
  // Calculate by finding the total time for the section by adding up all of the items.

  //var lastTime = moment(this.startDate).add(12, "hours"); // This is to calculate the startDate and EndDate;
  lastTime = moment(lastDate);

  var totalTime = moment.duration(this.GetTotalItemTime(unusedSec.items) * this.multiplier, "days");
  for(i = 0; i < unusedSec.items.length; i++){
      //for(p = 0; p < sections[i].items.length; p++){
          var item = unusedSec.items[i];
          var mItemDuration = moment.duration(item.hours * this.multiplier, "days");
          var itemPercent = mItemDuration.asMilliseconds() / totalTime.asMilliseconds();
          //var totalPerc = (itemPercent * sections[i].percent) * 100;

          //var thisMil = this.data.examDif.asMilliseconds() * (totalPerc / 100);
          var endDate = moment(lastTime).add(mItemDuration.asMilliseconds(), "milliseconds");

          output.push({
              id:    item.id,
              width: 0,
              color: item.color,
              label: item.label,
              title: item.label.replace("<strong>","").replace("</strong><br/>", ": "),
              start: lastTime.format("YYYY-MM-DD"),
              end:   endDate.format("YYYY-MM-DD"),
              totalDur: mItemDuration.asMilliseconds(),
              level: item.level,
              complete: 0
          });
          lastTime = endDate;
      //}

  }

  // Now we know when the last date is for learning. We can see when the closest exam is to that date.
  // Then we can calculate the percentages for the timeline.

  this.examDate = this.getNearestExamDate(lastTime);
  this.studyEndDate = lastTime;

  if(this.examDate != this.studyEndDate){
      // Calculate how much of a gap between the last date and the exam and add as a section.
      var revisionPeriod = this.GetSpanDuration(lastTime, this.examDate);
      output.push({
          id: -1,
          width: 0,
          color: '#cccccc',
          label: "Revision time",
          title: "Revision time",
          start: lastTime.format("YYYY-MM-DD"),
          end: this.examDate.format("YYYY-MM-DD"),
          totalDur: revisionPeriod.asMilliseconds(),
          level: 0
      });
  }

  // Then repeat through all of the output filling in the width, percentages.
  var totalFromStartToExam = this.GetSpanDuration(this.startDate, this.examDate);
  for (i = 0; i < output.length; i++){
        output[i].width = ( output[i].totalDur / totalFromStartToExam.asMilliseconds() ) * 100;
  }


  return output;
}

TrackSmart.prototype.InterpretUserList = function(){
    var output = [];
    var i, n, record, item;

    for(i = 0; i < this.userRecords.length; i++){
        record = this.userRecords[i];
        item = {
            date: record.date,
            progress: [],
            ids: []
        }
        for(n = 0; n < record.progress.length; n++){
            prog = this.GetItemById(record.progress[n]);
            item.progress.push(prog.label);
            item.ids.push(record.progress[n]);
        }
        output.push(item);
    }
    return output;
}

TrackSmart.prototype.GetUnusedList = function(upToLvl, section, usedList, unusedList, lvl){

    unusedList = unusedList || [];
    lvl = lvl || 0;
    var thisItem;
    if(lvl == upToLvl || section.hasOwnProperty("subElements") == false){
        if(section.hasOwnProperty("id")){
            if(usedList.indexOf(section.id) < 0){
                thisItem = this.GetItemById(section.id);
                thisItem.complete = 0;
                unusedList.push(thisItem);
            }
        }
    } else if (section.hasOwnProperty("subElements")){
        var i;
        for(i = 0; i < section.subElements.length; i++){
            unusedList = this.GetUnusedList(upToLvl, section.subElements[i], usedList, unusedList, lvl + 1);
        }
    }
    return unusedList;
}

TrackSmart.prototype.GetTotalItemTime = function(itemList) {
    var i;
    var output = 0;
    var item;

    for(i = 0; i < itemList.length; i++){
        item = itemList[i];
        output += item.hours;
    }
    return output;
}

TrackSmart.prototype.GetItemById = function ( id, section, elementName, color, lvl ) {

    section = section || this.data.source;
    elementName = section.hasOwnProperty("elementName") ? section.elementName : elementName;
    color = section.hasOwnProperty("color") ? section.color : color;
    lvl = lvl || 0;

    var hasSubElements = section.hasOwnProperty("subElements");

    if(section.hasOwnProperty("id")){

        if(section.id == id){

            var output = {
                id: id,
                hours: (hasSubElements ? this.GetTotalTime(section) : (section.hasOwnProperty("hours") ? section.hours : 0) ),
                pages: (hasSubElements ? this.GetTotalPages(section) : (section.hasOwnProperty("pages") ? section.pages : 0) ),
                label: this.GetTitle(elementName, section),
                color: color,
                level: lvl,
                hasChildren: hasSubElements
            }

            return output;

        }

    }

    if(hasSubElements) {
        var subLength = section.subElements.length;
        var i;
        for(i = 0; i < subLength; i++){

            var res = this.GetItemById( id, section.subElements[i], elementName, color, lvl + 1 );
            if(res !== false){
                return res;
            }
        }

    }

    return false;

}

TrackSmart.prototype.GetTitle = function (elementName, section) {
    if(elementName === undefined && section.hasOwnProperty("title") == false) {
        return "";
    } else if(elementName === undefined && section.hasOwnProperty("title")){
        return section.title;
    } else if (section.hasOwnProperty("title")) {
        return "<strong>" + elementName + "</strong><br/>" + section.title;
    } else {
        return "<strong>" + elementName + "</strong>";
    }
}

TrackSmart.prototype.GetSpanDuration = function(startDate, endDate){

    sdate = typeof(startDate) == "string" ? moment(startDate) : startDate;
    edate = typeof(endDate) == "string" ? moment(endDate) : endDate;

    return moment.duration(edate.diff(sdate));

}

TrackSmart.prototype.addToUserRecord = function(data) {

    var dateExists = 0;

    var i, item;
    for(i = 0; i < this.userRecords.length; i++){
        item = this.userRecords[i];

        if(data.date == item.date){
            dateExists = 1;
            var n;
            for(n = 0; n < data.progress.length; n++){
                this.userRecords[i].progress.push(data.progress[n]);
            }

        }
    }


    if(dateExists == 0){
        this.userRecords.push(data);
    }

    setSaveData(trackSmartCookies.userData, this.userRecords);
    this.refreshFnc();
}

TrackSmart.prototype.clearUserRecords = function() {
    this.userRecords = [];
    setSaveData(trackSmartCookies.userData, this.userRecords);
    this.refreshFnc();
}

TrackSmart.prototype.getNearestExamDate = function( lastDate ){
    var i;
    var lDate = typeof(lastDate) == "string" ? moment(lastDate) : lastDate;
    var examDate;

    for(i = 0; i < this.examDates.data.length; i ++) {
        examDate = moment(this.examDates.data[i][this.examDates.mapping["value"]]);

        if(lDate.isBefore(examDate)){
            return examDate;
        }
    }

    return lastDate;

}
