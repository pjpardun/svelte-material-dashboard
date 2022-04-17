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
	 * TODO: Turn into parameter
	 */
	let server = "http://localhost:3030";
	export let offline = false;
	
	
	/**
	 * For non-data binding
	 */
	let templateDetailsGridHeight;


	/**
	 * Data objects + default data values to avoid 'undefined' pagination
	 */
	// Templates, templates header, template details
	let templates = [];
	let templatesHeader;	
	let templateDetails =  {
		"DESC_GoalStatement": null,
		"Parent_TemplateProject": null,
		"DESC_TemplateStatus": null,
		"DESC_ProjectCategory": null,
		"FL_ProjectLength": null,
		"DESC_ProjectIntervention": null,
		"FL_Access": null,
		"DTTM_Insert": null,
		"FL_Afford": null,
		"DESC_TemplateStatusReason": null,
		"DTTM_Update": null,
		"ID_ProjectType": null,
		"DESC_ProjectTopic": null,
		"DESC_ProjectName": null,
		"DESC_ProjectType": null,
		"DESC_Appendix": null,
		"ID_TemplateProject": null,
		"Dep_AcuteOrFacility": null,
		"DESC_ProblemStatement":null,
		"FL_Safety": null,
		"DESC_ProjectStandard": null,
		"MSAccess_ID_Template": null,
		"ID_ProjectSetting": null,
		"FL_Quality": null
	};


	// Template Types
	let templateTypes = [
		{"dataValue": 1, "label": "Monitoring"} // Need to populate initial value for dropdown
	];
	let selectedTemplateType = templateTypes[0];


	// Template Settings
	let templateSettings = [
		{"dataValue": 1, "label": "Ambulatory"} // Need to populate initial value for dropdown
	];
	let selectedTemplateSetting = templateSettings[0];


	// Template Statuses
	let templateStatuses = [
		{ "dataValue": 1, "label": "Active Reporting" } // Need to populate initial value for dropdown
	];
	let selectedTemplateStatus = templateStatuses[0];


	// Template Measure Details
	let templateMeasureDetails = [
		{
			"Dep_ProviderField": null,
			"FL_Balance": false, 
			"Parent_TemplateProject": null,
			"DESC_MeasureName": null,
			"DESC_MeasureType": null, 
			"DESC_SummaryTable": null,
			"DESC_DenominatorType": null,
			"DESC_Exclusions": null,
			"DESC_NumeratorType": null,
			"DESC_ChangeDirection": "Up", // Need to populate initial value for dropdown
			"FL_MonthLag": null,
			"FL_PatientExperience": false, 
			"ID_TemplateMeasure": null,
			"DESC_AvoidanceName": null, 
			"Dep_ProviderSource": "Epic Provider", // Need to populate initial value for dropdown
			"Threshold": null,
			"DESC_Subject": null, 
			"FL_ActiveMeasure": true, 
			"Dep_Inclusion": null,
			"FL_Success": false, 
			"ID_TemplateProject": null,
			"Dep_LocationField": null, 
			"FL_Savings": false, 
			"Parent_TemplateMeasure": null,
			"FL_DuplicateDenom": false, 
			"FL_Duplicate_Numerator": false, 
			"FL_StandardMeasure": true, 
			"FL_Population": false, 
			"FL_SpreadMeasure": false, 
			"DESC_MetricType": "Percent" // Need to populate initial value for dropdown
		}
	];
	let selectedTemplateMeasure = (!!templateMeasureDetails && templateMeasureDetails.constructor.name == "Array" && templateMeasureDetails.length > 0) ? templateMeasureDetails[0] : {} ;
	$: selectedTemplateMeasure = (!!templateMeasureDetails && templateMeasureDetails.constructor.name == "Array" && templateMeasureDetails.length > 0) ? templateMeasureDetails[selectedTemplateMeasureIndex] : {} ;
	let selectedTemplateMeasureIndex = 0; // Settings for paginated card


	// Template Measure Types
	let templateMeasureTypes = ["Percent","Cost","Unit","Time"];

	
	// Template Measure Directions
	let templateMeasureDirections = ["Up", "Down", "Constant"];

	
	// Template Measure Provider Sources
	let templateMeasureProviderSources = ["Master_Provider_Key","Epic Provider"];
	let selectedtemplateMeasureProviderSources = templateMeasureProviderSources[0];


	// Specialties
	let specialties = [];
	let specialtiesKeyName = "ID_Specialty";
	let specialtiesLabelName = "Specialty";
	let specialtiesDisplay = [];
	let templateSpecialties = []; // Specialties associated with the current template


	/**
	 * Get Data from REST service
	 */
	// Templates
	async function getTemplates () {
		fetch(server + '/templates', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received templates from backend REST service.`);

			// Backend is good to go
			offline = false;

			templates = json;
			templatesHeader = [
				{"label": "ID", "key": "ID_TemplateProject", "isNumeric": true, "isKey": true, "isSortable": true},
				{"label": "Type", "key": "DESC_ProjectType", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Name", "key": "DESC_ProjectName", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Status", "key": "DESC_TemplateStatus", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Acute/Facility", "key": "Dep_AcuteOrFacility", "isNumeric": false, "isKey": false, "isSortable": true}
			];	
		})
		.catch( err => {
			console.error(`There was some sort of error in getTemplates() -- ${err}`);

			// Backend is unhealthy
			offline = true;
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


	// Template Statuses
	async function getTemplateStatuses() {
		fetch(server + '/templateStatus', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template statuses from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateStatuses = json.map( type => {
				let typeObj = {
					"dataValue": type["ID_TemplateStatus"],
					"label": type["Desc_TemplateStatus"]
				};
				return typeObj
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateStatuses);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateStatuses() -- ${err}`);
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


	// Specialties
	async function getSpecialties () {
		fetch(server + '/specialties', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received specialties from backend REST service.`);

			// Backend is good to go
			offline = false;

			// Put the data in the place
			specialties = json;

			// Sort the data alphabetically by label
			specialties.sort( (a, b) => (a[specialtiesLabelName] < b[specialtiesLabelName]) ? -1 : 1 )

			// Deep copy the array for use in Transfer List
			specialtiesDisplay = JSON.parse(JSON.stringify(specialties));
		})
		.catch( err => {
			console.error(`There was some sort of error in getSpecialties() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};


	// Template Measure Provider Sources
	async function getTemplateMeasureProviderSources() {
		fetch(server + '/SWProviderSource', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template measure provider sources from backend REST service.`);

			// Build an array of objects that works with our Select component
			templateMeasureProviderSources = json.map( type => {
				return type["Dep_ProviderSource"]
			});
			if (logDebugging) console.log(json);
			if (logDebugging) console.log(templateMeasureProviderSources);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateMeasureProviderSources() -- ${err}`);
		});
	};


	/**
	 * Get Data from REST service - subsets based on IDs
	 */
	// Template Details By Template ID
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
	 *		"DESC_ProjectStandard": "Lorem ipsum dolor sit amet, ad nibh idque ius.",
	 *		"MSAccess_ID_Template": "",
	 *		"ID_ProjectSetting": 1,
	 *		"FL_Quality": ""
	 *	}
	 * ]
	 */
	async function getTemplateDetailsById(templateID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/templateById' + `?templateID=${templateID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template details from backend REST service.`);

			// Assign into drop down list
			templateDetails = json[0]; // Always arrives as an object in an array
			
			// Build the selected object from data items
			selectedTemplateType = templateTypes.filter( t => t.dataValue == templateDetails.ID_ProjectType.toString() )[0];
			selectedTemplateSetting = templateSettings.filter( t => t.dataValue == templateDetails.ID_ProjectSetting.toString() )[0];
			selectedTemplateStatus = templateStatuses.filter( t => t.label == templateDetails.DESC_TemplateStatus ) [0];
			if (logDebugging) console.log(templateDetails);
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateDetailsById() -- ${err}`);
		});
	};


	// Template Specialties By Template ID
	/**
	 * Get the Specialties associated with this Template
	 * @param templateID
	 */
	async function getTemplateSpecialtyById(templateID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/templateSpecialtyById' + `?templateID=${templateID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template specialties from backend REST service.`);

			// Filter specialties objects to just the ones in the list
			templateSpecialties = json.map( ts => {
				for (let specialty of specialties) {
					if (specialty["ID_Specialty"] == ts["ID_Specialty"]) {
						return specialty;
					}
				}
			} );

			// Subtract selection from list of specialties
			specialtiesDisplay = JSON.parse(JSON.stringify(specialties)).filter( s => {
				let keep = true;
				for (let ts of templateSpecialties) {
					if (s["ID_Specialty"] == ts["ID_Specialty"]) {
						return false;
					}
				}
				return keep;
			});

			
			if (logDebugging) console.log(`json = ${JSON.stringify(json)}`);
			if (logDebugging) console.log(`templateSpecialties = ${JSON.stringify(templateSpecialties)}`);
		})
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateSpecialtyById() -- ${err}`);
		});
	};


	// Template Measure Details By Template ID
	async function getTemplateMeasureDetailsById(templateID) {
		// Get rid of "u" prefix on ID
		fetch(server + '/measureByTemplateId' + `?templateID=${templateID.replaceAll(/[^0-9]/g, '')}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template measure details from backend REST service.`);

			// Assign into drop down list
			templateMeasureDetails = [].concat( json ); // Always arrives as an object in an array
			// reset the page number
			selectedTemplateMeasureIndex = 0;

			// Build the selected object from data items
			selectedtemplateMeasureProviderSources = templateMeasureProviderSources.filter ( t => t == templateMeasureDetails.Dep_ProviderSource);
			if (logDebugging) console.log("templateMeasureDetails");
			if (logDebugging) console.log(templateMeasureDetails);
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getTemplateMeasureDetailsById() -- ${err}`);
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
			if (logDebugging) console.log(`LOAD IT`);
			if (!!event.detail.rowId) {
				getTemplateDetailsById(event.detail.rowId);
				getTemplateSpecialtyById(event.detail.rowId);
				getTemplateMeasureDetailsById(event.detail.rowId);
			}
			
		} else {
			if (logDebugging) console.log(`DESELECTED`);
		}
	}


	onMount( () => {
		getTemplates();
		getTemplateTypes();
		getTemplateSettings();
		getTemplateStatuses();
		getSpecialties();
		getTemplateMeasureTypes();
		getTemplateMeasureDirections();
		getTemplateMeasureProviderSources();
	});
</script>


<Button>SAVE</Button>
<Grid>
	<GridCell desktop={12} tablet={8} phone={4}>
		<DataTable data={templates} header={templatesHeader} title={true} selectMultiple={false} on:rowSelectionChanged={loadDetails}>
			<div class="titlePadding" slot="tableTitle">Templates</div>
		</DataTable>
	</GridCell>
</Grid>
<Card actionable={false} title={true} outlined={true}>
	<div slot="title">
		Template Details
	</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4} bind:clientHeight={templateDetailsGridHeight} >
		<!-- left side contents -->
			<Grid nested={true}>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">ID</div>
						<TextField bind:value={templateDetails["ID_TemplateProject"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
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
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={templateDetails["DESC_ProblemStatement"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">VR Standard</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={templateDetails["DESC_ProjectStandard"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Goal Statement</div>
						<TextField isTextArea={true} rows={3} cols={150} height={45} bind:value={templateDetails["DESC_GoalStatement"]}></TextField>
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
						<div class="cellLabel">Status</div>
						<Select listItems={templateStatuses} bind:value={selectedTemplateStatus}></Select>
					</div>
				</GridCell>
			<!-- end left side contents -->
			</Grid>
		<!-- end left side -->
		</GridCell>
		<!--  right side -->
		<GridCell desktop={4} tablet={4} phone={4} verticalFill={true} height={templateDetailsGridHeight} >
			<TransferList height={templateDetailsGridHeight}
				leftSide={ specialtiesDisplay } rightSide={ templateSpecialties }
				keyName={ specialtiesKeyName } labelName={ specialtiesLabelName }
			>
				<div slot="leftTitle">Available</div>
				<div slot="rightTitle">Selected</div>
			</TransferList>
		</GridCell>
	</Grid>
</Card>
<Card actionable={false} title={true}>
	<div slot="title">Template Measure Details</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4}>
		<!-- left side contents -->
			<Grid nested={true}>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">ID</div>
						<TextField bind:value={selectedTemplateMeasure["ID_TemplateMeasure"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Type</div>
						<Select listItems={templateMeasureTypes} bind:value={selectedTemplateMeasure["DESC_MetricType"]}></Select>
					</div>
				</GridCell>
				<GridCell desktop={6} tablet={4} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Direction</div>
						<Select listItems={templateMeasureDirections} bind:value={selectedTemplateMeasure["DESC_ChangeDirection"]}></Select>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Name</div>
						<TextField bind:value={selectedTemplateMeasure["DESC_MeasureName"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Denominator</div>
						<TextField bind:value={selectedTemplateMeasure["DESC_DenominatorType"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Numerator</div>
						<TextField bind:value={selectedTemplateMeasure["DESC_NumeratorType"]}></TextField>
					</div>
				</GridCell>
				<GridCell desktop={12} tablet={8} phone={4}>
					<div class="cellContents">
						<div class="cellLabel">Exclusions</div>
						<TextField bind:value={selectedTemplateMeasure["DESC_Exclusions"]}></TextField>
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
								<Checkbox bind:checked={selectedTemplateMeasure["FL_StandardMeasure"]}>Standard</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Success"]}>Success</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Savings"]}>Savings</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Population"]}>Population</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Balance"]}>Balance</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Spread"]}>Spread</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_Duplicate_Numerator"]}>Duplicate Numerator</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_DuplicateDenom"]}>Duplicate Denominator</Checkbox>
								<br>
								<Checkbox bind:checked={selectedTemplateMeasure["FL_PatientExperience"]}>Patient Experience:</Checkbox>
								<TextField bind:value={selectedTemplateMeasure["DESC_AvoidanceName"]}></TextField>																										
							</GridCell>
						</Grid>
					</div>
					<div slot="dev-content" class="tabPadding">
						<Grid nested={true}>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Table</div>
									<TextField bind:value={selectedTemplateMeasure["DESC_SummaryTable"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={8} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Criteria</div>
									<TextField bind:value={selectedTemplateMeasure["Dep_Inclusion"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Provider</div>
									<TextField bind:value={selectedTemplateMeasure["Dep_ProviderField"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Source</div>
									<Select listItems={templateMeasureProviderSources} bind:value={selectedTemplateMeasure["Dep_ProviderSource"]}></Select>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Location</div>
									<TextField bind:value={selectedTemplateMeasure["Dep_LocationField"]}></TextField>
								</div>
							</GridCell>
							<GridCell desktop={12} tablet={4} phone={4}>
								<div class="cellContents">
									<div class="cellLabelSide">Lag</div>
									<TextField bind:value={selectedTemplateMeasure["FL_MonthLag"]}></TextField>
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
				{`${selectedTemplateMeasureIndex+1} of ${templateMeasureDetails.length}`}
				</div>
				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-first-page="true" 
					on:click={ () => { selectedTemplateMeasureIndex = 0} }
					disabled="{(templateMeasureDetails.length <= 0 || selectedTemplateMeasureIndex <= 0) ? true : null}"
				>
					<!-- It is a Sveltey thing to put an attribute = null instead of false, if you want Svelte to REMOVE the attribute. -->
					<div class="mdc-button__icon">first_page</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-prev-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = selectedTemplateMeasureIndex - 1 } }
					disabled="{(templateMeasureDetails.length <= 0 || selectedTemplateMeasureIndex <= 0) ? true : null}"
				>
					<div class="mdc-button__icon">chevron_left</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-next-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = selectedTemplateMeasureIndex + 1 } }
					disabled="{(templateMeasureDetails.length <= 0 || selectedTemplateMeasureIndex >= templateMeasureDetails.length - 1) ? true : null}"
				>
					<div class="mdc-button__icon">chevron_right</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-last-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = templateMeasureDetails.length - 1 } }
					disabled="{(templateMeasureDetails.length <= 0 || selectedTemplateMeasureIndex >= templateMeasureDetails.length - 1) ? true : null}"
				>
					<div class="mdc-button__icon">last_page</div>
				</button>
			</div> <!-- END Pagination navigation -->
		</div> <!-- END Pagination trailing section -->
	</div> <!-- END Pagination -->
</Card>


<style>
	:global(.mdc-select) {
		width: 100%;
	}

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

	:global(.mdc-text-field) {
		width: 100%;
	}

	.iconButtonStyle {
	height: -webkit-fill-available;
	}

	:global(.mdc-button) {
		margin: 20px;
		margin-left: 24px;
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
</style>