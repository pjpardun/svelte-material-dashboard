'use strict';

// Database connection stuff
// const sql = require('mssql/msnodesqlv8');
const dbConfig = require('../dbConfig');

// Mock data stuff
const DESC_ChangeDirection = require('../mockdata/DESC_ChangeDirection');
const DESC_MetricType = require('../mockdata/DESC_MetricType');
const avoidanceDesc = require('../mockdata/DIM_Avoidance_Desc');
const dimTemplateProjectSpecialty = require('../mockdata/Dim_TemplateProject_Specialty');
const dimProjectSetting = require('../mockdata/DimProjectSetting');
const dimProjectType = require('../mockdata/Dim_ProjectType');
const dimSpecialty = require('../mockdata/Dim_Specialty');
const dimTemplateMeasure = require('../mockdata/DimTemplateMeasure');
const dimTemplateProject = require('../mockdata/DimTemplateProject');
const dimTemplateStatus = require('../mockdata/Dim_TemplateStatus');
const SWProviderSource = require('../mockdata/SWProviderSource');

const dimProject = require('../mockdata/Dim_Project');
const dimUsers = require('../mockdata/Dim_Users');
const dimProjectStatus = require('../mockdata/Dim_ProjectStatus');
const dimEmailStatus = require('../mockdata/Dim_EmailStatus');
const dimMeasure = require('../mockdata/Dim_Measure');
const dimSpecialtyModifier = require('../mockdata/Dim_SpecialtyModifier');
const dimProjectSpecialtyModifier = require('../mockdata/Dim_Project_Specialty_Modifier');
const dimEntity = require('../mockdata/Dim_Entity');
const dimProjectEntity = require('../mockdata/Dim_Project_Entity');
const dimUsersRoles = require('../mockdata/Dim_UsersRoles');
const dimTemplateMeasureDev = require('../mockdata/DimTemplateMeasureDev');


// Switch to decide whether backend MSSQL database or mock data source are used
let useMockSource = true;
if (useMockSource) { console.log("Using mock data source..."); } 
else { console.log("Connecting to database..."); }

// Get config and start the connection pool (actual datasource)
let configObject = dbConfig.get();
console.log(configObject);

// const pool = new sql.ConnectionPool(configObject);


/**
 * Get DESC_ChangeDirection from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getDESC_ChangeDirection= function(req, res) {
    // if (useMockSource) {
        res.json( DESC_ChangeDirection.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT ID_ChangeDirection, DESC_ChangeDirection FROM DESC_ChangeDirection', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};

/**
 * Get DESC_MetricType from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getDESC_MetricType = function(req, res) {
    // if (useMockSource) {
        res.json( DESC_MetricType.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT ID_MetricType, DESC_MetricType FROM DESC_MetricType', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};

/**
 * Get DIM_Avoidance_Desc from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getavoidanceDesc = function(req, res) {
    if (useMockSource) {
        res.json( avoidanceDesc.get() );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT Avoidance_ID, DESC_Avoidance_Name FROM DIM_Avoidance_Desc', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get TemplateProjectSpecialty from the lookup table.
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateSpecialty = function(req, res) {
    if (useMockSource) {
        res.json( dimTemplateProjectSpecialty.get().map( specialty => {
            return {
                "ID_TemplateProject": specialty["ID_TemplateProject"],
                "ID_Specialty": specialty["ID_Specialty"]
            }
        }) );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_TemplateProject, ID_Specialty FROM Dim_TemplateProject_Specialty', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get TemplateProjectSpecialty by the specified templateID (ID_TemplateProject)
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateSpecialtyById = function(req, res) {
    if (useMockSource) {
        res.json( dimTemplateProjectSpecialty.get().filter( templateSpecialty => 
            templateSpecialty["ID_TemplateProject"] == req.query.templateID
        ).map( specialty => {
            return {
                "ID_TemplateProject": specialty["ID_TemplateProject"],
                "ID_Specialty": specialty["ID_Specialty"]
            }
        }) );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_TemplateProject, ID_Specialty FROM Dim_TemplateProject_Specialty WHERE ID_TemplateProject = ' + req.query.templateID, (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get DimProjectSetting from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateSetting = function(req, res) {
    // if (useMockSource) {
        res.json( dimProjectSetting.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT ID_ProjectSetting, DESC_ProjectSetting FROM DimProjectSetting', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};

/**
 * Get DimProjectType from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateType = function(req, res) {
    if (useMockSource) {
        res.json( dimProjectType.get() );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_ProjectType, DESC_ProjectType FROM Dim_ProjectType', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get long list of Dim_Specialty entries from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.getSpecialties = function(req, res) {
    if (useMockSource) {
        res.json( dimSpecialty.get().filter( s => s["Specialty_LVL"] == 3) );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_Specialty, Specialty FROM Dim_Specialty', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get all the Template Measures from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateMeasures = function(req, res) {
    if (useMockSource) { 
        res.json( [].concat(
            dimTemplateMeasure.get().map( measure => {
                measure["FL_Duplicate_Numerator"] = measure["FL_Duplicate_Numerator"] == 1;
                measure["FL_PatientExperience"] = measure["FL_PatientExperience"] == 1;
                measure["FL_StandardMeasure"] = measure["FL_StandardMeasure"] == 1;
                measure["FL_DuplicateDenom"] = measure["FL_DuplicateDenom"] == 1;
                measure["FL_ActiveMeasure"] = measure["FL_ActiveMeasure"] == 1;
                measure["FL_SpreadMeasure"] = measure["FL_SpreadMeasure"] == 1;
                measure["FL_Population"] = measure["FL_Population"] == 1;
                measure["FL_Balance"] = measure["FL_Balance"] == 1;
                measure["FL_Savings"] = measure["FL_Savings"] == 1;
                measure["FL_Success"] = measure["FL_Success"] == 1;

                return measure;
            })
        ));
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT FL_Duplicate_Numerator, FL_PatientExperience, FL_StandardMeasure, FL_DuplicateDenom, FL_ActiveMeasure, FL_SpreadMeasure, FL_Population, FL_Balance, FL_Savings, FL_Success FROM Dim_TemplateMeasure', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }

};

/**
 * Get all the Template Measure related to the specified TemplateID (ID_TemplateProject)
 * @param {*} req 
 * @param {*} res 
 */
exports.getMeasureByTemplateId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimTemplateMeasure.get().filter( item => 
                item.ID_TemplateProject == req.query.templateID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            }).map( measure => {
                measure["FL_Duplicate_Numerator"] = measure["FL_Duplicate_Numerator"] == 1;
                measure["FL_PatientExperience"] = measure["FL_PatientExperience"] == 1;
                measure["FL_StandardMeasure"] = measure["FL_StandardMeasure"] == 1;
                measure["FL_DuplicateDenom"] = measure["FL_DuplicateDenom"] == 1;
                measure["FL_ActiveMeasure"] = measure["FL_ActiveMeasure"] == 1;
                measure["FL_SpreadMeasure"] = measure["FL_SpreadMeasure"] == 1;
                measure["FL_Population"] = measure["FL_Population"] == 1;
                measure["FL_Balance"] = measure["FL_Balance"] == 1;
                measure["FL_Savings"] = measure["FL_Savings"] == 1;
                measure["FL_Success"] = measure["FL_Success"] == 1;
                
                return measure;
            })
        );

    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_TemplateMeasure, ID_TemplateProject, FL_StandardMeasure, DESC_MeasureName, DESC_MetricType, DESC_MeasureType, DESC_DenominatorType, DESC_NumeratorType, DESC_ChangeDirection, FL_Success, FL_Savings, FL_Balance, FL_Population, DESC_Subject, FL_ActiveMeasure, FL_MonthLag, DESC_Exclusions, FL_DuplicateDenom, FL_SpreadMeasure, FL_PatientExperience, DESC_AvoidanceName, DESC_SummaryTable, Dep_Inclusion, Dep_ProviderField, Dep_ProviderSource, Dep_LocationField, FL_Duplicate_Numerator, Parent_TemplateMeasure, Parent_TemplateProject, Threshold FROM Dim_TemplateMeasure WHERE ID_TemplateProject = ' + req.query.templateID, (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }

};

/**
 * Get Templates for the Template List view. This is just a subset of the total columns, but it
 * retrieves all of them, so that the user can navigate through a complete list of template items.
 * The full record is pulled on an individual basis using getTemplateById.
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplates = function(req, res) {
    if (useMockSource) {
        // Always return this static mocked data
        res.json( dimTemplateProject.get().map( item => {
            return {
                "ID_TemplateProject": item.ID_TemplateProject,
                "DESC_ProjectName": item.DESC_ProjectName,
                "DESC_ProjectType": item.DESC_ProjectType,
                "Dep_AcuteOrFacility": item.Dep_AcuteOrFacility,
                "DESC_TemplateStatus": item.DESC_TemplateStatus
            }
        }) );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_TemplateProject, DESC_ProjectName, DESC_ProjectType, Dep_AcuteOrFacility, DESC_TemplateStatus FROM Dim_TemplateProject', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
    
};

/**
 * Get complete Template record given the template ID.
 * Example: http://localhost:3000/measureByTemplateId?templateID=3
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateById = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimTemplateProject.get().filter( item => 
                item.ID_TemplateProject == req.query.templateID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT * FROM Dim_TemplateProject WHERE ID_TemplateProject = ' + req.query.templateID, (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};

/**
 * Get Dim_TemplateStatus from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getTemplateStatus = function(req, res) {
    if (useMockSource) {
        res.json( dimTemplateStatus.get() );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_TemplateStatus, Desc_TemplateStatus FROM Dim_TemplateStatus', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }

};


/**
 * Get reference data from SWProviderSource
 * @param {*} req 
 * @param {*} res 
 */
exports.getSWProviderSource = function(req, res) {
    // if (useMockSource) {
        res.json( SWProviderSource.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT Dep_ProviderSourceKey, Dep_ProviderSource FROM SWProviderSource', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
    
};




/**
 * Get Projects for the Project List view. This is just a subset of the total columns, but it
 * retrieves all of them, so that the user can navigate through a complete list of template items.
 * The full record is pulled on an individual basis using getProjectById.
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjects = function(req, res) {
    if (useMockSource) {
        // Always return this static mocked data
        res.json( dimProject.get().map( item => {
            return {
                "ID_ProjectDim": item.ID_ProjectDim,
                "DESC_ProjectName": item.DESC_ProjectName,
                "DESC_ProjectType": item.DESC_ProjectType,
                "ID_TemplateProject": item.ID_TemplateProject,
                "DESC_ProjectStatus": item.DESC_ProjectStatus,
                "ID_BusinessAnalyst": item.ID_BusinessAnalyst,
                "DT_ProjectStartDate": item.DT_ProjectStartDate,
                "DESC_ProvSpec": item.DESC_ProvSpec
            }
        }) );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_ProjectDim, DESC_ProjectName, DESC_ProjectType, ID_TemplateProject, DESC_ProjectStatus FROM Dim_Project', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
    
};

/**
 * Get complete Project record given the project ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectById = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimProject.get().filter( item => 
                item.ID_ProjectDim == req.query.projectID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT * FROM Dim_Project WHERE ID_ProjectDim = ' + req.query.projectID, (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }
};


/**
 * Get dim_Users from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimUsers = function(req, res) {
    // if (useMockSource) {
        res.json( dimUsers.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT * FROM Dim_Users', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};



/**
 * Get Dim_ProjectStatus from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectStatus = function(req, res) {
    // if (useMockSource) {
        res.json( dimProjectStatus.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT ID_ProjectStatus, DESC_ProjectStatus FROM Dim_ProjectStatus', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};


/**
 * Get Dim_EmailStatus from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getEmailStatus = function(req, res) {
    // if (useMockSource) {
        res.json( dimEmailStatus.get() );
    // } else {
    //     // Open connection
    //     pool.connect().then(() => {
    //         // 
    //         pool.request().query('SELECT ID_EmailStatus, DESC_EmailStatus FROM Dim_EmailStatus', (err, result) => {
    //             if (err) {
    //                 // Log any errors
    //                 console.log("err"); console.log(err);
    //                 res.json({"error":err});
    //             }
    //             else { 
    //                 // Send the data back to the caller
    //                 res.json(result.recordset);
    //             }
    //         })
    //     })
    //     .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    // }
};




/**
 * Get all the Project Measures from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.getMeasures = function(req, res) {
    if (useMockSource) { 
        res.json( [].concat(
            dimMeasure.get().map( measure => {
                measure["FL_Duplicate_Numerator"] = measure["FL_Duplicate_Numerator"] == 1;
                measure["FL_PatientExperience"] = measure["FL_PatientExperience"] == 1;
                measure["FL_StandardMeasure"] = measure["FL_StandardMeasure"] == 1;
                measure["FL_DuplicateDenom"] = measure["FL_DuplicateDenom"] == 1;
                measure["FL_ActiveMeasure"] = measure["FL_ActiveMeasure"] == 1;
                measure["FL_SpreadMeasure"] = measure["FL_SpreadMeasure"] == 1;
                measure["FL_Population"] = measure["FL_Population"] == 1;
                measure["FL_Balance"] = measure["FL_Balance"] == 1;
                measure["FL_Savings"] = measure["FL_Savings"] == 1;
                measure["FL_Success"] = measure["FL_Success"] == 1;

                return measure;
            })
        ));
    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT FL_Duplicate_Numerator, FL_PatientExperience, FL_StandardMeasure, FL_DuplicateDenom, FL_ActiveMeasure, FL_SpreadMeasure, FL_Population, FL_Balance, FL_Savings, FL_Success FROM Dim_Measure', (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }

};

/**
 * Get all the Project Measure related to the specified ProjectID (ID_ProjectDim)
 * @param {*} req 
 * @param {*} res 
 */
exports.getMeasureByProjectId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimMeasure.get().filter( item => 
                item.ID_ProjectDim == req.query.projectID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            }).map( measure => {
                measure["FL_Duplicate_Numerator"] = measure["FL_Duplicate_Numerator"] == 1;
                measure["FL_PatientExperience"] = measure["FL_PatientExperience"] == 1;
                measure["FL_StandardMeasure"] = measure["FL_StandardMeasure"] == 1;
                measure["FL_DuplicateDenom"] = measure["FL_DuplicateDenom"] == 1;
                measure["FL_ActiveMeasure"] = measure["FL_ActiveMeasure"] == 1;
                measure["FL_SpreadMeasure"] = measure["FL_SpreadMeasure"] == 1;
                measure["FL_Population"] = measure["FL_Population"] == 1;
                measure["FL_Balance"] = measure["FL_Balance"] == 1;
                measure["FL_Savings"] = measure["FL_Savings"] == 1;
                measure["FL_Success"] = measure["FL_Success"] == 1;
                
                return measure;
            })
        );

    } else {
        // // Open connection
        // pool.connect().then(() => {
        //     // 
        //     pool.request().query('SELECT ID_ProjectDim, FL_Duplicate_Numerator, FL_PatientExperience, FL_StandardMeasure, FL_DuplicateDenom, FL_ActiveMeasure, FL_SpreadMeasure, FL_Population, FL_Balance, FL_Savings, FL_Success FROM Dim_Measure WHERE ID_ProjectDim = ' + req.query.projectID, (err, result) => {
        //         if (err) {
        //             // Log any errors
        //             console.log("err"); console.log(err);
        //             res.json({"error":err});
        //         }
        //         else { 
        //             // Send the data back to the caller
        //             res.json(result.recordset);
        //         }
        //     })
        // })
        // .catch(err => {console.log("SQL DB connection error"); console.log(err); res.send(err); });
    }

};


/**
 * Get DimSpecialtyModifier from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getSpecialtyModifier = function(req, res) {
    // if (useMockSource) {
        res.json( dimSpecialtyModifier.get() );
    // } else {
    // }
};

/**
 * Get DimProjectSpecialtyModifier from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectSpecialtyModifier = function(req, res) {
    // if (useMockSource) {
        res.json( dimProjectSpecialtyModifier.get() );
    // } else {
    // }
};


/**
 * Get complete Project Specialty Modifier record given the project ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectSpecialtyModifierByProjectId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimProjectSpecialtyModifier.get().filter( item => 
                item.ID_ProjectDim == req.query.projectID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
    }
};



/**
 * Get DimEntity from the database
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimEntity = function(req, res) {
    // if (useMockSource) {
        res.json( dimEntity.get().filter( s => s["Entity_LVL"] == 3) );
    // } else {
    // }
};

/**
 * Get DimProjectEntity from the datab.filter( s => s["Specialty_LVL"] == 3)ase
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimProjectEntity = function(req, res) {
    // if (useMockSource) {
        res.json( dimProjectEntity.get() );
    // } else {
    // }
};


/**
 * Get complete Project Entity record given the project ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectEntityByProjectId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimProjectEntity.get().filter( item => 
                item.ID_ProjectDim == req.query.projectID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
    }
};


/**
 * Get DimUsersRoles
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimUsersRoles = function(req, res) {
    // if (useMockSource) {
        res.json( dimUsersRoles.get() );
    // } else {
    // }
};


/**
 * Get complete Project Entity record given the project ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimUsersRolesByUserId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimUsersRoles.get().filter( item => 
                item.ID_UserID == req.query.userID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            }).map( role => {
                role["FL_Subscriber"] = role["FL_Subscriber"] == 1;
                role["FL_BusinessAnalyst"] = role["FL_BusinessAnalyst"] == 1;
                role["FL_ProjectLead"] = role["FL_ProjectLead"] == 1;
                role["FL_Admin"] = role["FL_Admin"] == 1;
                role["FL_Champion"] = role["FL_Champion"] == 1;
                role["FL_ReportsAnalyst"] = role["FL_ReportsAnalyst"] == 1;
                
                return role;
            })
        );
    } else {
    }
};


/**
 * Get complete User record given the User ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimUserByUserId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimUsers.get().filter( item => 
                item.ID_UserID == req.query.userID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
    }
};



/**
 * Get DimTemplateMeasureDev
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimTemplateMeasureDev = function(req, res) {
    // if (useMockSource) {
        res.json( dimTemplateMeasureDev.get() );
    // } else {
    // }
};


/**
 * Get complete Template Measure Dev record given the project ID.
 * Example: 
 * @param {*} req 
 * @param {*} res 
 */
exports.getDimTemplateMeasureDevByTemplateId = function(req, res) {
    if (useMockSource) {
        res.json( 
            dimTemplateMeasureDev.get().filter( item => 
                item.ID_TemplateProject == req.query.templateID
            ).map( item => {
                // Replace any nulls with empty quotes
                let i = item;
                Object.keys(item).map( key => {
                    if (item[key] == null) {
                        i[key] = ""
                    }
                })
                return i;
            })
        );
    } else {
    }
};