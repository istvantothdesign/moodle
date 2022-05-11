// All of this script can be the same, the only bit that needs changing is the getCourseData function which can be a separate file.

// [startDate, latestExamDates]
var trackSmartInitialisation = [0, 0];
var trackSmartCookies = {
    startDate: "astTrackSmartStartDate" + courseCode,
    studyHours: "astTrackSmartStudyHours" + courseCode,
    userData: "astTrackSmartUserData" + courseCode
}
var trackSmartExamDates = {
    mapping: {},
    data: []
};

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

    // This needs to be modified to allow the return of exam dates to be stored in a variable.
    if(examDateCodes.length > 0){
        getExamDates(examDateCodes, examResultsToVar);
    } else {
        trackSmartInitialisation[1] = 1;
    }
    
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

    var studyHours = getSavedData(trackSmartCookies.studyHours);
    if(studyHours != null && studyHours != ""){
        $('#study-hours').val(studyHours);
    }

    $('#start-date').on("change", startChange);
    $('#study-hours').on("change", studyHoursChange);

    refreshTrackSmart();
}

function startChange(a){
    setSaveData(trackSmartCookies.startDate, this.value);
    refreshTrackSmart();
}

function studyHoursChange(a){
    setSaveData(trackSmartCookies.studyHours, this.value);
    refreshTrackSmart();
}

function refreshTrackSmart(){
    var startDateVal = $('#start-date').val();
    if(startDateVal == ""){
        startDateVal = moment().format("YYYY-MM-DD");
        $('#start-date').val(startDateVal);
    }
    var studyHoursVal = $('#study-hours').val();
    if(studyHoursVal == ""){
        studyHoursVal = "5";
        $('#study-hours').val(studyHoursVal);
    }


    var trackSmartData = {
        startDate  : startDateVal,
        examDate   : 0,
        studyHours : studyHoursVal,
        userRecords: [],
        courseData : getCourseData(),
        examDates  : trackSmartExamDates
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

    var ts = new TrackSmart("Time", trackSmartData, trackSmartCookies, refreshTrackSmart);

    ts.Initialise();


    // Calculating the timeline based on what the user has recorded as complete.
    var timelineData = ts.CalculateTimeOnUserRecords(3, trackSmartData.courseData);
    trackSmartData.examDate = ts.examDate;
    var timeline = new TrackSmartTimeline(trackSmartData.startDate, trackSmartData.examDate, timelineData, trackSmartData.userRecords);

    timeline.getOutput($('#timelineView'));
    var studyEndDate = moment(ts.studyEndDate).format("Do MMMM YYYY");
    var closestExamDate = moment(trackSmartData.examDate).format("Do MMMM YYYY");
    var strSD = transPageTime.summary.replace(/{studyEndDate}/g, studyEndDate);
    var strED = strSD.replace(/{closestExamDate}/g, closestExamDate);

    $('#earliestExam').html(strED);

    var linearData = ts.GetLinearData(trackSmartData.courseData);


    // Fill in the breakdown of recommended study hours.
    var summary = new TrackSmartSummary(ts.mode);
    summary.setCourseData(linearData);
    summary.outputTable('studyHoursBreakdown', ts.multiplier);


    // Fill in the schedule
    var schedule = new TrackSmartSchedule();
    schedule.setCoreData(trackSmartData);
    schedule.setTimelineData(timelineData);
    schedule.getOutput($('#scheduleOutput'));

    // Fill in the calendar
    //var calendar = new SmartTrackCalendar();
    //calendar.setEvents(timelineData);
    //calendar.addToEvents({
    //    color: "#27a600",
    //    title: "Exam day!",
    //    start: examDateVal,
    //    end: examDateVal
    //});
    //calendar.refresh('jsCalendar', 'calendarCard');


    // Fill in the progress area
    $('#updateProgress').html('');

    var descriptiveUserRecords = ts.InterpretUserList();
    progress = new TrackSmartProgress(ts);
    progress.setUserData(linearData, descriptiveUserRecords);
    progress.getOutput($('#updateProgress'));

    // Initiate the tooltips
    $('[data-toggle="tooltip"]').tooltip();
}
