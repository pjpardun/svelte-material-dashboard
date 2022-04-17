<script>
	import Card from '../components/Card.svelte';
	import Checkbox from '../components/Checkbox.svelte';
	import DataTable from '../components/DataTable.svelte';
	import Grid from '../components/Grid.svelte';
	import GridCell from '../components/GridCell.svelte';
	import Tab from '../components/Tab.svelte';
	import TextField from '../components/TextField.svelte'
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
	let userDetailsGridHeight;


	/**
	 * Data objects
	 */
	let templates = [{}];
	let templatesHeader = [{}];
	let dimTemplateMeasureDevsDetails = [{
         "Dep_ProviderField": null, 
         "Developer": null, 
         "FL_Valid": null, 
         "ID_TemplateProject": null, 
         "CT_ProfileUsed": null, 
         "Dep_Include": null, 
         "Profile": null, 
         "DTTM_Insert": null, 
         "Dep_DetailTable": null, 
         "Dep_PatientField": null, 
         "ID_TemplateMeasure_Dev": null, 
         "Dep_Source": null, 
         "DTTM_Update": null, 
         "Dep_StoredProcedure": null, 
         "Dep_Subject": null, 
         "ID_TemplateMeasure": null, 
         "Dep_Inclusion": null, 
         "Dep_DateField": null
	}];
	let selectedTemplateMeasure = (!!dimTemplateMeasureDevsDetails && dimTemplateMeasureDevsDetails.constructor.name == "Array" && dimTemplateMeasureDevsDetails.length > 0) ? dimTemplateMeasureDevsDetails[0] : {} ;
	$: selectedTemplateMeasure = (!!dimTemplateMeasureDevsDetails && dimTemplateMeasureDevsDetails.constructor.name == "Array" && dimTemplateMeasureDevsDetails.length > 0) ? dimTemplateMeasureDevsDetails[selectedTemplateMeasureIndex] : {} ;
	let selectedTemplateMeasureIndex = 0; // Settings for paginated card


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


	/**
	 * Get Data from REST service - subsets based on IDs
	 */
	// Template Measure Dev By Template ID
	async function getDimTemplateMeasureDevByTemplateId(templateID) {
		// Get rid of "u" prefix on ID
		console.log(server + '/dimTemplateMeasureDevByTemplateId' + `?templateID=${templateID}`);
		fetch(server + '/dimTemplateMeasureDevByTemplateId' + `?templateID=${templateID}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received template measure dev details from backend REST service.`);

			dimTemplateMeasureDevsDetails = [].concat( json ); // Always arrives as an object in an array
			
			// reset the page number
			selectedTemplateMeasureIndex = 0;


			if (logDebugging) console.log(dimTemplateMeasureDevsDetails);
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getDimTemplateMeasureDevByTemplateId() -- ${err}`);
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
				let templateID = event.detail.rowId.substring(1); //trim first character off (material design event adds a 'u')
				getDimTemplateMeasureDevByTemplateId(templateID);
			} 
			
		} else {
			if (logDebugging) console.log(`DESELECTED`);
		}
	};


	onMount( () => {
		getTemplates();
	});
</script>


<Grid>
	<GridCell desktop={12} tablet={8} phone={4}>
		<DataTable data={templates} header={templatesHeader} title={true} selectMultiple={false} on:rowSelectionChanged={loadDetails}>
			<div slot="tableTitle">Templates</div>
		</DataTable>
	</GridCell>
</Grid>
<Card actionable={false} title={true} outlined={true}>
	<div slot="title">
		Template Measure Dev Details
	</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4} height={userDetailsGridHeight}>
		<!-- left side contents -->
		<Grid nested={true}>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Developer</div>
					<TextField bind:value={selectedTemplateMeasure["Developer"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Template ID</div>
					<TextField bind:value={selectedTemplateMeasure["ID_TemplateProject"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Measure ID</div>
					<TextField bind:value={selectedTemplateMeasure["ID_TemplateMeasure"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Dev Measure ID</div>
					<TextField bind:value={selectedTemplateMeasure["ID_TemplateMeasure_Dev"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={12} tablet={8} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Procedure</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_StoredProcedure"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={12} tablet={8} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Detail</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_DetailTable"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Criteria</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_Inclusion"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Provider</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_ProviderField"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Source</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_Source"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Patient</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_PatientField"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Date</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_DateField"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Subject</div>
					<TextField bind:value={selectedTemplateMeasure["Dep_Subject"]}></TextField>
				</div>
			</GridCell>
			<!-- end left side contents -->
		</Grid>
		<!-- end left side -->
		</GridCell>
		<!--  right side -->
		<GridCell desktop={4} tablet={4} phone={4} verticalFill={true} bind:clientHeight={userDetailsGridHeight} >
			<Card outlined actionable={false} skinnyCards>
				<Tab tabForProjects={false}>
					<div slot="roles-content" class="tabPadding">
							<Checkbox bind:checked={selectedTemplateMeasure["Dep_Include"]}>Dep Include</Checkbox>
							<br>
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
				{`${selectedTemplateMeasureIndex+1} of ${dimTemplateMeasureDevsDetails.length}`}
				</div>
				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-first-page="true" 
					on:click={ () => { selectedTemplateMeasureIndex = 0} }
					disabled="{(dimTemplateMeasureDevsDetails.length <= 0 || selectedTemplateMeasureIndex <= 0) ? true : null}"
				>
					<!-- It is a Sveltey thing to put an attribute = null instead of false, if you want Svelte to REMOVE the attribute. -->
					<div class="mdc-button__icon">first_page</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-prev-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = selectedTemplateMeasureIndex - 1 } }
					disabled="{(dimTemplateMeasureDevsDetails.length <= 0 || selectedTemplateMeasureIndex <= 0) ? true : null}"
				>
					<div class="mdc-button__icon">chevron_left</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-next-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = selectedTemplateMeasureIndex + 1 } }
					disabled="{(dimTemplateMeasureDevsDetails.length <= 0 || selectedTemplateMeasureIndex >= dimTemplateMeasureDevsDetails.length - 1) ? true : null}"
				>
					<div class="mdc-button__icon">chevron_right</div>
				</button>

				<button class="mdc-icon-button material-icons mdc-data-table__pagination-button"
					data-last-page="true"
					on:click={ () => { selectedTemplateMeasureIndex = dimTemplateMeasureDevsDetails.length - 1 } }
					disabled="{(dimTemplateMeasureDevsDetails.length <= 0 || selectedTemplateMeasureIndex >= dimTemplateMeasureDevsDetails.length - 1) ? true : null}"
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
		/* width: 40px; */
		min-width: 118px;
		text-align: right;
		vertical-align: middle;
		padding-right: 8px;
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
	}

	.cellLabel {
		-webkit-user-select: none; /* Safari */		
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}
</style>