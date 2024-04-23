<script lang="ts">
  import { WebViewer } from "@rerun-io/web-viewer";
  import { onMount } from "svelte";

  let ref: HTMLDivElement;

  onMount(() => {
    const rr = new WebViewer();
    rr.start(undefined, ref);
    return () => rr.stop();
  });
</script>

<p>Some text</p>
<div id="viewer" bind:this={ref} />

<style>
  p {
    background: red;
  }

  div {
    width: 100%;
    height: 640px;
  }

  :global(div#viewer > canvas) {
    position: initial !important;
    top: unset !important;
  }

  :global(:root),
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>
