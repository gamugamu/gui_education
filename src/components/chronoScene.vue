<template>
  <div class="map-scenario isfullheigth">
    <vue-slider @callback="slideChange" v-model="slidervalue" v-bind="propitem.value" class="slide-epoc-range"></vue-slider>
    <div class="columns isfullheigth">
      <div class="column has-background-primary is-one-fifth">
        <div>elmt</div>
        <a class="button is-primary is-inverted is-outlined">carte</a>
      </div> <!-- column -->
      <div id="scenariboard" class="column isfullheigth relative">
        <div :key="asset.id" v-for="(asset, key) in assets" v-bind:id="asset.id" class="asset" v-draggable="draggableArea">
          <img  class="medal" alt="imgAvatar">

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
import {Draggable} from 'draggable-vue-directive'
import anime from 'animejs'
import {AssetScenario} from '../logic/asset.js'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default {
  name: 'chronoScene',
  directives: { Draggable},
  components: { Drop, vueSlider},
  props: ['propitem'],
  data () {
    return {
      slidervalue : 1, // alias getCurrentTimeLine(). ReadOnly
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
    getCurrentTimeLine(){
        return this.slidervalue;
    },
    onPosChanged(positionDiff, absolutePosition, event) {
        if(event && absolutePosition && event.target.className == "asset"){
          var assetKey  = event.target.id
          var asset     = this.assets[assetKey]
          // retourne souvent les mauvais id. Ceux qui ne sont pas lié aux assets
          if(asset){
            // on récupère la valeur indiqué par le range: C'est lui le controleur
            // de la timeLine
            var timeline  = this.getCurrentTimeLine()
            var board     = document.getElementById("scenariboard")
            var guiAsset  = document.getElementById(assetKey)
            // calcul offset. Relatif au board
            var layerX    = guiAsset.offsetLeft - board.offsetLeft
            var layerY    = guiAsset.offsetTop - board.offsetTop

            /***/
            asset.updateTick(timeline, layerX, layerY)
          }
        }
    },
    slideChange(tick){
      // TODO extern
      for(var assetId in this.assets){
        var asset     = this.assets[assetId]
        var assetTick = asset.tickFor(tick)
        // si il y a un tick, il y a un change à effectuer
        if(assetTick){
          console.log("new tick*** ", assetTick);
        //  console.log("tick ", assetTick)
          var assetDrag = document.getElementById(assetId);
          var board     = document.getElementById("scenariboard")
          // inverse, position absolu
          var vectlayerX    = assetTick.layerX + board.offsetLeft
          var vectlayerY    = assetTick.layerY + board.offsetTop
          console.log("--> ", assetDrag);
          // Note: Les valeurs sont relative au board
          var animeCallback = anime({
            targets         : assetDrag,
            left            : vectlayerX,
            top             : vectlayerY,
            backgroundColor : '#FFF',
            easing          : 'easeInOutSine',
            duration        : 200
          });

          // Effectue les correctifs d'affichage entre animation et drag
          animeCallback.complete = function(anim) {
            // Oui, l'update de la position est mega pénible!. Drag
            // conserve des meta de positions, et faut les réupdater.A externaliser
            var draggable = assetDrag.getAttribute("draggable-state")
            draggable     = JSON.parse(draggable)     // ** deserial
            //  draggable.currentDragPosition = {"left" : 0, "top" : 0}
            draggable.startDragPosition.left  = vectlayerX;
            draggable.startDragPosition.top   = vectlayerY;

            draggable     = JSON.stringify(draggable) // ** serial

            assetDrag.setAttribute("draggable-state", draggable)
          }; // animeCallback
        } // end tick
      } // for
    },
      handleFileDrop(data, event) {
				event.preventDefault();
				const files = event.dataTransfer.files;

        // ajout background
        if (files && files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
               this.mapBackground = e.target.result;
            }

            reader.readAsDataURL(files[0]);
        }else /* ajout assets */ {
          var assetId       = "asset_" + uuidv4() /* TODO génerer random */
          var assetScenario = new AssetScenario(assetId, this.getCurrentTimeLine(), event.layerX, event.layerY)
          Vue.set(this.assets, assetId, assetScenario)
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
  background: yellow;
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
  background-color: black;
  opacity:    0.4;
  outline-offset: -10px;
  outline: 1px solid white;
}

.asset{
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  z-index: 10;
  background-color: red;
}

.medal{
}
</style>
