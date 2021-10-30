<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template v-slot:header>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">{{ table1.title }}</h4>
            <button type="button" class="btn btn-sm" @click="showModal">
              <i class="tim-icons icon-simple-add m-auto"></i>
            </button>
          </div>
        </template>
        <div v-if="xModal">
          <modal
            :show.sync="xModal"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <template v-slot:header>
              Upload a New Post
            </template>
            <div class="form-floating">
              <textarea
                class="form-control border-dark border rounded-1"
                placeholder="Leave your post here"
                v-model="posttext"
                id="floatingTextarea"
              ></textarea>
            </div>
            <template v-slot:close-button></template>
            <button type="button" class="btn mt-3" @click="addPost()">
              Submit Post
            </button>
            <p v-if="error" class="text-danger label">
              Error has occurred
            </p>
          </modal>
          <!-- <Modal class="modal" :show.sync="xModal" @close='closeModal()'>
        <template v-slot:header>
        Upload a New Post
          </template>
          <textarea rows='4' cols='50' v-model='posttext'></textarea>
          <template v-slot:close-button></template>
          <button type='button' @click='addPost()'>Submit Post</button>
      </Modal> -->
        </div>
        <div class="table relative">
          <base-table
            :data="posts"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>
    <div class="container h">
      <button
        type="button"
        class="btn-outline-primary mr-1 navigation"
        v-for="index in pages"
        :key="index"
        @click="next(index)"
      >
        {{ index }}
      </button>

      <button
        type="button"
        class="btn-outline-primary mr-1 navigation"
        @click="addone"
      >
        >
      </button>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import { Modal } from "@/components";
const tableColumns = ["Thread", "Name", "Replies"];
import API from "../api/API";

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      error: false,
      posttext: "",
      xModal: false,
      table1: {
        title: "Forum Discussion",
        columns: [...tableColumns],
        data: [
          {
            
            thread: "why is my gas bill so high?",
            username: "kendricklamar",
            replies: "7"
          },
          {
            
            thread: "which appliances to use less to save water?",
            username: "angela",
            replies: "15"
          },
          {
            
            thread: "how do I pay my bills on this application?",
            username: "carlbruner",
            replies: "3"
          },
          {
            
            thread:
              "Can I save more electricity by increasing the temperature of the air-con? ",
            username: "timotheechalamet",
            replies: "5"
          },
          ,
          {
            
            thread: "I can't find my bill? ",
            username: "arianagrande123",
            replies: "27"
          },
          {
            
            thread: "How can I save more electricity? ",
            username: "doraemon66",
            replies: "88"
          },
          {
            
            thread: "Can I pay my bill on the application? ",
            username: "harrystyles",
            replies: "51"
          },
          {
            
            thread: "What are the payment methods available on this platform? ",
            username: "tomhiddleston",
            replies: "3"
          },
          {
            
            thread:
              "I have save 30% of my total bill thanks to this app! Will share with my friends about UT Buddy! ",
            username: "makkie",
            replies: "10"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "",
            replies: "9"
          },
          {
            
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          }
        ]
      },
      page: 1
    };
  },
  computed: {
    pages() {
      var no_pages = Math.ceil(this.table1.data.length / 10);
      return no_pages;
    },
    posts() {
      var end = this.page * 10;
      return this.table1.data.slice(end - 10, end);
    }
  },
  methods: {
    next(index) {
      this.page = index;
    },
    addone() {
      this.page += 1;
    },
    async addPost() {
      var t = this.posttext;
      var date = new Date();

      const token = window.localStorage.getItem("token");
      try {
        const res1 = await API.findProfile(token)
        const {name} = res1.data[0]
        var username = name.split(" ")[0]
        
        this.table1.data.unshift({thread: t, username, replies: "0"})
      } catch (error) {
        console.log(error)
      }
      try {
        console.log(date);
        console.log(username)
        const result = await API.addPost({ date, post: t, username, replies:0 }, token);
      } catch (error) {
        this.error = true;
      }
      
      this.xModal = false;
    },
    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    }
  },
  async mounted(){
    const token = window.localStorage.getItem("token");
    try {
      
      const res = await API.token(token);
      try {
        const result = await API.findPost(token);
        var data = result.data
        
        data.sort(function(a, b){return b.date - a.date});
        
        for (var i=0;i<data.length;i++){
          
          this.table1.data.unshift({thread: data[i].post, username: data[i].username, replies: String(data[i].replies)})
        }
        
      } catch (error) {
        this.error = true;
      }

    } catch(err){
      window.localStorage.clear()
      this.$router.push("/")
    }
      
  }
};
</script>

<style lang="scss" scoped>
.h {
  text-align: center;
  margin: 5px;
}
.navigation {
  cursor: pointer;
}

.relative {
  position: relative;
}

.modal .modal-dialog {
  margin-bottom: 5cm !important;
}

.add {
  background-color: purple;
}
</style>
