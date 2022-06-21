<template>
  <div class="contrast">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.contrast{
  padding: 20pt;
  background-color: rgba(4, 4, 4, 0.837);
  border-radius: 4pt;
  display: inline-block;
  width: calc(100% - 40pt);
  max-width: 800pt;
  text-align: left;
  color: white;
  margin-top: 20vh;
  margin-bottom: 20pt;
}

.contrast h1{
  font-weight: bold;
  font-size: 6em;
}

.contrast p{
  font-size: 1.2em;
}

.contrast p .name{
  color: rgb(239, 84, 151);
}

@media (max-width: 800px) {
  .contrast{
    margin-top: 20pt;
  }
}
</style>