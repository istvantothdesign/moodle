# PR007-TrackSmart™

## Introduction

There are several elements that go together to make the TrackSmart system work.

1. The HTML files that specify the exam dates to lookup, data file and prefix for saved data
2. The data file and how that is structured
3. The various elements that appear on screen
   - The timeline
   - The calendar
   - The course outline
   - The progress

## The HTML file

The parts to change on the HTML pages are under the comment 'Specific to this page'.

```html
<!-- Specific to this page -->
<script type="text/javascript">
  var examDateCodes = ["ng2"];
  var courseCode = "NG2Online";
</script>
<script src="js/data/courseData_NG2_Online.js"></script>
<script src="js/trackSmartPageExam.js"></script>
```

Change the `examDateCodes` to pick up all of the exams with that exam association in the CRM.

The `courseCode` refers to the data that is being saved either in SCORM data or cookies. This will make sure that data is not mixed in with other courses.

The script looking in the `js/data/` folder is looking for the data file to use to process.

The last line refers to whether this is an exam date tracker (`js/trackSmartPageExam.js`) or a time based tracker (`js/trackSmartPageTime.js`).

_You may also want to change the introduction text to reflect the course and update the navbar._

## The data file

The data file should be located in the `js/data/` folder and contains the `getCourseData` function that returns a javascript object.
The data is designed to be recursive to as many levels as needed by using `subElements` to nest sections inside of other sections.
There are a number of properties that can be used and a few rules to follow.

1. Each item is required to have a unique `id` for that list of data as an integer.
2. `elementName` describes a larger group of pages. Can be used for course names, element names, section names.
3. `title` describes the specific item. Usually used for a specific page. Can be used with elementName.
4. `color` specifies the colour of this item and any sub-items used in the timeline and outline sections.
5. `hours` should only be used at the very bottom level items (items with no sub-elements). Every item higher up will be calculated based on these values. This is a decimal number representing the hour as a whole (1 hour 30 minutes will be 1.5).
6. `pages` should also be used at the very bottom level.
7. `subElements` is an array of objects that contain at least an `id` and either `elementName` or `title` and any combination of the other properties.

```js
function getCourseData() {
  return {
    id: 1,
    elementName: "NEBOSH GC",
    subElements: [
      {
        id: 2,
        elementName: "NG Element 1",
        title: "Why should we manage workplace health and safety",
        color: "#28a745",
        subElements: [
          {
            id: 4,
            title: "Morals and Money",
            color: "#28a745",
            hours: 1.45,
            pages: 8,
          },
          {
            id: 5,
            title: "The force of the law - punishment and compensation",
            color: "#2cb34a",
            hours: 1.45,
            pages: 8,
          },
        ],
      },
    ],
  };
}
```
