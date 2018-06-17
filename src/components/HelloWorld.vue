<template>
  <div class="hello">
    <div class="columns isfullheigth">
      <div class="column is-one-fifth has-background-primary isfullheigth">
        <div>elmt</div>
        <drag class="drag" :transfer-data="{type: 'map_scenario'}">drag</drag>
      </div>
      <div class="column has-background-white-ter">

        <ul id="example-1">
          <li v-for="(item, index) in items">

            <div v-if="item.type == 'map_scenario'">
              <chronoScene :propitem=item></chronoScene>
            </div> <!-- if -->

            <customDrop v-else v-bind={handleDrop}></customDrop> <!-- else -->
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Drag, Drop} from 'vue-drag-drop';
import chronoScene from './chronoScene.vue'
import customDrop from './customDrop.vue'

export default {
  name: 'HelloWorld',
  components: { Drag, Drop, chronoScene, customDrop},
  data () {
    return {
      items: [
        { message: 'Foo' , over : false, type: "default"}
      ]
    }
  },
  methods: {
    handleDrop(data, transferData) {
      console.log("data ", data, transferData);
      this.over = false;

      this.items.push({
        message : 'zad',
        over    : false,
        type    : data.type,
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
          lazy: false,
          tooltip: "hover",
          piecewise: true
        },
        bgStyle : {
           backgroundColor: '#fff',
           boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
         }
       });
    },
			},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.over {
  border-color: #aaa;
  background: #ccc;
}

</style>
