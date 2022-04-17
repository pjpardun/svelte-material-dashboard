<script>
	import { onDestroy, onMount, createEventDispatcher } from "svelte";
	import { MDCList } from '@material/list';
	import { MDCRipple } from "@material/ripple";

	// Internal variables
	let list;
	let listElement;
	const dispatchSvelteEvent = createEventDispatcher();

	// Props
	/**
	 * Can be an array of Strings.
	 * Can be an array of Objects like this: {"dataValue": 123, "label": "Volvo"}
	 * [
	 * 	 {"dataValue": 123, "label": "Volvo"},
	 *   {"dataValue": 234, "label": "Mazda"},
	 *   {"dataValue": 345, "label": "Toyota"}
	 * ]
	 */
	export let listItems;
	export let selectedValue;
	/**
	 * Name of the object key that provides a unique ID (primary key) for the list of objects. This will be the "value" of the List item.
	 */
	export let listItemObjectKeyName = null;
	/**
	 * Name of the object key that provides a label for the item (non-unique). 
	 */
	export let listItemObjectLabelName = null;
	/**
	 * Keep the list sorted by its label / value whenever it changes
	 */
	export let keepSorted = false;
	/**
	 * Sort order ascending when true, descending when false
	 */
	export let sortAscending = true;
	
	

	// Component Initialization
	onMount(() => {
		list = new MDCList(listElement)

		// Make the list ripples
		if (!!listItems) {
			list.listElements.map( (el) => {new MDCRipple(el)} )
		}
	});

	// Update list ripples when listItems are updated
	$: if (list && listItems) list.listElements.map( (el) => {new MDCRipple(el)} )

	// Re-sort the data when the list changes, if specified
	$: if (!!listItems && keepSorted && listItems.constructor.name == "Array" && listItems.length > 0) {
		if (listItems[0].constructor.name == "Object") {
			if (!!listItemObjectKeyName && !!listItemObjectLabelName && listItems[0].hasOwnProperty(listItemObjectKeyName) && listItems[0].hasOwnProperty(listItemObjectLabelName)) {
				// Generic object type
				listItems.sort( (a, b) => (sortAscending)
					? ((a[listItemObjectLabelName] < b[listItemObjectLabelName]) ? -1 : 1)
					: ((a[listItemObjectLabelName] > b[listItemObjectLabelName]) ? -1 : 1)
				) 
	
			} else if (listItems[0].hasOwnProperty("dataValue") && listItems[0].hasOwnProperty("label")) {
				// Old object type
				listItems.sort( (a, b) => (sortAscending) 
					? ((a["label"] < b["label"]) ? -1 : 1) 
					: ((a["label"] > b["label"]) ? -1 : 1)
				)
			}
		} else {
			// Must be a string or number or something
			listItems.sort( (a, b) => (sortAscending)
				? ((a < b) ? -1 : 1)
				: ((a > b) ? -1 : 1)
			) 
		}		
	}
	// $: console.log(`List.svelte:listItems = ${JSON.stringify(listItems)}`)
	// $: console.log(`List.svelte:selectedValue = ${JSON.stringify(selectedValue)}`)

	onDestroy(() => {});

	// Emits a Svelte event "MDCSelectChange" whenever the Select list item is clicked
	// Example payload = {"detail": {"selectedIndex": number, "value": string}}
	function emitSelectChange(changeObject) {
		console.log(`emitSelectChange for changeObject = ${JSON.stringify(changeObject)}`);
		selectedValue = listItems.filter( item => changeObject.value == item )[0];
		dispatchSvelteEvent('MDCSelectChange', changeObject);
	}

</script>

<ul bind:this={listElement} class="mdc-list">
	{#if !!listItems && listItems.constructor.name == "Array" && listItems.length > 0 && listItems[0].constructor.name !== "Object"}
	<!-- Non-object -->
		{#each listItems as listItem, index (listItem)}
		<!-- <b>Non-object</b> -->
			<li class="mdc-list-item" tabindex={(index == 0) ? index : null} 
				on:click={(evt)=>emitSelectChange({"selectedIndex": index, "value": listItem})}
				data-value={listItem}
				class:mdc-list-item--selected={listItem == selectedValue}
				aria-selected={ (listItem == selectedValue) ? "true" : "false"}>
				<span class="mdc-list-item__ripple"></span>
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">{listItem}</span>
					<!-- <span class="mdc-list-item__secondary-text">Secondary text</span> -->
				</span>
			</li>
		{/each}
	{:else if !!listItems && listItems.constructor.name == "Array" && listItems.length > 0 && listItems[0].constructor.name == "Object" && listItems[0].hasOwnProperty("dataValue") && listItems[0].hasOwnProperty("label")}
	<!-- Legacy Object -->
		{#each listItems as listItem, index (listItem.dataValue)}
			<!-- <b>Legacy Object</b> -->
			<li class="mdc-list-item" tabindex={(index == 0) ? index : null} 
				on:click={(evt)=>emitSelectChange({"selectedIndex": index, "value": listItem})} 
				data-value={listItem.dataValue}
				class:mdc-list-item--selected={!!selectedValue && listItem.dataValue == selectedValue.dataValue}
				aria-selected={ (!!selectedValue && listItem.dataValue == selectedValue.dataValue) ? "true" : "false"}>
				<span class="mdc-list-item__ripple"></span>
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">{listItem.label}</span>
					<!-- <span class="mdc-list-item__secondary-text">Secondary text</span> -->
				</span>
			</li>
		{/each}
	{:else if !!listItems && listItems.constructor.name == "Array" && listItems.length > 0 && listItems[0].constructor.name == "Object" && !!listItemObjectKeyName && !!listItemObjectLabelName && listItems[0].hasOwnProperty(listItemObjectKeyName) && listItems[0].hasOwnProperty(listItemObjectLabelName)}
	<!-- Generic object {listItemObjectKeyName} -->
		{#each listItems as listItem, index (listItem[listItemObjectKeyName])}
			<!-- <b>Generic Object</b> -->
			<li class="mdc-list-item" tabindex={(index == 0) ? index : null} 
				on:click={(evt)=>emitSelectChange({"selectedIndex": index, "value": listItem})} 
				data-value={listItem[listItemObjectKeyName]}
				class:mdc-list-item--selected={!!selectedValue && listItem[listItemObjectKeyName] == selectedValue[listItemObjectKeyName]}
				aria-selected={ (!!selectedValue && listItem[listItemObjectKeyName] == selectedValue[listItemObjectKeyName]) ? "true" : "false"}>
				<span class="mdc-list-item__ripple"></span>
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">{listItem[listItemObjectLabelName]}</span>
					<!-- <span class="mdc-list-item__secondary-text">Secondary text</span> -->
				</span>
			</li>
		{/each}
	{:else}
		<!-- slot for list item -->
		<slot>
			<span class = "slot">
				No items
			</span>
		</slot>
	{/if}
</ul>


<style lang="scss" global>
	@use "@material/list";

	@include list.deprecated-core-styles;

	.mdc-list-item__text {
		text-indent: -10px; 
		margin-left: 10px;
		line-height: 16px;
		margin-top: 4px;
		margin-bottom: 4px;
	}
	.mdc-list-item__text .mdc-list-item__primary-text {
		font-size: 14px;
		overflow-x: visible;
		white-space: normal;
		overflow-wrap: anywhere;
		line-height: 16px;
	}

	.slot {
		font-size: 14px;
		padding: 16px 16px;
	}
</style>