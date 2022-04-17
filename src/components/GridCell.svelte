<script>
  import { onDestroy, onMount } from "svelte";

  // Internal variables
  const debuggingMessages = false;

  // Props
  export let clientWidth;
  export let clientHeight;

  export let height;

  export let colspan = null; // 1 - 12
  export let desktop = null; // 1 - 12
  export let tablet = null; // 1 - 8
  export let phone = null; // 1 - 4
  export let index = null; // 1 - 12
  export let position = null; // top, middle, bottom

  export let nested = false;
  export let verticalFill = false;

  // Component Initialization
  onMount( () => {} );
  onDestroy( () => {} );

</script>


<div class="mdc-layout-grid__cell" bind:clientWidth bind:clientHeight
class:mdc-layout-grid__cell--span-1={!!colspan && colspan <= 1}
class:mdc-layout-grid__cell--span-1-desktop={!!desktop && desktop <= 1}
class:mdc-layout-grid__cell--span-1-tablet={!!tablet && tablet <= 1}
class:mdc-layout-grid__cell--span-1-phone={!!phone && phone <= 1}

class:mdc-layout-grid__cell--span-2={!!colspan && colspan == 2}
class:mdc-layout-grid__cell--span-2-desktop={!!desktop && desktop == 2}
class:mdc-layout-grid__cell--span-2-tablet={!!tablet && tablet == 2}
class:mdc-layout-grid__cell--span-2-phone={!!phone && phone == 2}

class:mdc-layout-grid__cell--span-3={!!colspan && colspan == 3}
class:mdc-layout-grid__cell--span-3-desktop={!!desktop && desktop == 3}
class:mdc-layout-grid__cell--span-3-tablet={!!tablet && tablet == 3}
class:mdc-layout-grid__cell--span-3-phone={!!phone && phone == 3}

class:mdc-layout-grid__cell--span-4={!!colspan && colspan == 4}
class:mdc-layout-grid__cell--span-4-desktop={!!desktop && desktop == 4}
class:mdc-layout-grid__cell--span-4-tablet={!!tablet && tablet == 4}
class:mdc-layout-grid__cell--span-4-phone={!!phone && phone >= 4}

class:mdc-layout-grid__cell--span-5={!!colspan && colspan == 5}
class:mdc-layout-grid__cell--span-5-desktop={!!desktop && desktop == 5}
class:mdc-layout-grid__cell--span-5-tablet={!!tablet && tablet == 5}

class:mdc-layout-grid__cell--span-6={!!colspan && colspan == 6}
class:mdc-layout-grid__cell--span-6-desktop={!!desktop && desktop == 6}
class:mdc-layout-grid__cell--span-6-tablet={!!tablet && tablet == 6}

class:mdc-layout-grid__cell--span-7={!!colspan && colspan == 7}
class:mdc-layout-grid__cell--span-7-desktop={!!desktop && desktop == 7}
class:mdc-layout-grid__cell--span-7-tablet={!!tablet && tablet == 7}

class:mdc-layout-grid__cell--span-8={!!colspan && colspan == 8}
class:mdc-layout-grid__cell--span-8-desktop={!!desktop && desktop == 8}
class:mdc-layout-grid__cell--span-8-tablet={!!tablet && tablet >= 8}

class:mdc-layout-grid__cell--span-9={!!colspan && colspan == 9}
class:mdc-layout-grid__cell--span-9-desktop={!!desktop && desktop == 9}

class:mdc-layout-grid__cell--span-10={!!colspan && colspan == 10}
class:mdc-layout-grid__cell--span-10-desktop={!!desktop && desktop == 10}

class:mdc-layout-grid__cell--span-11={!!colspan && colspan == 11}
class:mdc-layout-grid__cell--span-11-desktop={!!desktop && desktop == 11}

class:mdc-layout-grid__cell--span-12={!!colspan && colspan >= 12}
class:mdc-layout-grid__cell--span-12-desktop={!!desktop && desktop >= 12}

class:mdc-layout-grid__cell--order-1={!!index && index <= 1}
class:mdc-layout-grid__cell--order-2={!!index && index == 2}
class:mdc-layout-grid__cell--order-3={!!index && index == 3}
class:mdc-layout-grid__cell--order-4={!!index && index == 4}
class:mdc-layout-grid__cell--order-5={!!index && index == 5}
class:mdc-layout-grid__cell--order-6={!!index && index == 6}
class:mdc-layout-grid__cell--order-7={!!index && index == 7}
class:mdc-layout-grid__cell--order-8={!!index && index == 8}
class:mdc-layout-grid__cell--order-9={!!index && index == 9}
class:mdc-layout-grid__cell--order-10={!!index && index == 10}
class:mdc-layout-grid__cell--order-11={!!index && index == 11}
class:mdc-layout-grid__cell--order-12={!!index && index >= 12}

class:mdc-layout-grid__cell--align-top={!!position && position.toLowerCase().trim() == "top"}
class:mdc-layout-grid__cell--align-middle={!!position && position.toLowerCase().trim() == "middle"}
class:mdc-layout-grid__cell--align-bottom={!!position && position.toLowerCase().trim() == "bottom"}

class:vertical-fill-available={verticalFill}
class:fixedHeight={height && height >= 0}
style="align-self: flex-start; --my-computed-height: {height}px"
>
  <slot nested={true}/>
</div>


<style lang="scss" global>

@use "@material/layout-grid/mdc-layout-grid";

.vertical-fill-available {
		height: 100%;
	}

  .fixedHeight {
    height: var(--my-computed-height);
  }

</style>