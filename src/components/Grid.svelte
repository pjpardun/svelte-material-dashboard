<script>
  import { onDestroy, onMount } from "svelte";

  // Internal variables
  const debuggingMessages = false;

  // Props
  export let fixedColumnWidth = false;
  export let gridPosition = null;
  export let nested = false;
  export let verticalFill = false;

  // Component Initialization
  onMount( () => {} );
  onDestroy( () => {} );

</script>


{#if !nested}
  <div class="mdc-layout-grid"
    class:mdc-layout-grid--fixed-column-width={fixedColumnWidth}
    class:mdc-layout-grid--align-left={!!gridPosition && gridPosition.toLowerCase().trim() == "left"}
    class:mdc-layout-grid--align-right={!!gridPosition && gridPosition.toLowerCase().trim() == "right"}
    class:vertical-fill-available={verticalFill}
  >
    <div class="mdc-layout-grid__inner"
      class:vertical-fill-available={verticalFill}
    >
      <slot nested={true}/>
    </div>

  </div>
{:else}

  <div class="mdc-layout-grid__inner" 
    class:vertical-fill-available={verticalFill}
  >
    <slot nested={true}/>
  </div>
  
{/if}


<style lang="scss" global>

@use "@material/layout-grid/mdc-layout-grid";

.vertical-fill-available {
		height: 100%;
	}


</style>