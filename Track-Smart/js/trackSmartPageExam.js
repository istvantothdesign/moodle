// All of this script can be the same, the only bit that needs changing is the getCourseData function which can be a separate file.

// [startDate, latestExamDates]
var trackSmartInitialisation = [0, 0];
var trackSmartCookies = {
    startDate: "astTrackSmartStartDate" + courseCode,
    examDate: "astTrackSmartExamDate" + courseCode,
    userData: "astTrackSmartUserData" + courseCode
}
$(function() {

    // Check to see if running in LMS. If so, add the unload script to commit changes.
    SCORMConnect();
    // if(SCORMapi.active == 1){
    //     $(window).on('unload', function() {
    //         unloadPage();
    //     });
    // }

    var startDate = getSavedData(trackSmartCookies.startDate);
    if(startDate != null && startDate != ""){
        $('#start-date').val(startDate);
    }
    trackSmartInitialisation[0] = 1;

    if(examDateCodes.length > 0){
        getExamDates(examDateCodes, examResultsToSelect);
    } else {
        trackSmartInitialisation[1] = 1;
    }
    // Check cookies for saved data. We're looking for:
    // Start date, exam date, hours per week, user saved data

    setTimeout(checkProceed, 100);
});


function checkProceed(){
    var total = 0;
    var i;
    for (i = 0; i < trackSmartInitialisation.length; i++){
        total += trackSmartInitialisation[i];
    }
    if(total == trackSmartInitialisation.length){
        initiateTrackSmart()
    } else {
        setTimeout(checkProceed, 100);
    }
}

function initiateTrackSmart(){
    // When the dates have been loaded, it can update the calendar, not before.

    var examDate = getSavedData(trackSmartCookies.examDate);
    if(examDate != null && examDate != ""){
        $('#exam-date').val(examDate);
        $('#user-date').val(examDate);
    }

    $('#start-date').on("change", startChange);
    $('#exam-date').on("change", examChange);
    $('#user-date').on("blur", examChange);
    $('#user-date').on("input", examChange);

    refreshTrackSmart();
}

function startChange(a){
    setSaveData(trackSmartCookies.startDate, this.value);
    refreshTrackSmart();
}

function examChange(a){
    setSaveData(trackSmartCookies.examDate, this.value);
    $('#user-date').val(this.value);
    refreshTrackSmart();
}

function refreshTrackSmart(){
    var startDateVal = $('#start-date').val();
    if(startDateVal == ""){
        startDateVal = moment().format("YYYY-MM-DD");
        $('#start-date').val(startDateVal);
    }
    var userDateVal = $('#user-date').val();
    var examDateVal = userDateVal == "" ? $('#exam-date').val() : userDateVal;
    if(examDateVal == null) {
        examDateVal = new Date(moment()+60*60*24*182*1000).toISOString().slice(0,10);
    }

    var trackSmartData = {
        startDate  : startDateVal,
        examDate   : examDateVal,
        studyHours  : 0,
        userRecords: [],
        courseData: getCourseData()
    };

    var userData = getSavedData(trackSmartCookies.userData);
    if(userData !== undefined && userData != ""){
        if(typeof(userData) == "string"){
            userData = JSON.parse(userData);
        }
        if(Array.isArray(userData)){
            trackSmartData.userRecords = userData;
        }
    }

    var ts = new TrackSmart("Exam", trackSmartData, trackSmartCookies, refreshTrackSmart);

    ts.Initialise();


    // Calculating the timeline based on what the user has recorded as complete.
    var timelineData = ts.CalculateOnUserRecords(3, trackSmartData.courseData);
    var timeline = new TrackSmartTimeline(trackSmartData.startDate, trackSmartData.examDate, timelineData, trackSmartData.userRecords);

    timeline.getOutput($('#timelineView'));

    var linearData = ts.GetLinearData(trackSmartData.courseData);


    // Fill in the breakdown of recommended study hours.
    var summary = new TrackSmartSummary(ts.mode);
    summary.setCourseData(linearData);
    summary.outputTable('studyHoursBreakdown', ts.multiplier);


    // Fill in the calendar
    var calendar = new TrackSmartCalendar();
    calendar.setEvents(timelineData);
    calendar.addToEvents({
        color: "#27a600",
        title: "Exam day!",
        start: examDateVal,
        end: examDateVal
    });
    calendar.refresh('jsCalendar', 'calendarCard');


    // Fill in the progress area
    $('#updateProgress').html('');

    var descriptiveUserRecords = ts.InterpretUserList();
    progress = new TrackSmartProgress(ts);
    progress.setUserData(linearData, descriptiveUserRecords);
    progress.getOutput($('#updateProgress'));

    // Initiate the tooltips
    $('[data-toggle="tooltip"]').tooltip();
}
