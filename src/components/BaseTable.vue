<template>
  <table style="table-layout:fixed;" class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" class="text-center col" :key="column" >
            {{ column }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" class="text-center" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in item" :key="index" style="word-wrap:break-word;  width: 100%">
            <span v-if="index !== 'paid'">
              <span v-if="index == 'link'">
                <base-button
                  slot="footer"
                  type="primary"
                  v-if="!item.paid"
                  @click="bills(item)"
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
                  class="btn btn-"
                  @click="emit(item)"
                >
                  {{ column }}
                </button>
              </span>
              <span v-else-if="index == 'replies'">
                {{ column }}
              </span>
              <span v-else-if="index == 'thread'">
              
                {{column}}
                
                <span v-if="item.isUser"
                  > <i
                    class="tim-icons icon-trash-simple add ml-4"
                    style="cursor: pointer"
                    @click="remove(item)"
                  ></i
                ></span>
                
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
const token = window.localStorage.getItem("token");

export default {
  name: "base-table",
  data() {
    return {
      token: token
    };
  },
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
    emit(item) {
      this.$emit("modal", item);
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    bills(item) {
      this.$emit("goTo", item);
    },
    remove(item){
      this.$emit("delete", item)
    }
  }
};
</script>
<style></style>
