<script lang="ts">
  import { WebViewer } from "@rerun-io/web-viewer";
  import { onMount } from "svelte";

  let ref: HTMLDivElement | null = $state(null);
  let rr: WebViewer | null = $state(null);

  const options = [
    {
      label: "arkit scenes",
      value: "https://app.rerun.io/version/0.20.3/examples/arkit_scenes.rrd",
    },
    { label: "helix", value: "https://app.rerun.io/version/0.20.3/examples/dna.rrd" },
    {
      label: "structure from motion",
      value: "https://app.rerun.io/version/0.20.3/examples/structure_from_motion.rrd",
    },
  ];
  let selected = $state(0);
  let prev = $state(0);

  function select(index: number) {
    if (prev !== index && rr?.ready) {
      rr.close(options[prev].value);
      rr.open(options[index].value);
      prev = index;
    }
  }

  $effect(() => {
    if (ref) {
      const viewer = new WebViewer();
      viewer
        .start(null, ref, {
          width: "100%",
          height: "100%",
        })
        .then(() => {
          rr?.open(options[selected].value);
        });
      rr = viewer;
    }
    return () => rr?.stop();
  });
</script>

<select onchange={(e) => select(e.currentTarget!.selectedIndex)}>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
<div id="viewer" bind:this={ref}></div>

<style>
  div {
    width: 100%;
    height: 100%;
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
