<template>
  <div class="map-scenario isfullheigth">
    <vue-slider @callback="slideChange" v-bind="propitem.value" class="slide-epoc-range"></vue-slider>
{{ sliderValueChange }}
    <div class="columns isfullheigth">
      <div class="column has-background-primary is-one-fifth">
        <div>elmt</div>
        <a class="button is-primary is-inverted is-outlined">carte</a>
      </div> <!-- column -->

      <div id="scenariboard" class="column isfullheigth relative">
        <div :key="asset.id" v-for="(asset, key) in assets" v-bind:id="asset.id" class="asset" style="position: absolute;" v-draggable="draggableArea">
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
      sliderValueChange: 12,
      mapBackground: "",
      assets: {},
      items: [
        { message: 'Foo' , over : false, type: "default"}
      ],
      draggableArea: {},
    }
  },
  mounted: function () {
    // boundRect assets | scenariboard
    var elem = document.getElementById("scenariboard")
    this.draggableArea.boundingElement  = elem
    this.draggableArea.onPositionChange = this.onPosChanged
  },
  methods: {
    onPosChanged(positionDiff, absolutePosition, event) {
        console.log("left corner", positionDiff, absolutePosition, event);
        if(event && absolutePosition){
          var asset =  event.target
          console.log("dsds", event.offsetX);
          console.log(asset.offsetLeft, asset.offsetTop);

          var assetKey  = event.target.id
          var assetData = this.assets[assetKey]

          // retourne souvent les mauvais id. Ceux qui ne sont pas lié aux assets
          if(assetData){
            var board         = document.getElementById("scenariboard")
            assetData.layerX  = asset.offsetLeft - board.offsetLeft
            assetData.layerY  = asset.offsetTop - board.offsetTop
            Vue.set(this.assets, assetKey, assetData)

            console.log("obj ", asset.offsetTop - board.offsetTop);
          }
        }
        //event.target
    },
    slideChange(tick){
      // TODO extern
      for(var e in this.assets){
        console.log("e ", e)

        var asset = this.assets[e]
        // si il y a un tick, il y a un change à effectuer
        if(asset.tick === tick){
          console.log("tick ", asset, asset.id, document.getElementById(asset.id))
          anime({
            targets: document.getElementById(asset.id),
            opacity: .8,
            duration: 2000,
            translateX: [
              { value: 100, duration: 1200 }            ],
            backgroundColor: '#FFF'
          });
        }
        console.log("e ", asset, asset.tick, tick);
      }
    },
      handleFileDrop(data, event) {
				event.preventDefault();
				const files = event.dataTransfer.files;

        // background
        if (files && files[0]) {
               var reader = new FileReader();

               reader.onload = (e) => {
                   this.mapBackground = e.target.result;
               }

               reader.readAsDataURL(files[0]);
        }else /* assets */ {
          // this.assets["rand_id"] = {...}
          Vue.set(this.assets, "rand_id", {
              id      : "rand_id",
              tick    : this.propitem.value.value,
              layerX  : event.layerX,
              layerY  : event.layerY})

          console.log("push --> ", this.assets);
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
