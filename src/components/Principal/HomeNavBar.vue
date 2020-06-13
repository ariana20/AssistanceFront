<template>
  <b-navbar toggleable="lg" type="dark" style="box-shadow: rgba(0, 0, 0, 0.1) 0px -3px 26px;background:#FFFFFF;position: fixed;width:100%;margin-top:0;height:60px;">
      <!--<b-navbar-brand><router-link to="/">SoftVizcochitos</router-link></b-navbar-brand>-->
        <Tabs/>
        <figure class="image-logo" >
                <img src="@/assets/images/assistance-logo.png" height="65vh" width="65vw" />			
        </figure>
    </b-navbar>
</template>

<script>
import Tabs from '@/components/Principal/TabsNavBar.vue'
export default {
  components: {
    Tabs,
  },
}
</script>

<style>
  .sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 8.1%;
  left: 0;
  background-color: #009892;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  }

  .sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #FFFFFF;
  display: block;
  transition: 0.3s;
  }

  .sidenav a:hover {
  color: #f1f1f1;
  }

  .sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  }
  .image-logo{
    margin-top:1%;
    margin-left:5%;
  }
  @media screen and (max-height: 800px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
  .image-logo{
    margin-top:-10%;
    height: 1vh;
    margin-left:-4%;
  }
  }
</style>