<template>
    <div class="alerts">
        <b-alert v-for='alert in $store.getters.alerts' :key='alert.id' show :variant="alert.type" dismissible>
            {{alert.message}}
        </b-alert>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.alerts{
    position: fixed;
    right: 20pt;
    bottom: 20pt;
    width: 90%;
    max-width: 300pt;
    text-align: left;
    z-index: 10;
}
</style>