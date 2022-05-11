function getExamDates(codes, fnc) {

    var url = "https://api.astutis-resources.com/getExamDates.php";

    var settings = {
        crossDomain: true,
        data: {
            "f": "GetDates",
            "codes": codes
        },
        dataType: "json",
        method: "POST",
        url: url,
        success: function(obj, status){
            examResults(obj, status, fnc);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    };

    $.ajax(settings);
}

function examResults(obj, status, fnc){
    if(obj.Result == "Success"){
        var options = obj.Data;

        fnc(options);
    }
}

function examResultsToSelect(options){
    var mapping = {
        "value": 0,
        "label": 1
    };

    setSelectOptions("exam-date", options, mapping);
    trackSmartInitialisation[1] = 1;
}

function examResultsToVar(options){
    trackSmartExamDates = {
        mapping: {
            "value": 0,
            "label": 1
        },
        data: options
    };
    trackSmartInitialisation[1] = 1;
}

function setSelectOptions(id, data, mapping) {

    var domSel = $('#' + id);

    var selected = domSel.val();

    domSel.html('');

    var i;

    for(i = 0; i < data.length; i++){
        var option = data[i];
        $('<option>')
            .attr("value", option[mapping['value']])
            .html(option[mapping['label']])
            .appendTo(domSel);
    }

}

function getSavedData(key){
    // Check SCORM API to see if running within LMS.

    // If SCORM API active, use pipwerks
    if(SCORMapi.active == 1){
        return getSCORMData(key);
    } else {
        // Otherwise use cookies
        return getMyCookie(key);
    }
}

function setSaveData(key, value){
    // Check SCORM api to see if running within LMS
    if(SCORMapi.active == 1){
        return setSCORMData(key, value);
    } else {
        // Otherwise use cookies
        setMyCookie(key, value);
    }
}

function getMyCookie(key){

    return Cookies.get(key);

}

function setMyCookie(key, value){

    Cookies.set(key, value, {expires: 1825});

}
