let DimTemplateStatus = function() {
    return [
        { "ID_TemplateStatus": 1, "Desc_TemplateStatus": "Active Reporting" },
        { "ID_TemplateStatus": 2, "Desc_TemplateStatus": "In Development" },
        { "ID_TemplateStatus": 3, "Desc_TemplateStatus": "No Longer in Development" },
        { "ID_TemplateStatus": 4, "Desc_TemplateStatus": "Retired" }
    ]
}
exports.get = DimTemplateStatus

