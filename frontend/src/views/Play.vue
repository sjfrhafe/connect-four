<template>
  <div class="play">
      <div class="mobile">
            <h4>Sowwy</h4>
            <p>this game is not adapted for mobile devices. </p>
            <img class='mb-3' src="@/assets/cat.jpg" alt="">
            <b-button variant='primary' @click='back'>Back Home</b-button>
      </div>
      <side-bar />
      <connect-four />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import ConnectFour from '@/components/games/ConnectFour.vue'
export default {
    
    created(){
        this.$store.dispatch('connectWs')
    }, 
    components: {
        SideBar, 
        ConnectFour
    }, 
    methods: {
        back(){
            this.$router.push({name: 'Home'})
        }
    }
}
</script>

<style>
.play{
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
}

.mobile{
    display: none;
}
@media (max-width: 800px) {
    .mobile{
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
        display: flex;
        position: fixed;
        left: 0; 
        top: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: 1000;
    }

    .mobile > img{
        height: 20vh;
        border-radius: 3pt;
    }
}
</style>