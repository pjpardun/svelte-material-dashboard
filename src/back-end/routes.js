'use strict';

// This file connects URLs on the web server to backend code.
module.exports = function(app) {
    var serviceLogic = require('./controllers/serviceLogic');
    
    // Ignore CORS restrictions in responses FOR ALL requests
    app.use( (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        console.log(`Telling requester to ignore CORS client restrictions.`);
        next();
    });


    app.route('/ChangeDirection')
    .get(serviceLogic.getDESC_ChangeDirection);
    
    app.route('/MetricType')
    .get(serviceLogic.getDESC_MetricType);
    
    app.route('/avoidanceDesc')
    .get(serviceLogic.getavoidanceDesc);

    app.route('/templateSpecialty')
    .get(serviceLogic.getTemplateSpecialty);

    app.route('/templateSpecialtyById')
    .get(serviceLogic.getTemplateSpecialtyById);

    app.route('/templateSetting')
    .get(serviceLogic.getTemplateSetting);
    
    app.route('/templateType')
    .get(serviceLogic.getTemplateType);
 
    app.route('/specialties')
    .get(serviceLogic.getSpecialties);

    app.route('/measures')
    .get(serviceLogic.getTemplateMeasures);
 
    // REQ: http://localhost:3000/measureByTemplateId?templateID=3
    app.route('/measureByTemplateId')
    .get(serviceLogic.getMeasureByTemplateId);
    
    // Define the service endpoint named templates
    app.route('/templates')
    // For the HTTP verb "GET", call this function "getTemplates"
    .get(serviceLogic.getTemplates);
    
    app.route('/templateById')
    .get(serviceLogic.getTemplateById);
    
    app.route('/templateStatus')
    .get(serviceLogic.getTemplateStatus);
 

 
    app.route('/SWProviderSource')
    .get(serviceLogic.getSWProviderSource);
    
    // app.route('/contact/:contactId')
    // .get(serviceLogic.read_a_task)
    // .post(serviceLogic.create_a_task)
    // .put(serviceLogic.update_a_task)
    // .delete(serviceLogic.delete_a_task);

    app.route('/projects')
    // For the HTTP verb "GET", call this function "getTemplates"
    .get(serviceLogic.getProjects);
    
    app.route('/projectById')
    .get(serviceLogic.getProjectById);

    app.route('/dimUsers')
    .get(serviceLogic.getDimUsers);

    app.route('/projectStatus')
    .get(serviceLogic.getProjectStatus);

    app.route('/emailStatus')
    .get(serviceLogic.getEmailStatus);

    app.route('/measures')
    .get(serviceLogic.getMeasures);

    app.route('/measureByProjectId')
    .get(serviceLogic.getMeasureByProjectId);

    app.route('/specialtyModifiers')
    .get(serviceLogic.getSpecialtyModifier);

    app.route('/projectSpecialtyModifiers')
    .get(serviceLogic.getProjectSpecialtyModifier);

    app.route('/projectSpecialtyModifierByProjectId')
    .get(serviceLogic.getProjectSpecialtyModifierByProjectId);

    app.route('/dimEntities')
    .get(serviceLogic.getDimEntity);

    app.route('/dimProjectEntities')
    .get(serviceLogic.getDimProjectEntity);

    app.route('/projectEntitiesByProjectId')
    .get(serviceLogic.getProjectEntityByProjectId);

    app.route('/dimUsersRoles')
    .get(serviceLogic.getDimUsersRoles);

    app.route('/dimUsersRolesByUserId')
    .get(serviceLogic.getDimUsersRolesByUserId);

    app.route('/dimUserByUserId')
    .get(serviceLogic.getDimUserByUserId);

    app.route('/dimTemplateMeasureDev')
    .get(serviceLogic.getDimTemplateMeasureDev);

    app.route('/dimTemplateMeasureDevByTemplateId')
    .get(serviceLogic.getDimTemplateMeasureDevByTemplateId);

};
