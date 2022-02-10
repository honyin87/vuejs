import Vue from "vue";
import { $api } from "@/services/api-service";

Vue.mixin({
  computed: {
    $api: () => $api
  }
});