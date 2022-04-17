<script>
	import { onMount } from 'svelte';
	import Card from '../components/Card.svelte';
	import Grid from '../components/Grid.svelte';
	import GridCell from '../components/GridCell.svelte';
	import Highcharts from 'highcharts';

	/**
	 * Debugging: This should be switched to false when we build the final app
	 */
	let logDebugging = false;
	let initialized = false;

	/**
	 * Back end REST data services
	 */
	let server = "http://localhost:3030";
	export let offline = false;

	
	/**
	 * Data objects + default data values to avoid 'undefined' pagination
	 */
	// Projects
	let projects = [];

	// donut char variables
	let donutdata;
	let adopted, datashared, dashrollup;

	// vbar chart variables
	let morris, lawson, burke;
	let labsMorris, monitMorris, visitsMorris, pharmMorris;
	let labsLawson, monitLawson, visitsLawson, pharmLawson;
	let labsBurke, monitBurke, visitsBurke, pharmBurke;

	// line chart variables
	let jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec;

	// bar chart variables
	let pediatrics, oncology, obstetricsAndGynecology, surgery, orthopedics, neuroscience, endocrinology, cardiology, familyMedicine;


	/**
	 * Get Data from REST service
	 */
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

			// Data handling for donut chart
			adopted = projects.filter( item => item["DESC_ProjectStatus"] == "Adopted" ).length;
			datashared = projects.filter( item => item["DESC_ProjectStatus"] == "Data Shared" ).length;
			dashrollup = projects.filter( item => item["DESC_ProjectStatus"] == "Dashboard Rollup" ).length;

			donutdata = [
				["adopted", adopted],
				["data shared", datashared],
				["dashboard", dashrollup]
			];
	
			// Data handling for vbar chart
			// Morris
			labsMorris = projects.filter( item => item["DESC_ProjectType"] == "Labs" && item["ID_BusinessAnalyst"] == "MorrisF" ).length;
			monitMorris = projects.filter( item => item["DESC_ProjectType"] == "Monitoring" && item["ID_BusinessAnalyst"] == "MorrisF" ).length;
			visitsMorris = projects.filter( item => item["DESC_ProjectType"] == "Visits" && item["ID_BusinessAnalyst"] == "MorrisF" ).length;
			pharmMorris = projects.filter( item => item["DESC_ProjectType"] == "Pharmacy" && item["ID_BusinessAnalyst"] == "MorrisF" ).length;
			morris = [labsMorris, monitMorris, visitsMorris, pharmMorris]

			// Lawson
			labsLawson = projects.filter( item => (item["DESC_ProjectType"] == "Labs" && item["ID_BusinessAnalyst"] == "LawsonN") ).length;
			monitLawson = projects.filter( item => item["DESC_ProjectType"] == "Monitoring" && item["ID_BusinessAnalyst"] == "LawsonN" ).length;			
			visitsLawson = projects.filter( item => item["DESC_ProjectType"] == "Visits" && item["ID_BusinessAnalyst"] == "LawsonN" ).length;
			pharmLawson = projects.filter( item => item["DESC_ProjectType"] == "Pharmacy" && item["ID_BusinessAnalyst"] == "LawsonN" ).length;
			lawson = [labsLawson, monitLawson, visitsLawson, pharmLawson]
	
			//Burke
			labsBurke = projects.filter( item => item["DESC_ProjectType"] == "Labs" && item["ID_BusinessAnalyst"] == "BurkeD" ).length;
			monitBurke = projects.filter( item => item["DESC_ProjectType"] == "Monitoring" && item["ID_BusinessAnalyst"] == "BurkeD" ).length;
			visitsBurke = projects.filter( item => item["DESC_ProjectType"] == "Visits" && item["ID_BusinessAnalyst"] == "BurkeD" ).length;
			pharmBurke = projects.filter( item => item["DESC_ProjectType"] == "Pharmacy" && item["ID_BusinessAnalyst"] == "BurkeD" ).length;
			burke = [labsBurke, monitBurke, visitsBurke, pharmBurke]

			// Data handling for line chart
			jan = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-01" ).length;
			feb = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-02" ).length;
			mar = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-03" ).length;
			apr = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-04" ).length;
			may = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-05" ).length;
			jun = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-06" ).length;
			jul = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-07" ).length;
			aug = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-08" ).length;
			sep = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-09" ).length;
			oct = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-10" ).length;
			nov = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-11" ).length;
			dec = projects.filter( item => item["DT_ProjectStartDate"].substring(0,7) == "2020-12" ).length;

			// Data handling for pie chart
			pediatrics = projects.filter( item => item["DESC_ProvSpec"] == "Pediatrics" ).length;
			oncology = projects.filter( item => item["DESC_ProvSpec"] == "Oncology" ).length;
			obstetricsAndGynecology = projects.filter( item => item["DESC_ProvSpec"] == "Obstetrics and Gynecology" ).length;
			surgery = projects.filter( item => item["DESC_ProvSpec"] == "Surgery" ).length;
			orthopedics = projects.filter( item => item["DESC_ProvSpec"] == "Orthopedics" ).length;
			neuroscience = projects.filter( item => item["DESC_ProvSpec"] == "Neuroscience" ).length;
			endocrinology = projects.filter( item => item["DESC_ProvSpec"] == "Endocrinology" ).length;
			cardiology = projects.filter( item => item["DESC_ProvSpec"] == "Cardiology" ).length;
			familyMedicine = projects.filter( item => item["DESC_ProvSpec"] == "Family Medicine" ).length;

			if (logDebugging) console.log(donutdata);
		})
		.catch( err => {
			console.error(`There was some sort of error in getProjects() -- ${err}`);

			// Backend is unhealthy
			offline = true;
		});
	};


	let drawBarChart = (morrisData, lawsonData, burkeData) => {
		Highcharts.chart('bar', {
			chart: { type: 'bar' },
			title: { text: 'Project Managers & Project Types' },
            xAxis: { categories: ['Labs', 'Monitoring', 'Visits', 'Pharmacy'] },
            yAxis: { 
				title: { text: 'Number of projects' }
			},
			series: [
				{ name: 'MorrisF', data: morris }, 
				{ name: 'LawsonN',	data: lawson },
				{ name: 'BurkeD', data: burke }
			]
		});
	};
	$: if (initialized) drawBarChart(morris, lawson, burke)


	let drawDonutChart = (donutdata) => {
		Highcharts.chart('donut', {
			chart: { plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false },
			title: { text: 'Project<br>statuses<br>', align: 'center', verticalAlign: 'middle', y: 60 },
			tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
			accessibility: { point: { valueSuffix: '%' } },
			plotOptions: {
				pie: {
					dataLabels: { enabled: true, distance: -50, style: { fontWeight: 'bold', color: 'white' } },
					startAngle: -90, endAngle: 90, center: ['50%', '75%'], size: '110%'
				}
			},
			series: [
				{ type: 'pie', name: 'Project Statuses', innerSize: '50%', data: donutdata }
			]
		});	

	};
	$: if (initialized) drawDonutChart(donutdata);


	let drawLineChart = (jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec) => {
		Highcharts.chart('line', {
			title: { text: 'Project Start Dates'},
			yAxis: { 
				title: { text: ' ' }, 
			},
			xAxis: { 
                type: 'datetime',
                tickInterval: 1000 * 3600 * 24 *30 // 1 month
			},
			legend: { 
				layout: 'vertical', align: 'right', verticalAlign: 'middle' 
			},
			plotOptions: { 
				series: { label: { connectorAllowed: false }, } 
			},
			series: [{ 
				name: 'Number of projects', 
				type: 'line', // column if bar chart
                data : [{x: Date.UTC(2020,0,1), y: jan},
                        {x: Date.UTC(2020,1,1), y: feb},
                        {x: Date.UTC(2020,2,1), y: mar},
                        {x: Date.UTC(2020,3,1), y: apr},
                        {x: Date.UTC(2020,4,1), y: may},
                        {x: Date.UTC(2020,5,1), y: jun},
                        {x: Date.UTC(2020,6,1), y: jul},
                        {x: Date.UTC(2020,7,1), y: aug},
                        {x: Date.UTC(2020,8,1), y: sep},
                        {x: Date.UTC(2020,9,1), y: oct},
                        {x: Date.UTC(2020,10,1), y: nov},
                        {x: Date.UTC(2020,11,1), y: dec}]
				 }],
			responsive: { 
				rules: [{ condition: { maxWidth: 500 }, chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' }}}]
			}

		});
	};
	$: if (initialized) drawLineChart(jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec);


	let drawPieChart = (pediatrics, oncology, obstetricsAndGynecology, surgery, orthopedics, neuroscience, endocrinology, cardiology, familyMedicine) => {
		Highcharts.chart('pie', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Project Specialties'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			series: [{
				name: 'Brands',
				colorByPoint: true,
				data: [
					{ name: 'Pediatrics', y: pediatrics, sliced: true, selected: true }, 
					{ name: 'Oncology', y: oncology }, 
					{ name: 'Obstetrics and Gynecology', y: obstetricsAndGynecology }, 
					{ name: 'Surgery', y: surgery }, 
					{ name: 'Orthopedics', y: orthopedics }, 
					{ name: 'Neuroscience', y: neuroscience }, 
					{ name: 'Endocrinology', y: endocrinology }, 
					{ name: 'Cardiology', y: cardiology }, 
					{ name: 'Family Medicine', y: familyMedicine }
				]
			}]
			});
	};
	$: if (initialized) drawPieChart(pediatrics, oncology, obstetricsAndGynecology, surgery, orthopedics, neuroscience, endocrinology, cardiology, familyMedicine);

	onMount( () => {
		initialized = true;

		getProjects()

	})
</script>


<Card actionable={false} title={true} outlined={true}>
	<div slot="title">Dashboard Reports</div>
	<Grid>
		<GridCell desktop={6} tablet={6} phone={6}>
			<Card skinnyCards actionable={false}>
				<div id="bar"></div>
			</Card>
		</GridCell>
		<GridCell desktop={6} tablet={6} phone={6}>
			<Card skinnyCards actionable={false}>
				<div id="pie"></div>
			</Card>
		</GridCell>
		<GridCell desktop={6} tablet={6} phone={6}>
			<Card skinnyCards actionable={false}>
				<div id="line"></div>
			</Card>
		</GridCell>
		<GridCell desktop={6} tablet={6} phone={6}>
			<Card skinnyCards actionable={false}>
				<div id="donut"></div>
			</Card>
		</GridCell>
	</Grid>
</Card>


<style>

</style>