<script>
import { onDestroy, onMount } from "svelte";
import { createEventDispatcher } from 'svelte';

import { mdiTransferLeft , mdiTransferRight , mdiArrowUpThick, mdiArrowDownThick } from '@mdi/js';

import List from "./List.svelte";
import IconButton from "./IconButton.svelte";
import Grid from "./Grid.svelte";
import GridCell from "./GridCell.svelte";
import Card from "./Card.svelte";


let gridcellobject;


// List objects
let leftListObject;
let rightListObject;

// Selected objects
let leftSelected = null;
let rightSelected = null;

// Props
export let leftSide = [];
export let rightSide = [];
/**
 * For arrays of objects, keyName is the object key name for the object value which uniquely identifies an object in the array.
 */
export let keyName = null;
/**
 * For arrays of objects, labelName is the object key name for the object value which labels the object.
 */
export let labelName = null;

export let height = null;


// Component Initialization
onMount(() => {});
onDestroy(() => {});



let transferLeftToRight = () => {
 
  if (leftSelected !== null) {
    // Example payload = {"selectedIndex": number, "value": string}
    [].concat(leftSelected).map( item => {
      // IF it's got an index, and if the right side exists, splice the index from the left to the right
      if (item.selectedIndex !== null && !!rightSide) {
        rightSide = rightSide.concat( leftSide.splice(item.selectedIndex, 1) );
      }
    });

    // Unselect the left side
    leftSelected = null;
  
    // Refresh the Svelte GUI the sveltey way
    leftSide = leftSide;
  }

};

let transferRightToLeft = () => {
  if (rightSelected !== null) {
    // Example payload = {"selectedIndex": number, "value": string}
    [].concat(rightSelected).map( item => {
      // IF it's got an index, and if the right side exists, splice the index from the left to the right
      if (item.selectedIndex !== null && !!leftSide) {
        leftSide = leftSide.concat( rightSide.splice(item.selectedIndex, 1) );
      }
    });
  
    // Unselect the right side
    rightSelected = null;

    // Refresh the Svelte GUI the sveltey way
    rightSide = rightSide;
  }

};

// console.log(gridcellobject);

</script>



<Grid nested={true} verticalFill={true}>
  <GridCell desktop={5} tablet={3} phone={4} verticalFill={true}>
    <Card actionable={false} skinnyCards={true} verticalFill={true} title={true} outlined={true} scrollable={ ((height) ? true : false) } bind:height>
      <div class="titleStyle" slot="title">
        <slot name="leftTitle">Options</slot>
      </div>
      <List bind:this={leftListObject} keepSorted={true} listItems={leftSide} 
        listItemObjectKeyName={keyName} listItemObjectLabelName={labelName} 
        on:MDCSelectChange={ (evt) => leftSelected = evt.detail } />
    </Card>
  </GridCell>
  <GridCell desktop={2} tablet={2} phone={4} bind:this={ gridcellobject } verticalFill={true}>
    <div style="height: 31%;"></div>
    <IconButton disabled={leftSelected == null} on:click={ transferLeftToRight } svgIcon={ mdiTransferRight } ariaLabel="Transfer to right" />
    <IconButton disabled={rightSelected == null} on:click={ transferRightToLeft } svgIcon={ mdiTransferLeft } ariaLabel="Transfer to left" />
  </GridCell>
  <GridCell desktop={5} tablet={3} phone={4} verticalFill={true}>
    <Card actionable={false} skinnyCards={true} verticalFill={true} title={true} outlined={true} scrollable={ ((height) ? true : false) } bind:height >
      <div class="titleStyle" slot="title">
        <slot name="rightTitle">Selected</slot>
      </div>
      <List bind:this={rightListObject} listItems={rightSide} 
        listItemObjectKeyName={keyName} listItemObjectLabelName={labelName} 
        on:MDCSelectChange={ (evt) => rightSelected = evt.detail } />
    </Card>
  </GridCell>
</Grid>



<style lang="scss" global>
  .mdc-card__content .freeform-text-content {
    padding: 0;
    min-height: 246px;
  } 
  .mdc-layout-grid__cell {
    align-self: center;
  }

  .titleStyle {
    display: flex;
    justify-content: center;
    font-size: var(--mdc-typography-button-font-size, 0.875rem);
    line-height: var(--mdc-typography-button-line-height, 2.25rem);
    letter-spacing: var(--mdc-typography-button-letter-spacing, 0.0892857143em);
    text-transform: var(--mdc-typography-button-text-transform, uppercase);
    justify-content: center;

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    // background-color: rgba(153, 216, 214,0.4);
    background-color: rgba(0, 164, 162,.2);
  }

</style>
