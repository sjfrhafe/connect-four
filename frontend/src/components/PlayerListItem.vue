<template>
  <div class='player-list-item'>
      <img class="avatar" src="@/assets/avatar_dummy.png" alt="">
      <div class='display-name'>{{displayName}}</div>
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
}

.display-name{
    margin-left: 1em;
}
</style>