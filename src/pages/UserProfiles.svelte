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
	 * TODO: Turn into parameter
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
	let dimUsers = [{}];
	let dimUsersHeader;
	let dimUserDetails = {};
	let dimUserRoleDetails = {};


	/**
	 * Get Data from REST service
	 */
	// Users
	async function getDimUsers() {
		fetch(server + '/dimUsers', {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {
			if (logDebugging) console.log(`Received projects from backend REST service.`);

			// Backend is good to go
			offline = false;

			dimUsers = json;
			dimUsersHeader = [
				{"label": "ID", "key": "ID_UserID", "isNumeric": false, "isKey": true, "isSortable": true},
				{"label": "Full Name", "key": "DESC_UserFullName", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Email", "key": "DESC_UserEmail", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "Location", "key": "DESC_UserCompany", "isNumeric": false, "isKey": false, "isSortable": true},
				{"label": "First Name", "key": "DESC_UserFirstName", "isNumeric": true, "isKey": false, "isSortable": true},
				{"label": "Last Name", "key": "DESC_UserLastName", "isNumeric": true, "isKey": false, "isSortable": true},
			];	
		})
		.catch( err => {
			console.error(`There was some sort of error in getDimUsers() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};


	/**
	 * Get Data from REST service - subsets based on IDs
	 */
	// User By User ID
	async function getDimUserByUserId(userID) {
		// Get rid of "u" prefix on ID
		console.log(server + '/dimUserByUserId' + `?userID=${userID}`);
		fetch(server + '/dimUserByUserId' + `?userID=${userID}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received user details from backend REST service.`);

			// Assign into drop down list
			dimUserDetails = json[0]; // Always arrives as an object in an array
			console.log(dimUserDetails["ID_UserID"])
			// Build the selected object from data items
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getDimUserByUserId() -- ${err}`);
		});
	};


	// User Roles By User ID
	async function getDimUsersRolesByUserId(userID) {
		// Get rid of "u" prefix on ID
		console.log(server + '/dimUsersRolesByUserId' + `?userID=${userID}`);
		fetch(server + '/dimUsersRolesByUserId' + `?userID=${userID}`, {
			method: 'GET'
		})
		.then( res => res.json() )
		.then( json => {			
			// Backend is good to go
			offline = false;
			if (logDebugging) console.log(`Received user details from backend REST service.`);

			// Assign into drop down list
			dimUserRoleDetails = json[0]; // Always arrives as an object in an array
			// Build the selected object from data items
			// selectedTemplateType = templateTypes.filter( t => t.dataValue == templateDetails.ID_ProjectType.toString() )[0];

			// if (logDebugging) console.log(templateDetails);
		})	
		.catch( err => {
			// Backend is unhealthy
			offline = true;
			console.error(`There was some sort of error in getDimUsersRolesByUserId() -- ${err}`);
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
				let userID = event.detail.rowId.substring(1); //trim first character off (material design event adds a 'u')
				getDimUsersRolesByUserId(userID);
				getDimUserByUserId(userID);
			} 
			
		} else {
			if (logDebugging) console.log(`DESELECTED`);
		}
	};


	onMount( () => {
		getDimUsers();
	});
</script>


<Grid>
	<GridCell desktop={12} tablet={8} phone={4}>
		<DataTable data={dimUsers} header={dimUsersHeader} title={true} selectMultiple={false} on:rowSelectionChanged={loadDetails}>
			<div slot="tableTitle">Users</div>
		</DataTable>
	</GridCell>
</Grid>
<Card actionable={false} title={true} outlined={true}>
	<div slot="title">
		User Details
	</div>
	<Grid>
		<!-- left side -->
		<GridCell desktop={8} tablet={8} phone={4} height={userDetailsGridHeight}>
		<!-- left side contents -->
		<Grid nested={true}>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">ID</div>
					<TextField bind:value={dimUserDetails["ID_UserID"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Name</div>
					<TextField bind:value={dimUserDetails["DESC_UserFullName"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">First Name</div>
					<TextField bind:value={dimUserDetails["DESC_UserFirstName"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Last Name</div>
					<TextField bind:value={dimUserDetails["DESC_UserLastName"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Company</div>
					<TextField bind:value={dimUserDetails["DESC_UserCompany"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={6} tablet={4} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Department</div>
					<TextField bind:value={dimUserDetails["DESC_UserDepartment"]}></TextField>
				</div>
			</GridCell>
			<GridCell desktop={12} tablet={8} phone={4}>
				<div class="cellContents">
					<div class="cellLabel">Email</div>
					<TextField bind:value={dimUserDetails["DESC_UserEmail"]}></TextField>
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

							<Checkbox bind:checked={dimUserRoleDetails["FL_Subscriber"]}>Subscriber</Checkbox>
							<br>
							<Checkbox bind:checked={dimUserRoleDetails["FL_BusinessAnalyst"]}>Manager</Checkbox>
							<br>
							<Checkbox bind:checked={dimUserRoleDetails["FL_ProjectLead"]}>Lead</Checkbox>
							<br>
							<Checkbox bind:checked={dimUserRoleDetails["FL_Champion"]}>Champion</Checkbox>
							<br>
							<Checkbox bind:checked={dimUserRoleDetails["FL_Admin"]}>Admin</Checkbox>
							<br>
							<Checkbox bind:checked={dimUserRoleDetails["FL_ReportsAnalyst"]}>Report Analyst</Checkbox>
				</div>
				</Tab>
			</Card>
		</GridCell>
	</Grid>
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

	.tabPadding {
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
	}
</style>