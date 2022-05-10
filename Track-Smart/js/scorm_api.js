var SCORMapi = {
    active: 0,
    student_id: 0,
    student_name: 0,
    suspend: 0,
    suspendJSON: 0,
    obj: pipwerks
}

function SCORMConnect(){
    pipwerks.SCORM.version = "1.2";
	var success = pipwerks.SCORM.init();
	if(success){
        SCORMapi.active = 1;

		var lessonStatus = pipwerks.SCORM.get("cmi.core.lesson_status");

		if(lessonStatus == "completed" || lessonStatus == "passed"){

		} else {
			success = pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
		}
		SCORMapi.student_id = pipwerks.SCORM.get("cmi.core.student_id");
        SCORMapi.student_name = pipwerks.SCORM.get("cmi.core.student_name");
        SCORMapi.suspend = pipwerks.SCORM.get("cmi.suspend_data");
        if(SCORMapi.suspend == ""){
            SCORMapi.suspend = "{}";
        }
        try {
            SCORMapi.suspendJSON = JSON.parse(SCORMapi.suspend);
        } catch (e) {
            SCORMapi.suspendJSON = {};
        }
	}
	else
	{
		SCORMapi.active = 0;
	}
}

function setComplete(){
	var lessonStatus = pipwerks.SCORM.get("cmi.core.lesson_status");

	if(lessonStatus != "completed" && lessonStatus != "passed"){
		success = pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
	}
}

function getSCORMData(key){
    if(SCORMapi.suspendJSON[key] === undefined){
        return "";
    } else {
        return SCORMapi.suspendJSON[key];
    }
}

function setSCORMData(key, value){
    SCORMapi.suspendJSON[key] = value;
    SCORMapi.suspend = JSON.stringify(SCORMapi.suspendJSON);
    var result = pipwerks.SCORM.set("cmi.suspend_data", SCORMapi.suspend);
    SCORMapi.obj.SCORM.save();
}
