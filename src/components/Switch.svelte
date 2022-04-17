<script>



</script>

<div class="mdc-switch">
  <div class="mdc-switch__track"></div>
  <div class="mdc-switch__thumb-underlay">
    <div class="mdc-switch__thumb"></div>
    <input type="checkbox" id="basic-switch" class="mdc-switch__native-control" role="switch" aria-checked="false">
  </div>
</div>
<label for="basic-switch"><slot/></label>

<!--  src="./Button.scss" -->
<style lang="scss" global>
@use '../node_modules/@material/switch';

.foo-switch {
  // @include switch.core-styles;
}
</style>