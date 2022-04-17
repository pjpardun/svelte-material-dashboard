<script>
import { onDestroy, onMount, afterUpdate } from "svelte";
import { createEventDispatcher } from 'svelte';

import { mdiKeyOutline } from '@mdi/js';

import { MDCDataTable } from '@material/data-table';
import Select from "./Select.svelte";
import List from "./List.svelte";
import TextField from './TextField.svelte'

// Svelte event dispatcher
const dispatchSvelteEvent = createEventDispatcher();


// Internal variables
let debuggingMessages = true;

let dataTable;
let dataTableObject;
let headerKeys;
let primaryKeys;

let filterstring = "";


let paginationOptions = [5, 10, 20, 50, 100];
let numItemsOnPage = 5;

// Props
export let tableTitle = "Dessert calories";

export let selectable = true;
export let showCheckboxes = true;
export let stickyHeader = true;
export let allColumnsSortable = false;
export let selectMultiple = true;

export let page = 1;
export let startingItemIndex = 0;


/**
 * Optional data header (recommended) -- SET AFTER SETTING THE DATA
 */ 
export let header = [];

// Array of data objects
export let data = [];

// Delete the header if the data changes -- avoids errors.
// $: header = data.slice(0,0);

export let title = false;

// If there's no header but there is data, then generate a header from the available keys
$: headerKeys = ((!header || header.length <= 0) && (!!data && data.length > 0)) 
  ? (data.constructor.name == "Array") // There's data but no header
    ? Object.keys(data[0]).map( keyValue => { return {"key": keyValue, "label": keyValue} } ) // The data is an array
    : (data.constructor.name == "Object") 
      ? Object.keys(data).map( keyValue => { return {"key": keyValue, "label": keyValue} } ) // The data is an object
      : [] // The data is neither an array nor an object
  : (!!header && header.length > 0 && (!!data && data.length > 0)) 
    ? header // There's data and a header
    : []; // There's no data
// $: console.log(`headerKeys`, headerKeys);

// Make an array of the names of the header-specified data keys
$: primaryKeys = headerKeys.map( h => { if (h.isKey) return h.key } ).filter( e => e );
// $: console.log(`primaryKeys`, primaryKeys);


afterUpdate(() => {
  // Update the page layout whenever the number of pages is changed
  if (!!dataTable) {
    dataTable.layout();
  }
});


// Component Initialization
onMount(() => {
	dataTable = new MDCDataTable(dataTableObject)

  // Event listeners

  // Listen for row selection change
  dataTable.listen('MDCDataTable:rowSelectionChanged', (event) => {
    if (debuggingMessages) console.log(`Event fired: MDCDataTable:rowSelectionChanged`);
    if (debuggingMessages) console.log(`event.detail = ${JSON.stringify(event.detail)}`);
    // if (debuggingMessages) console.log(`event`);
    // if (debuggingMessages) console.log(event);
    dispatchSvelteEvent("rowSelectionChanged", event.detail);
  });

  // Listen for row selection select all
  dataTable.listen('MDCDataTable:selectedAll', (event) => {
    if (debuggingMessages) console.log(`Event fired: MDCDataTable:selectedAll`);
    if (debuggingMessages) console.log(`event.detail = ${JSON.stringify(event.detail)}`);
    dispatchSvelteEvent("selectedAll", event.detail);
  });

  // Listen for row selection unselect all
  dataTable.listen('MDCDataTable:unselectedAll', (event) => {
    if (debuggingMessages) console.log(`Event fired: MDCDataTable:unselectedAll`);
    if (debuggingMessages) console.log(`event.detail = ${JSON.stringify(event.detail)}`);
    dispatchSvelteEvent("unselectedAll", event.detail);
  });

  // Listen for column sort change
  dataTable.listen('MDCDataTable:sorted', (event) => {
    if (debuggingMessages) console.log(`Event fired: MDCDataTable:sorted`);
    if (debuggingMessages) console.log(`event.detail = ${JSON.stringify(event.detail)}`);
    if (debuggingMessages) console.log(`Field: [${event.detail.columnId}], Sort direction: [${event.detail.sortValue}]`);

    // Show indeterminate progress
    dataTable.showProgress();

    // Sort the data in place
    data.sort( (a, b) => {
      if (event.detail.sortValue == "ascending")
        return (a[event.detail.columnId] > b[event.detail.columnId]) ? 1 : -1;
      else if (event.detail.sortValue == "descending")
        return (a[event.detail.columnId] > b[event.detail.columnId]) ? -1 : 1;
      else
        return 0;
    });

    // Trigger for Svelte to recognize the data array has changed
    data = data;

    // Sort is done, hide indeterminate progress
    dataTable.hideProgress();

    // Pass on the word, in case someone outside DataTable needs to know when the data gets sorted
    dispatchSvelteEvent("sorted", event.detail);
  });


});

onDestroy(() => {});




// JavaScript APIs

// Use layout() API when new row checkboxes are added or removed from data table.

// Programmatically get / set row selection using following API's:
//  - getSelectedRowIds()
//  - setSelectedRowIds(string[])

// TODO: Data table component does not provide any JavaScript APIs for pagination.

// Should manually initialize following components supporting pagination feature:
//  - Select component: Used to change rows per page (page size).
//  - Icon button: Used to navigate between data table pages.
//  - Should re-render data table content when rows per page is changed or navigated to another page using events triggered by select & pagination button.
//  - Should manually enable or disable pagination buttons accordingly when data table reaches first or last page.

// Use showProgress() and hideProgress() API to show or hide the progress indicator.
//  - Data table component will automatically initializes the linear progress indicator subcomponent.

</script>


<!-- Data table -->
<div class="mdc-data-table" bind:this={dataTableObject}
  class:mdc-data-table--sticky-header={stickyHeader}
>
  <!-- Data table Title and Search bar -->
  {#if title}
    <div class="fake-mdc-card__media-content mdc-typography--headline6 table-title-spacing">
      <slot name="tableTitle">Table Title</slot>
    </div>
  {/if}
  <div class="filterBoxStyle">
    <TextField isSearch={true} bind:value={filterstring} placeholderText="Filter data"></TextField>
  </div>

  <hr class="ruler">


  <div class="mdc-data-table__table-container">
    
    <table class="mdc-data-table__table" class:aria-label={tableTitle}>

      <!-- Data table: header row -->
      <thead>
        <tr class="mdc-data-table__header-row">
          
          <!-- Checkbox column for selecting all rows -->
          {#if selectable}
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
            <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected" class:hideme={!selectMultiple}>
              <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Toggle all rows"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </th>
          {/if} <!-- selectable -->

          <!-- Make each header column -->
          {#each headerKeys as headerColumn (headerColumn.key)}
          <th data-column-id={headerColumn.key} aria-sort="none" role="columnheader" scope="col" class="mdc-data-table__header-cell"
            class:mdc-data-table__header-cell--with-sort={allColumnsSortable || headerColumn.isSortable}
          >
            <div class="mdc-data-table__header-cell-wrapper">
              <!-- Primary key icon -->
              {#if headerColumn.isKey || primaryKeys.includes(headerColumn.key)}
              <svg style="width:30px;height:24px" viewBox="0 0 30 24">
                <path fill="#cccccc" d={mdiKeyOutline}/></svg>
              {/if}

              <!-- Header label -->
              <div class="mdc-data-table__header-cell-label">{headerColumn.label}</div>
              
              <!-- Sort button icon and label -->
              {#if allColumnsSortable || headerColumn.isSortable}
              <button class="mdc-icon-button material-icons mdc-data-table__sort-icon-button"
                  aria-label="Sort by ${headerColumn.key}" 
                  aria-describedby="${headerColumn.key}-status-label">
                arrow_upward
              </button>
              <div id="${headerColumn.key}-status-label" class="mdc-data-table__sort-status-label" aria-hidden="true"/>
              {/if} <!-- Sort button -->

            </div>
          </th>
          {/each} <!-- Header columns -->

        </tr>
      </thead>


      <!-- Data table: data -->
      <tbody class="mdc-data-table__content">

        <!-- Display a message when there's no data -->
        {#if !data || data.length <= 0}
        <p style="color:#aaaaaa;text-align:center;">There is no data to display.</p>
        {/if}

        <!-- Row of data -->
        {#each data.filter( o => 
            // Look through each key in the object
            Object.keys(o).map( k => 

              // Does the search string exist in the value?
              String(o[k]).toLowerCase().includes(filterstring.toLowerCase())

            // Combine all the value search results into a single result for the object
            ).reduce( (r, t) => r || t, false ) 
          )
          
          .slice(startingItemIndex, (startingItemIndex + numItemsOnPage >= data.length) ? data.length : (startingItemIndex + numItemsOnPage))
           as datum, i 
          (datum[primaryKeys.concat(headerKeys[0].key)[0]]) 
        }
        <tr class="mdc-data-table__row" data-row-id={"u"+((primaryKeys && primaryKeys.length > 0) ? primaryKeys.map( pk => datum[pk]).reduce( (key, k) => key + k) : startingItemIndex+i)} >
          
          <!-- Checkbox for selecting data row -->
          {#if selectable}
            <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
              <div class="mdc-checkbox mdc-data-table__row-checkbox">
                <!-- Checkbox or radio button -->
                {#if selectMultiple}
                <input type="checkbox" class="mdc-checkbox__native-control" 
                  aria-labelledby={"u"+((primaryKeys && primaryKeys.length > 0) ? primaryKeys.map( pk => datum[pk]).reduce( (key, k) => key + k) : startingItemIndex+i)}/>
                {:else}
                <input type="radio" class="mdc-checkbox__native-control" data-indeterminate="false" name="datatablecontents" 
                    checked={ i <= 0 } 
                    aria-labelledby={"u"+((primaryKeys && primaryKeys.length > 0) ? primaryKeys.map( pk => datum[pk]).reduce( (key, k) => key + k) : startingItemIndex+i)}/>
                {/if}
                <div class="mdc-checkbox__background">
                  <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                  </svg>
                  <div class="mdc-checkbox__mixedmark"></div>
                </div>
                <div class="mdc-checkbox__ripple"></div>
              </div>
            </td>
          {/if} <!-- Checkbox to select row -->

          <!-- Columns of data in the row -->
          {#each headerKeys as head, j}
          {#if j==0}
            <th class="mdc-data-table__cell" scope="row" id={"u"+((primaryKeys && primaryKeys.length > 0) ? primaryKeys.map( pk => datum[pk]).reduce( (key, k) => key + k) : startingItemIndex+i)}
              class:mdc-data-table__cell--numeric={!!datum[head.key] && datum[head.key].constructor.name == "Number"}>
              {datum[head.key]}
            </th>
          {:else}
            <td class="mdc-data-table__cell"
              class:mdc-data-table__cell--numeric={!!datum[head.key] && datum[head.key].constructor.name == "Number"}>
              {datum[head.key]}
            </td>
          {/if}
          {/each} <!-- Column of data in row-->

        </tr>
        {/each} <!-- Row of data -->

      </tbody>
    </table>
  </div>


  <!-- Data table: pagination controls -->
  <div class="mdc-data-table__pagination">
    <div class="mdc-data-table__pagination-trailing">
      
      <!-- Rows per page -->
      <div class="mdc-data-table__pagination-rows-per-page">
        <div class="mdc-data-table__pagination-rows-per-page-label">Rows per page</div>

        <Select listItems={paginationOptions} bind:value={numItemsOnPage}
          on:MDCSelectChange={(evt)=>console.log(`App caught MDCSelectChange evt on Select = ${JSON.stringify(evt.detail)}`)}
        >
          <List listItems={paginationOptions}
            on:MDCSelectChange={(evt)=>console.log(`App caught MDCSelectChange evt = ${JSON.stringify(evt.detail)}`)}
          ></List>
        </Select>

      </div> <!-- END Rows per page selection -->

      <!-- Pagination navigation -->
      <div class="mdc-data-table__pagination-navigation">
        <div class="mdc-data-table__pagination-total">
          {`${startingItemIndex+1}‑${(startingItemIndex + numItemsOnPage + 1 >= data.filter( o => Object.keys(o).map(k=> String(o[k]).toLowerCase().includes(filterstring.toLowerCase())).reduce( (r, t) => r || t, false ) ).length) ? data.filter( o => Object.keys(o).map(k=> String(o[k]).toLowerCase().includes(filterstring.toLowerCase())).reduce( (r, t) => r || t, false ) ).length : (startingItemIndex + numItemsOnPage + 1)} of ${data.filter( o => Object.keys(o).map(k=> String(o[k]).toLowerCase().includes(filterstring.toLowerCase())).reduce( (r, t) => r || t, false ) ).length}`}
        </div>
        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-first-page="true" on:click={ () => { startingItemIndex = 0} } disabled="{(data.length <= 0 || startingItemIndex <= 0) ? true : null}">
          <div class="mdc-button__icon">first_page</div>
        </button>
        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-prev-page="true" on:click={ () => { startingItemIndex = (startingItemIndex - numItemsOnPage <= 0) ? 0 : startingItemIndex - numItemsOnPage } } disabled="{(data.length <= 0 || startingItemIndex <= 0) ? true : null}">
          <div class="mdc-button__icon">chevron_left</div>
        </button>
        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-next-page="true" on:click={ () => { startingItemIndex = (startingItemIndex + numItemsOnPage >= data.length) ? data.length - 1 : startingItemIndex + numItemsOnPage } } disabled="{(data.length <= 0 || startingItemIndex >= data.length - numItemsOnPage) ? true : null}">
          <div class="mdc-button__icon">chevron_right</div>
        </button>
        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-last-page="true" on:click={ () => { startingItemIndex = data.length - numItemsOnPage } } disabled="{(data.length <= 0 || startingItemIndex >= data.length - numItemsOnPage) ? true : null}">
          <div class="mdc-button__icon">last_page</div>
        </button>
      </div> <!-- END Pagination navigation -->
    </div> <!-- END Pagination trailing section -->
  </div> <!-- END Pagination -->


  <!-- Progress indicator -->
  <div class="mdc-data-table__progress-indicator">
    <div class="mdc-data-table__scrim"></div>
    <div class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-data-table__linear-progress" role="progressbar" aria-label="Data is being loaded...">
      <div class="mdc-linear-progress__buffer">
        <div class="mdc-linear-progress__buffer-bar"></div>
        <div class="mdc-linear-progress__buffer-dots"></div>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  </div> <!-- END Progress indicator -->

</div>




<style lang="scss" global>

@use "@material/theme" with (
  $primary: #018786,
  // $secondary: #feeae6,
  // $on-primary: #442b2d,
  $on-secondary: rgb(255, 255, 255),
);


@use "@material/checkbox"; // Required only for data table with row selection.
@use "@material/icon-button"; // Required only for data table with column sorting.
@use "@material/data-table/data-table";

@include checkbox.core-styles;
@include icon-button.core-styles;
@include data-table.core-styles;
@include data-table.theme-baseline;

.mdc-data-table {
  // margin: 20px;  
  width: 100%;
  // padding: 20px;
  border-width: 1px;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  border-style: solid;
  display: block;
}

.ruler {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
}

.table-title-spacing {
  padding-top: 16px;
  padding-left: 16px;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.mdc-data-table__cell--numeric {
  text-align: left;
}

.hideme {
  display:none;
}

.fake-mdc-card__media-content {
  /*position: absolute;*/
  /*left: 0;*/
  display: block;
  float: left;
  box-sizing: border-box;
}

.filterBoxStyle {
  width:400px; 
  float:right; 
  margin: 10px;
}

// .big-radio {
//   transform: scale(1.8);
//   margin-left: 4px;
// }

</style>