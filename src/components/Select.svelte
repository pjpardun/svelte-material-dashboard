<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { MDCSelect } from '@material/select';
  import List from './List.svelte';

  // Internal variables

  /**
   * Set to false when ready to build
  */
  let logDebugging = false;
  let select;
  let selectElement;
  const dispatchSvelteEvent = createEventDispatcher();

  // Props
  export let listItems;
  export let value;
	/**
	 * Name of the object key that provides a unique ID (primary key) for the list of objects. This will be the "value" of the List item.
	 */
   export let listItemObjectKeyName = "dataValue";
	/**
	 * Name of the object key that provides a label for the item (non-unique). 
	 */
	export let listItemObjectLabelName = "label";

  // Component Initialization
  onMount(() => {
    select = new MDCSelect(selectElement)

    // This is copy and pasted from READ ME, unknown if it needs refactor
    // select.listen('MDCSelect:change', handleSelectChange);
  });

  onDestroy(() => {});

  const handleSelectChange = (event) => {
    if (logDebugging) console.log(`MDCSelect:change event has fired. Event content: ${JSON.stringify(event.detail)}`);
    // alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);

    // Set the bound variable to the new value so that external users can update their components when a new items is selected
    value = event.detail.value;

    // Refire the event with the same name so that outside code can on: it.
    dispatchSvelteEvent("MDCSelectChange",event.detail);
  };

  $: if (logDebugging) console.log(`Select.svelte:value = ${JSON.stringify(value)}`);

</script>

<div class="mdc-select mdc-select--outlined" bind:this={selectElement}>
  <div class="mdc-select__anchor" aria-labelledby="outlined-select-label">
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <!-- <span class="mdc-notched-outline__notch">
        <span id="outlined-select-label" class="mdc-floating-label"><slot name="label">Default label</slot></span>
      </span> -->
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <span class="mdc-select__selected-text-container">
      <span id="demo-selected-text" class="mdc-select__selected-text">
        {(!!value && value.hasOwnProperty(listItemObjectLabelName)) ? value[listItemObjectLabelName] : value}
      </span>
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg
          class="mdc-select__dropdown-icon-graphic"
          viewBox="7 10 10 5" focusable="false">
        <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10">
        </polygon>
        <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15">
        </polygon>
      </svg>
    </span>
  </div>

  <!-- Other elements from the select remain. -->
  <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
    {#if !!listItems}
      <List {listItems} {listItemObjectKeyName} {listItemObjectLabelName} bind:selectedValue={value} on:MDCSelectChange={handleSelectChange}></List>
    {:else}
      <slot></slot> <!-- list slot-->
    {/if}
  </div>
</div>




<style lang="scss" global>
@use "@material/theme" with (
  $primary: #018786,
  $secondary: #feeae6,
  $on-primary: #442b2d,
  $on-secondary: rgb(255, 255, 255),
);

  @use "@material/list/mdc-list";
  @use "@material/menu-surface/mdc-menu-surface";
  @use "@material/menu/mdc-menu";
  @use "@material/select/styles";

  // Theming
  @use '@material/select';

  .my-demo-select {
    @include select.filled-density(-2);
  }

  .demo-width-class {
    width: 400px;
  }

  .mdc-select--outlined .mdc-select__anchor {
    height: 45px;
  }

  .mdc-select {
    background-color: white;
  }  
</style>