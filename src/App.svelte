<script>
	import Router, {link} from 'svelte-spa-router';
	import AppBar from './components/AppBar.svelte';
	import Drawer from './components/Drawer.svelte';
	import Main from './components/Main.svelte';
	import IconButton from './components/IconButton.svelte';
	import SnackBar from './components/Snackbar.svelte';
	import { mdiMenu, mdiMenuOpen, mdiTrumpet } from '@mdi/js';
	import { onMount } from 'svelte';

	// Pages
	import Templates from './pages/Templates.svelte';
	import Projects from './pages/Projects.svelte';
	import UserProfiles from './pages/UserProfiles.svelte';
	import DevProfiles from './pages/DevProfiles.svelte';
	import Dashboard from './pages/Dashboard.svelte';

	// Defining routes to pages
	const routes = {
		// Home
		'/templates': Templates,
		'/projects': Projects,
		'/userprofiles': UserProfiles,
		'/devprofiles': DevProfiles,
		'/dashboard': Dashboard,
		'/': Templates
	}

	// Settings for Top App Bar and Side Menu
	let toggled = false;
	let dismissible = true;
	let modal = false;
	let short = false;
	let shortAlwaysClosed = false;
	let fixed = true;
	let prominent = false;
	let dense = true;


	// Used for binding
	let appSnackBar;
	let appBarElement;


	// Back end REST data services
	let server = "http://localhost:3030";
	let offline = false;

	/**
	 * Show an error message on the snackbar
	 * @param message
	 */
	const showError = (message = "An error occurred.") => {
		if (!!appSnackBar) { appSnackBar.open(message); } 
	};

	// Show a connection error message when we lose the backend.
	$: if (offline) { showError(`Lost the connection to the server ${server}`) }



	onMount( () => {

	});
</script>


<AppBar bind:this={appBarElement} {short} {shortAlwaysClosed} {fixed} {prominent} {dense}>
	<span slot="title">
		Cockapoo Metadata
	</span>
	<span slot="icon-button" class="iconButtonStyle">
		<IconButton 
			on:click={ () => { console.log("button clicked") }}
			on:MDCIconButtonToggle={(data) => console.log(JSON.stringify(data.detail))} 
			svgIcon={mdiMenu}
			svgIconToggled={mdiMenuOpen}
			bind:toggled={toggled}
			ariaLabel="Menu Closed"
		/>
	</span>
	<span slot="appbar-items"><div/></span>
</AppBar>

<Drawer bind:drawerOpen={toggled} {dismissible} {modal}></Drawer>

<Main>
	<p hidden={!offline} style={'color:#ff0000;'}>The server is disconnected.</p>

	<Router {routes}></Router>

	<footer class="mdc-typography--overline footer">Copyright © Cockapoo Web Designs, LLC</footer>
</Main>

<SnackBar bind:this={appSnackBar}></SnackBar>


<style>
:global(.mdc-text-field) {
	width: 100%;
		/*TODO: only works in component - debug so we can pull it out
		height: 35px;
		*/
}

.iconButtonStyle {
  height: -webkit-fill-available;
}


:global(.mdc-button) {
	margin: 20px;
	margin-left: 24px;
}

.footer {
	padding: 20px;
}
</style>