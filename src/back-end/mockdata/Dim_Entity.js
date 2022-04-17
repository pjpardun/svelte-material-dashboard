const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

let Dim_Entity = function() {
    return [
        {
         "Entity_Type": "Medical Group", 
         "ID_Entity": 71, 
         "IS_Acute": null, 
         "Parent_Entity": 260, 
         "Entity_LVL": 3, 
         "Entity_Description": "Medical Group 1", 
         "Entity_Abbr":  null,
         "Parent_Facility": 68
        }, 
        {
         "Entity_Type": "Medical Group", 
         "ID_Entity": 81, 
         "IS_Acute": null, 
         "Parent_Entity": 261, 
         "Entity_LVL": 3, 
         "Entity_Description": "Medical Group 2", 
         "Entity_Abbr":  null,
         "Parent_Facility": 58
        }, 
        {
         "Entity_Type": "Medical Group", 
         "ID_Entity": 82, 
         "IS_Acute": null, 
         "Parent_Entity": 260, 
         "Entity_LVL": 3, 
         "Entity_Description": "Medical Group 3", 
         "Entity_Abbr":  null,
         "Parent_Facility": 52
        }, 
        {
         "Entity_Type": "Medical Group", 
         "ID_Entity": 85, 
         "IS_Acute": null, 
         "Parent_Entity": 261, 
         "Entity_LVL": 3, 
         "Entity_Description": "Medical Group 4", 
         "Entity_Abbr":  null,
         "Parent_Facility": 78
        }, 
        {
         "Entity_Type": "Medical Group", 
         "ID_Entity": 101, 
         "IS_Acute": null, 
         "Parent_Entity": 261, 
         "Entity_LVL": 3, 
         "Entity_Description": "Medical Group 5", 
         "Entity_Abbr":  null,
         "Parent_Facility": 61
        }, 
        {
         "Entity_Type": "Location", 
         "ID_Entity": 134, 
         "IS_Acute": null, 
         "Parent_Entity": 85, 
         "Entity_LVL": 4, 
         "Entity_Description": "Medical Group 6", 
         "Entity_Abbr":  null,
         "Parent_Facility": 78
        }, 
        {
         "Entity_Type": "Location", 
         "ID_Entity": 135, 
         "IS_Acute": null, 
         "Parent_Entity": 85, 
         "Entity_LVL": 4, 
         "Entity_Description": "Medical Group 7", 
         "Entity_Abbr":  null,
         "Parent_Facility": 78
        }, 
        {
         "Entity_Type": "Location", 
         "ID_Entity": 136, 
         "IS_Acute": null, 
         "Parent_Entity": 85, 
         "Entity_LVL": 4, 
         "Entity_Description": "Medical Group 8", 
         "Entity_Abbr":  null,
         "Parent_Facility": 78
        }, 
        {
         "Entity_Type": "Organizational Unit", 
         "ID_Entity": 138, 
         "IS_Acute": null, 
         "Parent_Entity": 140, 
         "Entity_LVL": 1, 
         "Entity_Description": "Medical Group 9", 
         "Entity_Abbr":  null,
         "Parent_Facility": null
        }, 
        {
         "Entity_Type": "Organizational Unit", 
         "ID_Entity": 139, 
         "IS_Acute": null, 
         "Parent_Entity": 140, 
         "Entity_LVL": 1, 
         "Entity_Description": "Medical Group 10", 
         "Entity_Abbr":  null,
         "Parent_Facility": null
        }, 
        { 
         "Entity_Type": "Organizational Unit", 
         "ID_Entity": 140, 
         "IS_Acute": null, 
         "Parent_Entity": 140, 
         "Entity_LVL": 0, 
         "Entity_Description": "Medical Group 11", 
         "Entity_Abbr":  null,
         "Parent_Facility": null
        }, 
        {
         "Entity_Type": "Location", 
         "ID_Entity": 232, 
         "IS_Acute": null, 
         "Parent_Entity": 85, 
         "Entity_LVL": 4, 
         "Entity_Description": "Ex eam", 
         "Entity_Abbr":  null,
         "Parent_Facility": 78
        },
        {
         "Entity_Type": "Foundation", 
         "ID_Entity": 260, 
         "IS_Acute": null, 
         "Parent_Entity": 138, 
         "Entity_LVL": 2, 
         "Entity_Description": "Medical Group 12", 
         "Entity_Abbr":  null,
         "Parent_Facility": 260
        }, 
        {
         "Entity_Type": "Foundation", 
         "ID_Entity": 261, 
         "IS_Acute": null, 
         "Parent_Entity": 139, 
         "Entity_LVL": 2, 
         "Entity_Description": "Medical Group 13", 
         "Entity_Abbr":  null,
         "Parent_Facility": 261
        }
       ]
}
exports.get = Dim_Entity
