<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" class="text-center" :key="column">
            {{ column }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" class="text-center" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in item" :key="index">
            <span v-if="index !== 'paid'">
              <span v-if="index == 'link'">
                <base-button
                  slot="footer"
                  type="primary"
                  v-if="!item.paid"
                  @click="goTo(item)"
                  >Pay</base-button
                >
                <base-button slot="footer" type="primary" v-else disabled="true"
                  >Paid</base-button
                >
              </span>
              <span
                v-else-if="
                  index == 'name' || index == 'price' || index == 'date'
                "
                >{{ column }}</span
              >
              <span v-else-if="index == 'username'">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="emit(item)"
                >
                  {{column}}
                </button>
              </span>
              <span v-else-if="index == 'thread' || index == 'replies'">
                {{ column }}
              </span>
            </span>
          </td>
          <!-- <td>
          {{item.name}}
        </td>
        <td>
          {{item.price}}
        </td>
        <td>
          <base-button slot="footer" type="primary" v-if="!item.paid" @click="goTo(item)">Pay</base-button>
          <base-button slot="footer" type="primary" v-else disabled='true'>Paid</base-button>
        </td>
        <td>
          {{item.date}}
        </td> -->
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import API from "../api/API";
export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes"
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    }
  },
  
  methods: {
    emit(item){
      this.$emit("modal", item)
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    async goTo(item) {
      const token = window.localStorage.getItem("token");
      item.paid = true;
      var count = 0;
      var data = this.data.slice().reverse();
      for (var arr of data) {
        if (arr.name == item.name) {
          break;
        }
        count += 1;
      }

      const date = new Date();
      var string_date = String(date).substring(4, 24);
      console.log(string_date);
      try {
        const result = API.stripeupdate({ count, date: string_date }, token);
      } catch (error) {
        console.log(error);
      }

      window.open(item.link);
    }
  }
};
</script>
<style></style>
