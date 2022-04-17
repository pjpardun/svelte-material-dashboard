<script>
	import Button from '../components/Button.svelte';
	import Card from '../components/Card.svelte';
	import Checkbox from '../components/Checkbox.svelte';
	import DataTable from '../components/DataTable.svelte';
	import Grid from '../components/Grid.svelte';
	import GridCell from '../components/GridCell.svelte';
	import Select from '../components/Select.svelte';
	import Tab from '../components/Tab.svelte';
	import TextField from '../components/TextField.svelte'
	import TransferList from '../components/TransferList.svelte';
	import { onMount } from 'svelte';


	/**
	 * Debugging: This should be switched to false when we build the final app
	 */
	let logDebugging = false;


	/**
	 * Back end REST data services
	 * TODO: Turn this into a parameter
	 */
	let server = "http://localhost:3030";
	export let offline = false;


	/**
	 * For non-data binding
	 */
	let projectDetailsGridHeight;


	/**
	 * Data objects + default data values to avoid 'undefined' pagination
	 */
	// Projects, projects header, project details
	let projects = [];
	let projectsHeader;
	let projectDetails = {
		"ID_LeadPhysician": null,
		"DESC_GoalStatement": null,
		"FL_Mature": null,
		"DESC_ProjectCategory": null,
		"ID_ProjectDim": null,
		"DT_ProjectStartDate": null,
		"DESC_ProjectIntervention": null,
		"ID_TemplateProject": null,
		"DESC_Foundation": null,
		"DT_DataStartDate": null,
		"DESC_ProblemStatement": null,
		"FL_ActiveProject": null,
		"FL_SendEmail": 1, // Need to populate initial value for dropdown
		"DTTM_Update": null,
		"ID_ProjectType": 1, // Need to populate initial value for dropdown
		"FL_GroupReport": null,
		"ID_ProjectStatus": null,
		"ID_ParentProject": null,
		"FL_EPR": null,
		"DESC_ProjectTopic": null,
		"ID_Specialty": 82, // Need to populate initial value for dropdown
		"ADDR_ProvCity": null,
		"DESC_ProjectName": null,
		"DESC_ProjectType": null,
		"DESC_Appendix": null,
		"DT_DataLoadDate": null,
		"FL_Population": null,
		"DT_ProjectEndDate": null,
		"ID_Champion": "NunezE", // Need to populate initial value for dropdown
		"DESC_ProvSpec":  "Pediatrics",
		"DESC_LeadPhysician": null,
		"DESC_Region": null,
		"DTTM_Insert": null,
		"DESC_ProvGroup": null,
		"Project_Standard_Details": null,
		"DESC_MedicalGroup": null,
		"ID_BusinessAnalyst": "NunezE", // Need to populate initial value for dropdown
		"DESC_ProjectStandard": null,
		"FL_Achieving": null,
		"DESC_ProjectStatus": "Adopted", // Need to populate initial value for dropdown
		"DT_ProjectRetireDate": null,
		"ID_ProjectSetting": 1, // Need to populate initial value for dropdown
		"DT_DataExpireDate": null
	};


	// Project Statuses
	let projectStatuses = [
		{ "ID_ProjectStatus": "1", "DESC_ProjectStatus": "Adopted" } // Need to populate initial value and match projectDetails for dropdown
	].map( type => {
		let typeObj = {
			"dataValue": type["ID_ProjectStatus"],
			"label": type["DESC_ProjectStatus"]
		};
		return typeObj
	});
	let selectedProjectStatus;
	$: selectedProjectStatus = projectStatuses.filter( t => t.label == projectDetails.DESC_ProjectStatus ) [0];
	

	// Project Measures
	let projectMeasureDetails = [{ // Needs to be set as an array of objects
		"DESC_ChangeDirection": "Up", // Need to populate initial value for dropdown
		"DESC_MeasureType": "Percent" // Need to populate initial value for dropdown
	}];
	let selectedProjectMeasure = (!!projectMeasureDetails && projectMeasureDetails.constructor.name == "Array" && projectMeasureDetails.length > 0) ? projectMeasureDetails[0] : {} ;
	$: selectedProjectMeasure = (!!projectMeasureDetails && projectMeasureDetails.constructor.name == "Array" && projectMeasureDetails.length > 0) ? projectMeasureDetails[selectedProjectMeasureIndex] : {} ;	
	let selectedProjectMeasureIndex = 0; // Settings for paginated card


	// Email statuses
	let emailStatuses = [
		{ "DESC_EmailStatus": "Yes - Send Email", "ID_EmailStatus": "1" }, // Need to populate initial value and match projectDetails for dropdown
	].map( type => {
		let typeObj = {
			"dataValue": type["ID_EmailStatus"],
			"label": type["DESC_EmailStatus"]
		};
		return typeObj
	});
	let selectedEmailStatus = emailStatuses;
	$: selectedEmailStatus = emailStatuses.filter( t => t.dataValue == projectDetails.FL_SendEmail ) [0];
  

	// Specialties
	let Specialties = [{
		"label": "Pediatrics",
		"dataValue": 82 // Need to populate initial value and match projectDetails for dropdown
		}];
	let selectedSpecialties = Specialties[0];
	$: selectedSpecialties = Specialties.filter( t => t.dataValue == projectDetails.ID_Specialty.toString() )[0];


	// Specialty Modifiers
	let specialtyModifiers = [];
	let specialtyModifiersKeyName = "ID_SpecialtyModifier";
	let specialtyModifiersLabelName = "Desc_SpecialtyModifier";
	let specialtyModifiersDisplay = [];
	let projectSpecialtyModifier = []; // The specialtyModifiers associated with the current project


	// Entities
	let dimEntities = [];
	let dimEntitiesKeyName = "ID_Entity";
	let dimEntitiesLabelName = "Entity_Description";
	let dimEntitiesDisplay = [];
	let projectDimEntities = []; // The dimEntities associated with the current project


	// Users
	let dimUsers = [{
		"DESC_UserDepartment": null,
		"DESC_UserFullName": null,
		"userAccountControl": null,
		"DESC_UserAccountControl": null,
		"DESC_UserNiceName": null,
		"DESC_DistinguishedName": null,
		"lastLogon": null,
		"DESC_UserCompany": null,
		"DESC_UserEmail": null,
		"DESC_UserLastName": null,
		"ID_UserID": "NunezE", // Need to populate initial value and match projectDetails for dropdown
		"DESC_UserFirstName": null
	}].map( type => {
		let typeObj = {
			"dataValue": type["ID_UserID"],
			"label": type["DESC_UserFullName"]
		};
		return typeObj
	});
	let selectedDimUserManager = dimUsers[0];
	$: selectedDimUserManager = dimUsers.filter( t => t.dataValue == projectDetails.ID_BusinessAnalyst ) [0];
	let selectedDimUserChampion = dimUsers[0];
	$: selectedDimUserChampion = dimUsers.filter( t => t.dataValue == projectDetails.ID_Champion ) [0];
	

	// Templates Details
	let templateDetails = {

	};


	// Template Types
	let templateTypes = [
		{ "DESC_ProjectType": "Neurology Testing", "ID_ProjectType": "1" } // Need to populate initial value and match projectDetails for dropdown
	].map( type => {
		let typeObj = {
			"dataValue": type["ID_ProjectType"],
			"label": type["DESC_ProjectType"]
		};
		return typeObj
	});
	let selectedTemplateType = templateTypes[0];
	$: selectedTemplateType = templateTypes.filter( t => t.dataValue == projectDetails.ID_ProjectType.toString() )[0];
 

	// Template Settings
	let templateSettings = [
		{ "ID_ProjectSetting": 1, "DESC_ProjectSetting": "Ambulatory" } // Not needed but replaces temporary undefined
	].map( type => {
		let typeObj = {
			"dataValue": type["ID_ProjectSetting"],
			"label": type["DESC_ProjectSetting"]
		};
		return typeObj
	});
	let selectedTemplateSetting = templateSettings[0];
	$: selectedTemplateSetting = templateSettings.filter( t => t.dataValue == projectDetails.ID_ProjectSetting.toString() )[0];
	

	// Template Measure Types
	let templateMeasureTypes = ["Percent","Cost","Unit","Time"];


	// Template Measure Directions
	let templateMeasureDirections = ["Up", "Down", "Constant"];


	/**
	 * Get Data from REST service
	 */
	// Projects
	async function getProjects () {
		fetch(server + '/projects', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received projects from backend REST service.`);

			// Backend is good to go
			offline = false;

			projects = json;
			projectsHeader = [
				{"label": "ID", "key": "ID_ProjectDim", "isNumeric": true, "isKey": true, "isSortable": true},
				{"label": "Type", "key": "DESC_ProjectType", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Name", "key": "DESC_ProjectName", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Status", "key": "DESC_ProjectStatus", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Template ID", "key": "ID_TemplateProject", "isNumeric": true, "isKey": false, "isSortable": true},
			];	
		})
		.catch( err => {
			console.error(`There was some sort of error in getProjects() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};


	// Project Statuses
	async function getProjectStatuses() {
		fetch(server + '/projectStatus', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received project statuses from backend REST service.`);

			// Build an array of objects that works with our Select component
			projectStatuses = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_ProjectStatus"],
					"label": type["DESC_ProjectStatus"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(projectStatuses);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getProjectStatuses() -- ${err}`);
		});
	};


	// Email Statuses
	async function getEmailStatuses() {
		fetch(server + '/emailStatus', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received email statuses from backend REST service.`);

			// Build an array of objects that works with our Select component
			emailStatuses = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_EmailStatus"],
					"label": type["DESC_EmailStatus"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(emailStatuses);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getEmailStatuses() -- ${err}`);
		});
	};


	// Specialties
	async function getSpecialties() {
		fetch(server + '/specialties', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template specialties from backend REST service.`);

			// Build an array of objects that works with our Select component
			Specialties = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_Specialty"],
					"label": type["Specialty"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(Specialties);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getSpecialties() -- ${err}`);
		});
	};


	// Specialty Modifiers
	async function getSpecialtyModifiers () {
		fetch(server + '/specialtyModifiers', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received specialtyModifiers from backend REST service.`);

			// Backend is good to go
			offline = false;

			// Put the data in the place
			specialtyModifiers = json;

			// Sort the data alphabetically by label
			specialtyModifiers.sort( (a, b) => (a[specialtyModifiersLabelName] < b[specialtyModifiersLabelName]) ? -1 : 1 )

			// Deep copy the array for use in Transfer List
			specialtyModifiersDisplay = JSON.parse(JSON.stringify(specialtyModifiers));
		})
		.catch( err => {
			console.error(`There was some sort of error in getspecialtyModifiers() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};

	
	// Entinties
	 async function getDimEntities () {
		fetch(server + '/dimEntities', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received dimEntities from backend REST service.`);

			// Backend is good to go
			offline = false;

			// Put the data in the place
			dimEntities = json;

			// Sort the data alphabetically by label
			dimEntities.sort( (a, b) => (a[dimEntitiesLabelName] < b[dimEntitiesLabelName]) ? -1 : 1 )

			// Deep copy the array for use in Transfer List
			dimEntitiesDisplay = JSON.parse(JSON.stringify(dimEntities));
		})
		.catch( err => {
			console.error(`There was some sort of error in getDimEntities() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};


	// Dim Users
	async function getDimUsers() {
		fetch(server + '/dimUsers', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received users from backend REST service.`);

			// Build an array of objects that works with our Select component
			dimUsers = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_UserID"],
					"label": type["DESC_UserFullName"]
				};
				return typeObj
			});
			if (logDebugging) console.log(`"dimUsers"`);
			if (logDebugging) console.log(dimUsers);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getDimUsers() -- ${err}`);
		});
	};


	// Template Types
	async function getTemplateTypes() {
		fetch(server + '/templateType', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template types from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateTypes = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_ProjectType"],
					"label": type["DESC_ProjectType"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateTypes);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateTypes() -- ${err}`);
		});
	};


	// Template Settings
	async function getTemplateSettings() {
		fetch(server + '/templateSetting', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template settings from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateSettings = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_ProjectSetting"],
					"label": type["DESC_ProjectSetting"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateSettings);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateSettings() -- ${err}`);
		});
	};


	// Template Measure Types
	async function getTemplateMeasureTypes() {
		fetch(server + '/MetricType', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template measure types from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateMeasureTypes = json.map( type => {
				return type["DESC_MetricType"]
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateMeasureTypes);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateMeasureTypes() -- ${err}`);
		});
	};


	// Template Measure Directions
	async function getTemplateMeasureDirections() {
		fetch(server + '/ChangeDirection', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template measure directions from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateMeasureDirections = json.map( type => type["DESC_ChangeDirection"]);
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateMeasureDirections);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateMeasureDirections() -- ${err}`);
		});
	};


	/**
	 * Get Data from REST service - subsets based on IDs
	 */
	// Project Details by Project ID
	async function getProjectDetailsById(projectID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/projectById' + `?projectID=${projectID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received project details from backend REST service.`);

			// Assign into drop down list
			projectDetails = { 
				...json[0],
				"DT_ProjectStartDate": json[0]["DT_ProjectStartDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
				"DT_DataStartDate": json[0]["DT_DataStartDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
				"DT_DataLoadDate": json[0]["DT_DataLoadDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
				"DT_ProjectEndDate": json[0]["DT_ProjectEndDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
				"DTTM_Insert": json[0]["DTTM_Insert"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
			}
			if (logDebugging) console.log(projectDetails);
			if (logDebugging) console.log(json[0]);

			// Build the selected object from data items
			selectedTemplateType = templateTypes.filter( t => t.dataValue == projectDetails.ID_ProjectType.toString() )[0];
			selectedDimUserManager = dimUsers.filter( t => t.dataValue == projectDetails.ID_BusinessAnalyst ) [0];
			selectedDimUserChampion = dimUsers.filter( t => t.dataValue == projectDetails.ID_Champion ) [0];
			selectedProjectStatus = projectStatuses.filter( t => t.label == projectDetails.DESC_ProjectStatus ) [0];
			selectedEmailStatus = emailStatuses.filter( t => t.dataValue == projectDetails.FL_SendEmail ) [0];
			selectedSpecialties = Specialties.filter( t => t.dataValue == projectDetails.ID_Specialty ) [0];

		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getProjectDetailsById() -- ${err}`);
		});
	};


	// Project Measure Details By Project ID
	async function getProjectMeasureDetailsById(projectID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/measureByProjectId' + `?projectID=${projectID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received measure details from backend REST service.`);

			// Assign into drop down list
			projectMeasureDetails = [].concat( json.map( j => {
				let obj = {
					...j,
					"DT_ProjectStartDate": (!j.hasOwnProperty("DT_ProjectStartDate")) ? undefined : j["DT_ProjectStartDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DT_DataStartDate": (!j.hasOwnProperty("DT_DataStartDate")) ? undefined : j["DT_DataStartDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DT_DataLoadDate": (!j.hasOwnProperty("DT_DataLoadDate")) ? undefined : j["DT_DataLoadDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DT_ProjectEndDate": (!j.hasOwnProperty("DT_ProjectEndDate")) ? undefined : j["DT_ProjectEndDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DTTM_Insert": (!j.hasOwnProperty("DTTM_Insert")) ? undefined : j["DTTM_Insert"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DT_MeasureStartDate": (!j.hasOwnProperty("DT_MeasureStartDate")) ? undefined : j["DT_MeasureStartDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DT_MeasureEndDate": (!j.hasOwnProperty("DT_MeasureEndDate")) ? undefined : j["DT_MeasureEndDate"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
					"DTTM_UPDATE": (!j.hasOwnProperty("DTTM_UPDATE")) ? undefined : j["DTTM_UPDATE"].replace(/ /,'T').replace(/\./,':').replace(/\..*/,':00'),
				}
				return obj;
			}) ); // Always arrives as an object in an array

			// reset the page number
			selectedProjectMeasureIndex = 0;

			// Build the selected object from data items
			// selectedtemplateMeasureProviderSources = templateMeasureProviderSources.filter ( t => t == templateMeasureDetails.Dep_ProviderSource);

		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getProjectMeasureDetailsById() -- ${err}`);
		});
	};


	// Project Specialty Modifiers by Project ID
	/**
	 * Get the specialtyModifiers associated with this Project
	 * @param projectID
	 */
	async function getSpecialtyModifierByProjectId(projectID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/projectSpecialtyModifierByProjectId' + `?projectID=${projectID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received project specialtyModifiers from backend REST service.`);

			// Filter specialtyModifiers objects to just the ones in the list
			projectSpecialtyModifier = json.map( ts => {
				for (let specialtyMod of specialtyModifiers) {
					if (specialtyMod["ID_SpecialtyModifier"] == ts["ID_SpecialtyModifier"]) {
						return specialtyMod;
					}
				}
			} );

			// Subtract selection from list of specialtyModifiers
			specialtyModifiersDisplay = JSON.parse(JSON.stringify(specialtyModifiers)).filter( s => {
				let keep = true;
				for (let ts of projectSpecialtyModifier) {
					if (s["ID_SpecialtyModifier"] == ts["ID_SpecialtyModifier"]) {
						return false;
					}
				}
				return keep;
			});

			
			if (logDebugging) console.log(`json = ${JSON.stringify(json)}`);
			if (logDebugging) console.log(`projectSpecialtyModifier = ${JSON.stringify(projectSpecialtyModifier)}`);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getSpecialtyModifierByProjectId() -- ${err}`);
		});
	};



	// Project Entities by Project ID
	/**
	 * Get the dimEntities associated with this Project
	 * @param projectID
	 */
	 async function getProjectEntityByProjectId(projectID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/projectEntitiesByProjectId' + `?projectID=${projectID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received project dimEntities from backend REST service.`);

			// Filter dimEntities objects to just the ones in the list
			projectDimEntities = json.map( ts => {
				for (let entity of dimEntities) {
					if (entity && ts && entity["ID_Entity"] == ts["ID_Entity"]) {
						return entity;
					}
				}
			} );

			// Subtract selection from list of dimEntities
			dimEntitiesDisplay = JSON.parse(JSON.stringify(dimEntities)).filter( s => {
				let keep = true;
				for (let ts of projectDimEntities) {
					if (s && ts && s["ID_Entity"] == ts["ID_Entity"]) {
						return false;
					}
				}
				return keep;
			});

			
			if (logDebugging) console.log(`json = ${JSON.stringify(json)}`);
			if (logDebugging) console.log(`projectDimEntities = ${JSON.stringify(projectDimEntities)}`);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getProjectEntityByProjectId() -- ${err}`);
		});
	};


	// Template ID by Project ID
	/**
	 * get TemplateID from selected project
	 * @param listOfProjects array of objects and the object definition is:
	 * 		{
				"ID_ProjectDim": item.ID_ProjectDim,
				"DESC_ProjectName": item.DESC_ProjectName,
				"DESC_ProjectType": item.DESC_ProjectType,
				"ID_TemplateProject": item.ID_TemplateProject,
				"DESC_ProjectStatus": item.DESC_ProjectStatus
			}
	* @param projectID ID of the selected project
	*/

	function getTemplateIdFromProjectId( listOfProjects, projectID ) {
		let templateID;

		// find selected project from the list of projects
		for (let project of listOfProjects) {
			if (project["ID_ProjectDim"] == projectID) {
				// get the templateID from the selected project
				templateID = project["ID_TemplateProject"];
				break;
			}
		}


		return templateID;
	}


	// Template Details by Template ID
	/**
	 * Get the full Template Details from the REST service
	 * @param templateID The ID of the template to retrieve
	 * @returns Array with a single matching object (or empty array if no match)
	 * 
	 * [
	 *	{
	 *		"DESC_GoalStatement": "N/A",
	 *		"Parent_TemplateProject": 0,
	 *		"DESC_TemplateStatus": "Active Reporting",
	 *		"DESC_ProjectCategory": "",
	 *		"FL_ProjectLength": "",
	 *		"DESC_ProjectIntervention": "",
	 *		"FL_Access": "",
	 *		"DTTM_Insert": "2020-06-17 14.09.52.293",
	 *		"FL_Afford": "",
	 *		"DESC_TemplateStatusReason": "N/A",
	 *		"DTTM_Update": "",
	 *		"ID_ProjectType": 13,
	 *		"DESC_ProjectTopic": "",
	 *		"DESC_ProjectName": "Lorem ipsum dolor sit amet",
	 *		"DESC_ProjectType": "Monitoring",
	 *		"DESC_Appendix": "",
	 *		"ID_TemplateProject": 751,
	 *		"Dep_AcuteOrFacility": "Ambulatory",
	 *		"DESC_ProblemStatement": "N/A",
	 *		"FL_Safety": "",
	 *		"DESC_ProjectStandard": "Lorem ipsum dolor sit amet, duo ludus consul ne, ut mea offendit lobortis, eius perfecto perpetua usu ut.",
	 *		"MSAccess_ID_Template": "",
	 *		"ID_ProjectSetting": 1,
	 *		"FL_Quality": ""
	 *	}
	 * ]
	 */
	 async function getTemplateDetailsById(templateID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/templateById' + `?templateID=${templateID}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template details from backend REST service.`);

			// Assign into drop down list
			templateDetails = json[0]; // Always arrives as an object in an array
			if (logDebugging) console.log(templateDetails);
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateDetailsById() -- ${err}`);
		});
	};


	/**
	 * loadDetails handled the event captured by DataTable row change
	 * Get Data from REST service
	 */
	async function loadDetails(event) {
		if (logDebugging) console.log(`Load Details`);
		if (logDebugging) console.log(event);
		if (!!event && !!event.detail && event.detail.selected) {
			if (!!event && !!event.detail && !!event.detail.rowId) {
				let projectID = event.detail.rowId.replaceAll(/[^0-9]/g, '');
				getProjectDetailsById(projectID);
				getProjectMeasureDetailsById(projectID);
				let templateID = getTemplateIdFromProjectId(projects, projectID);
				getTemplateDetailsById(templateID);
				getProjectMeasureDetailsById(projectID);
				getSpecialtyModifierByProjectId(projectID);
				getProjectEntityByProjectId(projectID);
			} 
			
		} else {
			if (logDebugging) console.log(`DESELECTED`);
		}
	}


	onMount( () => {
		getProjects();
		getTemplateTypes();
		getTemplateSettings();
		getDimUsers();
		getProjectStatuses();
		getEmailStatuses();
		getTemplateMeasureTypes();
		getTemplateMeasureDirections();
		getSpecialties();
		getSpecialtyModifiers();
		getDimEntities();
	});
</script>


<Button>SAVE</Button>
<Grid>
	<GridCell desktop={12} tablet={8} phone={4}>
		<DataTable data={projects} header={projectsHeader} title={true} selectMultiple={false} on:rowSelectionChanged={loadDetails}>
			<div slot="tableTitle">Projects</div>
		</DataTable>
	</GridCell>
</Grid>
<Card actionable={false} title={true} outlined={true}>
	<div slot="title">
		Project Details
	</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4} bind:clientHeight={projectDetailsGridHeight}>
		<!-- left side contents -->
			<Grid nested={true}>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Project ID</div>
						<TextField bind:value={projectDetails["ID_ProjectDim"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Template ID</div>
						<TextField bind:value={projectDetails["ID_TemplateProject"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Type</div>
						<Select listItems={templateTypes} bind:value={selectedTemplateType}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Setting</div>
						<Select listItems={templateSettings} bind:value={selectedTemplateSetting}></Select>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Problem Statement</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={projectDetails["DESC_ProblemStatement"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Project Standard</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={projectDetails["DESC_ProjectStandard"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Goal Statement</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={projectDetails["DESC_GoalStatement"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Charter Appendix</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={templateDetails["DESC_Appendix"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Project Start</div>
						<TextField type="datetime-local" bind:value={projectDetails["DT_ProjectStartDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Project End</div>
						<TextField type="datetime-local" bind:value={projectDetails["DT_ProjectEndDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Start</div>
						<TextField type="datetime-local" bind:value={projectDetails["DT_DataStartDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Start</div>
						<TextField bind:value={projectDetails["DT_DataExpireDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Status</div>
						<Select listItems={projectStatuses} bind:value={selectedProjectStatus}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Retire Date</div>
						<TextField bind:value={projectDetails["DT_ProjectRetireDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Manager</div>
						<Select listItems={dimUsers} bind:value={selectedDimUserManager}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Champion</div>
						<Select listItems={dimUsers} bind:value={selectedDimUserChampion}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Email Status</div>
						<Select listItems={emailStatuses} bind:value={selectedEmailStatus}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
				</GridCell>
				<!-- end left side contents -->
			</Grid>
			<!-- end left side -->
			</GridCell>
			<!--  right side -->
			<GridCell desktop={4} tablet={4} phone={4}>
				<!-- right side contents -->
					<GridCell desktop={4} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Specialty</div>
						<Select listItems={Specialties} bind:value={selectedSpecialties}></Select>
					</div>
					</GridCell>
					<br>
					<div class="transferLabel">Specialty Modifier:</div>
					<br>
					<GridCell desktop={4} tablet={4} phone={4} verticalFill={true} height={projectDetailsGridHeight/3} >
						<TransferList height={projectDetailsGridHeight/3}
							leftSide={ specialtyModifiersDisplay } rightSide={ projectSpecialtyModifier }
							keyName={ specialtyModifiersKeyName } labelName={ specialtyModifiersLabelName }
						>
							<div slot="leftTitle">Available</div>
							<div slot="rightTitle">Selected</div>
						</TransferList>
					</GridCell>
					<br>
					<div class="transferLabel">Project Entity:</div>
					<br>
					<GridCell desktop={4} tablet={4} phone={4} verticalFill={true} height={projectDetailsGridHeight/3} >
						<TransferList height={projectDetailsGridHeight/3}
							leftSide={ dimEntitiesDisplay } rightSide={ projectDimEntities }
							keyName={ dimEntitiesKeyName } labelName={ dimEntitiesLabelName }
						>
							<div slot="leftTitle">Available</div>
							<div slot="rightTitle">Selected</div>
						</TransferList>
					</GridCell>

			</GridCell>
	</Grid>
</Card>
<Card actionable={false} title={true}>
	<div slot="title">Project Measure Details</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4}>
		<!-- left side contents -->
			<Grid nested={true}>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Project Measure ID</div>
						<TextField bind:value={selectedProjectMeasure["ID_MeasureDim"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Temp Measure ID</div>
						<TextField bind:value={selectedProjectMeasure["ID_TemplateMeasure"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Type</div>
						<Select listItems={templateMeasureTypes} bind:value={selectedProjectMeasure["DESC_MeasureType"]}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Direction</div>
						<Select listItems={templateMeasureDirections} bind:value={selectedProjectMeasure["DESC_ChangeDirection"]}></Select>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Name</div>
						<TextField bind:value={selectedProjectMeasure["DESC_MeasureName"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Nice Name</div>
						<TextField bind:value={selectedProjectMeasure["DESC_MeasureNiceName"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Denominator</div>
						<TextField bind:value={selectedProjectMeasure["DESC_DenominatorType"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Numerator</div>
						<TextField bind:value={selectedProjectMeasure["DESC_NumeratorType"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Exclusions</div>
						<TextField bind:value={selectedProjectMeasure["DESC_Exclusions"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Measure Start</div>
						<TextField type="datetime-local" bind:value={selectedProjectMeasure["DT_MeasureStartDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Measure End</div>
						<TextField type="datetime-local" bind:value={selectedProjectMeasure["DT_MeasureEndDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Start</div>
						<TextField type="datetime-local" bind:value={selectedProjectMeasure["DT_DataStartDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data End</div>
						<TextField bind:value={selectedProjectMeasure["DT_DataExpiredDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Load</div>
						<TextField type="datetime-local" bind:value={selectedProjectMeasure["DT_DataLoadDate"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Modified</div>
						<TextField type="datetime-local" bind:value={selectedProjectMeasure["DTTM_UPDATE"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Data Lag</div>
						<TextField bind:value={selectedProjectMeasure["FL_MonthLag"]}></TextField>
					</div>
				</GridCell>
		<!-- end left side contents -->
			</Grid>
		<!-- end left side -->
		</GridCell>
		<!--  right side -->
		<GridCell desktop={4} tablet={4} phone={4} verticalFill={true}>
			<Card skinnyCards={true} actionable={false} outlined={true}>
				<Tab>
					<div slot="non-dev-content" class="tabPadding">
						<Grid nested={true}>
							<GridCell desktop={12} tablet={8} phone={4}>
								<Checkbox bind:checked={selectedProjectMeasure["FL_StandardMeasure"]}>Standard</Checkbox>
								<br>
								<Checkbox bind:checked={selectedProjectMeasure["FL_SuccessMeasure"]}>Success</Checkbox>
								<br>
								<Checkbox bind:checked={selectedProjectMeasure["FL_SavingsMeasure"]}>Savings</Checkbox>
								<br>
								<Checkbox bind:checked={selectedProjectMeasure["FL_Duplicate_Numerator"]}>Duplicate Numerator</Checkbox>
								<br>
								<Checkbox bind:checked={selectedProjectMeasure["FL_DuplicateDenom"]}>Duplicate Denominator</Checkbox>
							</GridCell>
						</Grid>
					</div>
					<div slot="dev-content" class="tabPadding">
						<Grid nested={true}>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Procedure</div>
									<TextField bind:value={selectedProjectMeasure["Dep_StoredProcedure"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Summary</div>
									<TextField bind:value={selectedProjectMeasure["DESC_MeasureTable"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Detail</div>
									<TextField bind:value={selectedProjectMeasure["Dep_DetailTable"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Criteria</div>
									<TextField bind:value={selectedProjectMeasure["Dep_Inclusion"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Provider</div>
									<TextField bind:value={selectedProjectMeasure["Dep_ProviderField"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Patient</div>
									<TextField bind:value={selectedProjectMeasure["Dep_PatientField"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Date</div>
									<TextField bind:value={selectedProjectMeasure["Dep_DateField"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Lag</div>
									<TextField bind:value={selectedProjectMeasure["FL_MonthLag"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Subject</div>
									<TextField bind:value={selectedProjectMeasure["Dep_Subject"]}></TextField>
								</div>
							</GridCell>									
						</Grid>
					</div>
				</Tab>
			</Card>
		</GridCell>
	</Grid>
		<!-- Data table: pagination controls -->
		<div class="mdc-data-table__pagination">
			<div class="mdc-data-table__pagination-trailing">
		
				<!-- Pagination navigation -->
				<div class="mdc-data-table__pagination-navigation">
					<div class="mdc-data-table__pagination-total">
					{`${selectedProjectMeasureIndex+1} of ${projectMeasureDetails.length}`}
					</div>
					<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
						data-first-page="true" 
						on:click={ () => { selectedProjectMeasureIndex = 0} }
						disabled="{(projectMeasureDetails.length <= 0 || selectedProjectMeasureIndex <= 0) ? true : null}"
					>
						<!-- It is a Sveltey thing to put an attribute = null instead of false, if you want Svelte to REMOVE the attribute. -->
						<div class="mdc-button__icon">first_page</div>
					</button>

					<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
						data-prev-page="true"
						on:click={ () => { selectedProjectMeasureIndex = selectedProjectMeasureIndex - 1 } }
						disabled="{(projectMeasureDetails.length <= 0 || selectedProjectMeasureIndex <= 0) ? true : null}"
					>
						<div class="mdc-button__icon">chevron_left</div>
					</button>

					<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
						data-next-page="true"
						on:click={ () => { selectedProjectMeasureIndex = selectedProjectMeasureIndex + 1 } }
						disabled="{(projectMeasureDetails.length <= 0 || selectedProjectMeasureIndex >= projectMeasureDetails.length - 1) ? true : null}"
					>
						<div class="mdc-button__icon">chevron_right</div>
					</button>

					<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
						data-last-page="true"
						on:click={ () => { selectedProjectMeasureIndex = projectMeasureDetails.length - 1 } }
						disabled="{(projectMeasureDetails.length <= 0 || selectedProjectMeasureIndex >= projectMeasureDetails.length - 1) ? true : null}"
					>
						<div class="mdc-button__icon">last_page</div>
					</button>
				</div> <!-- END Pagination navigation -->
			</div> <!-- END Pagination trailing section -->
		</div> <!-- END Pagination -->
</Card>


<style>
	.cellContents {
		white-space: nowrap;
		display: inline-flex;
		align-items: baseline;
		width: 100%;
	}

	.cellLabel {
		min-width: 118px;
		text-align: right;
		vertical-align: middle;
		padding-right: 8px;
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
	}

	.cellLabelSide {
		min-width: 70px;
		text-align: right;
		vertical-align: middle;
		padding-right: 8px;
		font-size: 14px;
	}

	.cellLabel {
		-webkit-user-select: none; /* Safari */		
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}

	.tabPadding {
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
	}

	.transferLabel {
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
		font-weight: bold;
		-webkit-user-select: none; /* Safari */		
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}
</style>