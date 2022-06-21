<template>
  <div :class="{'player-list-item': true, 'offline': !player.active}">
      <img class="avatar" src="@/assets/avatar_dummy.jpg" alt="">
      <div class='display-name'>{{displayName}}</div>
      <b-badge v-if='$store.getters.me.id === player.id' class='ml-2'>You</b-badge>
  </div>
</template>

<script>
export default {
    props: ['player'], 
    computed: {
        displayName(){
            return this.player ? this.player.name : 'anonymous'
        }, 
        avatarUrl(){
            return this.player ? this.player.avatar : '@/assets/avatar_dummy.png'
        }
    }
}
</script>

<style>
.player-list-item{
    display: flex;
    color: white;
    padding: 4pt 10pt;
    background-color: #222;
    border-radius: 4pt;
    align-content: center;
    align-items: center;
    margin-bottom: 4pt;
    transition: background-color 200ms ease;
    user-select: none;
}

.player-list-item:hover{
    background-color: #333;
}

.avatar{
    height: 2em;
    border-radius: 50%;
}

.display-name{
    margin-left: 1em;
    position: relative;
}

.offline > .avatar{
    filter: grayscale(1);
}

.offline > .display-name::after{
    content: 'lost connection';
    position: absolute;
    left: 0;
    bottom: -.7em;
    font-size: .6em;
    color: red;
}
</style>