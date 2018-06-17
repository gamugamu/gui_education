<template>
  <div class="map-scenario isfullheigth">
    <vue-slider v-bind="propitem.value" class="slide-epoc-range"></vue-slider>

    <div class="columns isfullheigth">
      <div class="column has-background-primary is-one-fifth">
        <div>elmt</div>
        <a class="button is-primary is-inverted is-outlined">carte</a>
      </div> <!-- column -->

      <div id="scenariboard" class="column isfullheigth relative">
        <div id="zanime" class="asset" style="position: absolute;" v-for="(asset, index) in assets" v-draggable="draggableArea">
            {{asset.layerX}} {{asset.layerY}}
        </div> <!-- asset-->
        <div id="mappreview" v-show="mapBackground.length > 0">
          <img :src="mapBackground">
        </div> <!-- map-preview -->
        <drop class="drop map-insert" @drop="handleFileDrop">insert map</drop>
      </div> <!-- column -->
    </div> <!-- columns -->

  </div> <!-- if -->
</template>

<script>
import Vue from 'vue';
import {Drop} from 'vue-drag-drop';
import vueSlider from 'vue-slider-component';
import { Draggable } from 'draggable-vue-directive'
import anime from 'animejs'

export default {
  name: 'chronoScene',
  directives: { Draggable},
  components: { Drop, vueSlider},
  props: ['propitem'],
  data () {
    return {
      mapBackground: "",
      assets: [],
      items: [
        { message: 'Foo' , over : false, type: "default"}
      ],
      draggableArea: {},
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {

    var elem = document.getElementById("scenariboard");
    if(elem) {
       console.log("elem? ", elem);
       this.draggableArea.boundingElement = elem
    }

  },
  methods: {
      handleFileDrop(data, event) {
				event.preventDefault();
				const files = event.dataTransfer.files;

        if (files && files[0]) {
               var reader = new FileReader();

               reader.onload = (e) => {
                   this.mapBackground = e.target.result;
               }

               reader.readAsDataURL(files[0]);
        }else{
          this.assets.push({layerX: event.layerX, layerY: event.layerY});
          console.log("dsds", document.getElementById('mappreview'));

          setTimeout(function() {

            anime({
              targets: document.getElementById('zanime'),
              opacity: .8, // Animate all divs opacity to .8
              duration: 2000,
              translateX: [
                { value: 100, duration: 1200 },
                { value: 0, duration: 800 }
              ],
              backgroundColor: '#FFF'
            });
          }, 100)
        }
			},
	}
}
</script>

<style scoped>

.relative{
  position: relative;
}

.isfullheigth{
  height:100%;
  margin: 0px;
  padding: 0px;
}

.map-scenario {
  height: 250px;
  margin-top: 20px;
  margin: 20px;
  padding: 0px;
  display: flex;
  flex-flow:column;
  background: black;
}

.slide-epoc-range{
  flex: 0 1 auto;
  background: red;
}

#scenariboard{
}

#mappreview{
  position:   absolute;
  flex:       1 1 auto;
  overflow:   hidden;
  height:     100%;
  z-index: 1;
}

.map-insert{
  position: absolute;
  flex: 1 1 auto;
  width: 100%;
  padding: 20px;
  height: 100%;
  z-index: 5;
  background-color: blue;
  opacity:    0.6;
  outline-offset: -10px;
  outline: 1px solid white;
}

.asset{
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: red;
  z-index: 10;
}
</style>
