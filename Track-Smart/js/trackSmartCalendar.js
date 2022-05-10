function TrackSmartCalendar() {

    this.info = {
        header: {
            center: 'dayGridMonth,listMonth'
        },
        views: {
            dayGridMonth: {
                buttonText: "Month"
            },
            listMonth: {
                buttonText: "List"
            }
        },
        plugins: ['dayGrid', 'list', 'bootstrap'],
        defaultDate: moment().format("YYYY-MM-DD"),
        editable: true,
        themeSystem: 'bootstrap',
        eventLimit: true, // allow "more" link when too many events
        eventTextColor: '#fff',
        events: []
    }

}

TrackSmartCalendar.prototype.addToEvents = function(data){

    this.info.events.push(data);

}

TrackSmartCalendar.prototype.setEvents = function(data){

    this.setProp("events", data);

}

TrackSmartCalendar.prototype.setProp = function(prop, val) {

    this.info[prop] = val;

}

TrackSmartCalendar.prototype.refresh = function (target, trigger){
    var calendar;
    $('#' + target).html('');
    var calendarEl = document.getElementById(target);

    calendar = new FullCalendar.Calendar(calendarEl, this.info);

    calendar.render();

    $('#'+trigger).on('shown.bs.collapse', function() {
        $('#' + target).html('');
        calendar.render();
        calendar.updateSize();
    });
}
