<script>
	import { onDestroy, onMount } from "svelte";
	import { MDCFormField } from '@material/form-field';
	import { MDCCheckbox } from '@material/checkbox';
	import { v4 as uuidv4 } from 'uuid';

	// Internal variables
	let formfield
	let checkbox
	let formfieldObject
	let checkboxObject
	let uniqueCheckboxId = uuidv4();

	// Props
	export let checked = false;

	// Component Initialization
	onMount( () => {
		formfield = new MDCFormField(formfieldObject);
		checkbox = new MDCCheckbox(checkboxObject);
		formfield.input = checkbox;
	} );
	onDestroy( () => {} );


</script>


<div class="mdc-form-field" bind:this={formfieldObject}>
	<div class="mdc-checkbox" bind:this={checkboxObject}>
	  <input bind:checked={checked} type="checkbox" class="mdc-checkbox__native-control" id={`checkbox-${uniqueCheckboxId}`}/>
	  <div class="mdc-checkbox__background">
		<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
		  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
		</svg>
		<div class="mdc-checkbox__mixedmark"></div>
	  </div>
	  <div class="mdc-checkbox__ripple"></div>
	</div>
	<label for={`checkbox-${uniqueCheckboxId}`}><slot>{`Checkbox ${uniqueCheckboxId}`}</slot></label>
  </div>


<style lang="scss" global>
	@use '@material/checkbox';
	@use "@material/form-field";

	@include checkbox.core-styles;
	@include form-field.core-styles;

	// $color: blue;

	// .mdc-checkbox .mdc-checkbox__background {
	// 	@include checkbox.container-colors ($color, $color, $color, $color, false);
	// }
</style>