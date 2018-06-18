<template>
    <drop class="drop"
        :class="{over}"
        @dragover   = "over = true"
        @dragleave  = "over = false"
        @drop       = "handleDrop">
        drop
    </drop>
</template>

<script>
import Vue from 'vue';
import { Drop } from 'vue-drag-drop';

export default {
  name: 'customDrop',
  props: ['handleDrop'],
  components: { Drop },
  data () {
    return {
      over: false
    }
  },
  methods: {

	}
}
</script>
