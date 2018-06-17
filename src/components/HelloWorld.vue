<template>
  <div class="hello">
    <div class="columns isfullheigth">
      <div class="column is-one-fifth has-background-primary isfullheigth">
        <div id="uuu">elmt</div>
        <div>elmt</div>
        <div>elmt</div>
        <drag class="drag" :transfer-data="{ example: 'styling' }">drag</drag>
      </div>
      <div class="column has-background-white-ter">

        <ul id="example-1">
          <li v-for="(item, index) in items">

            <div v-if="item.type == 'map_scenario'" class="map-scenario isfullheigth">
              <vue-slider v-bind="item.value" class="slide-epoc-range"></vue-slider>
              <div class="columns isfullheigth">
                <div class="column has-background-primary is-one-fifth">
                  <div>elmt</div>
                  <a class="button is-primary is-inverted is-outlined">carte</a>
                </div>

                <div class="column isfullheigth relative">

                  <div id="zanime" class="asset" style="position: absolute;" v-for="(asset, index) in assets" v-draggable="draggableValue">
                      {{asset.layerX}} {{asset.layerY}}
                  </div>
                  <!-- -->
                  <div class="map-preview" v-if="imageData.length > 0">
                    <img :src="imageData">
                  </div>
                  <drop class="drop map-insert" @drop="handleFileDrop">insert map</drop>
                </div>
              </div>
            </div>

            <drop v-else class="drop flow-container container"
              :class="{over : item.over}"
              @dragover   = "item.over = true"
              @dragleave  = "item.over = false"
              @drop       = "handleDrop(index)">
              {{ item.message }}
              {{ item.over }}
            </drop>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Drag, Drop} from 'vue-drag-drop';
import vueSlider from 'vue-slider-component';
import { Draggable } from 'draggable-vue-directive'
import anime from 'animejs'

export default {
  name: 'HelloWorld',
  directives: { Draggable},
  components: { Drag, Drop, vueSlider},
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
    // entire view has been rendered
    console.log("mounted", document.getElementById('uuu'));
    });
    anime({
      targets: document.getElementById('uuu'),
      opacity: .8, // Animate all divs opacity to .8
      duration: 2000,
      rotate: 180,
      backgroundColor: '#FFF' // Animate all divs background color to #FFF
    });
  },
  data () {
    return {
      imageData: "",
      assets: [],
      items: [
        { message: 'Foo' , over : false, type: "default"}
      ],
      draggableValue: {
        boundingRect: {left:30, top:30, right:200, bottom:200}
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      resize(newRect) {
        this.width  = newRect.width;
        this.height = newRect.height;
        this.top    = newRect.top;
        this.left   = newRect.left;
      },
			handleDrop(data) {
				this.over = false;
        this.items.push({
          message : 'zad',
          over    : false,
          type    : "map_scenario",
          value   : {
            value: 9,
            width: 280,
            height: 8,
            dotSize: 20,
            min: 1,
            max: 25,
            interval: 4,
            disabled: false,
            show: true,
            speed: 0.3,
            reverse: false,
            lazy: true,
            tooltip: "hover",
            piecewise: true
          },
          bgStyle : {
             backgroundColor: '#fff',
             boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
           }
         });
			},
      handleFileDrop(data, event) {
				event.preventDefault();
        //console.log("event ", event);
				const files = event.dataTransfer.files;

        if (files && files[0]) {
               // create a new FileReader to read this image and convert to base64 format
               var reader = new FileReader();
               // Define a callback function to run, when FileReader finishes its job
               reader.onload = (e) => {
                   // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                   // Read image as base64 and set to imageData
                   this.imageData = e.target.result;
               }
               // Start the reader job - read file as a data url (base64 format)
               reader.readAsDataURL(files[0]);
        }else{
          this.assets.push({layerX: event.layerX, layerY: event.layerY});
          setTimeout(function afterTwoSeconds() {
            console.log('2')
            console.log("* --->", document.getElementById('zanime'));
            anime({
              targets: document.getElementById('zanime'),
              opacity: .8, // Animate all divs opacity to .8
              duration: 2000,
              translateX: [
                { value: 100, duration: 1200 },
                { value: 0, duration: 800 }
              ],
              backgroundColor: '#FFF' // Animate all divs background color to #FFF
            });
          }, 100)

        }
			},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html {
  height: 100%;
}

.relative{
  position:   relative;
}

.isfullheigth{
  height:100%;
  margin: 0px;
  padding: 0px;
}

.flow-container {
  height: 100%;
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

.map-preview{
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

.over {
  border-color: #aaa;
  background: #ccc;
}
</style>
