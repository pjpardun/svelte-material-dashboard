let Dim_EmailStatus = function() {
    return [
        {
         "DESC_EmailStatus": "No -  Dont Send (Historical)", 
         "ID_EmailStatus": "0"
        }, 
        {
         "DESC_EmailStatus": "Yes - Send Email", 
         "ID_EmailStatus": "1"
        }, 
        {
         "DESC_EmailStatus": "No - Under Dev/QA", 
         "ID_EmailStatus": "2"
        }, 
        {
         "DESC_EmailStatus": "No - Not Yet Seen", 
         "ID_EmailStatus": "3"
        }, 
        {
         "DESC_EmailStatus": "No - Lead Request Stop", 
         "ID_EmailStatus": "4"
        }, 
        {
         "DESC_EmailStatus": "No - Internally Tracking", 
         "ID_EmailStatus": "5"
        }, 
        {
         "DESC_EmailStatus": "No - Project Terminated", 
         "ID_EmailStatus": "6"
        }, 
        {
         "DESC_EmailStatus": "No - Project Archived", 
         "ID_EmailStatus": "7"
        }, 
        {
         "DESC_EmailStatus": "No - Project Email Stop", 
         "ID_EmailStatus": "8"
        }, 
        {
         "DESC_EmailStatus": "No - For dashboard reporting purposes only", 
         "ID_EmailStatus": "9"
        }
       ]
}
exports.get = Dim_EmailStatus

