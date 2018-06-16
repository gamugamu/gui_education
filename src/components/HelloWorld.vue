<template>
  <div class="hello">
    <div class="columns isfullheigth">
      <div class="column is-one-fifth has-background-primary isfullheigth">
        <div>elmt</div>
        <div>elmt</div>
        <div>elmt</div>
        <drag class="drag" :transfer-data="{ example: 'styling' }">drag</drag>
      </div>
      <div class="column has-background-white-ter">

        <ul id="example-1">
          <li v-for="(item, index) in items">
            <h1 v-if="item.type == 'map_scenario'" class="map-scenario">Oui</h1>

            <drop v-else class="drop flow-container"
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

export default {
  name: 'HelloWorld',
  components: { Drag, Drop },
  data () {
    return {
      items: [
        { message: 'Foo' , over : false, type: "default"}
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
			handleDrop(data) {
        console.log("data", data);
				this.over = false;
        this.items.push({ message: 'zad', over : false, type: "map_scenario"});
				//alert(`You dropped with data: ${JSON.stringify(data)}`);
			},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.isfullheigth{
     height:300px;
}

.flow-container {
  height: 90px;
}

.map-scenario {
  height: 250px;
  background: yellow;
}

.over {
  border-color: #aaa;
  background: #ccc;
}
</style>
