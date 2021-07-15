<template>
  <v-container>
    <!-- header -->
    <v-row>
      <v-col cols="7" md="6" align="start">
        <div class="welcome">
          Good Morning
        </div>
        <div class="name">
          Lione
        </div>
      </v-col>
      <v-col cols="5" md="6" align="end">
        <v-badge
          color="#FF8585"
          :content="total2"
          bordered
          overlap
        >
          <v-btn
            class="mx-2"
            fab
            small
            @click="finished()"
            style="background-color:#A0FFC1;"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </v-badge>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center" style="margin-top:10px;margin-left:-6px;">
      <v-col style="padding-left:0px;">
        <v-btn
          class="mx-2"
          fab
          small
          style="background-color:#A0FFC1;"
        >
          {{ todos.length }}
        </v-btn>
        <span class="active-todo">
          Active To-do List
        </span>
      </v-col>
    </v-row>
    <!-- list todo -->
    <v-row class="list-todo" dense align="center" justify="center" style="">
      <v-col v-if="todos.length === 0" align="center" style="padding-left:0px;">
        Empty 😞
      </v-col>
      <v-col v-else align="center" style="padding-left:0px;">
        <draggable v-model="todos" tag="ul" class="list-group" handle=".handle" style="padding-left:0px;">
          <v-row v-for="(item, index1) in todos" :key="index1" align="center" class="card-todo" style="">
            <v-col @click="details(item.data.id, index1)" cols="6" class="judul" align="start" justify="center">
              {{ item.data.title }}
            </v-col>
            <v-col cols="6" align="end" justify="center">
              <v-btn
                color="#FF8585"
                small
                class="handle"
              >
                <v-icon color="white">
                  mdi-drag-horizontal
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" align="start" style="padding-bottom:0px;">
              <v-progress-linear
                color="deep-purple accent-4"
                :value="( item.data.active / item.data.list.length ) * 100"
              />
            </v-col>
            <v-col class="value-progress" align="start" cols="12" style="padding-top:10px;">
              {{ item.data.active }} /{{ item.data.list.length }} Task Completed
            </v-col>
            <v-col v-for="(item2, index) in item.data.list" :key="index" cols="12" style="padding-bottom:0px;padding-top:0px;">
              <v-row dense align="center" style="background-color:;padding:0px;margin:0px;">
                <v-col cols="auto" style="padding:0px;height:30px;padding-right:10px;">
                  <v-checkbox :input-value="item2.status" style="padding:0px;height:20px;margin-top:0px;" @change="check($event, index1, index)" />
                </v-col>
                <v-col align="start" style="padding:0px;height:30px;">
                  {{ item2.name }}
                </v-col>
              </v-row>
            </v-col>
            <v-row dense align="center" style="margin-bottom:10px;margin-top:5px;">
              <v-col
                cols="6"
                align="start"
                style="padding-bottom:0px;font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 10px;
padding-left:15px;
line-height: 12px;"
              >
                {{ item.data.time }}
              </v-col>
              <v-col cols="auto" align="center" justify="end" style="padding-bottom:0px;">
                <v-btn
                  icon
                  color="black"
                  x-small
                  @click="deleted(item.data.title, index1)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" align="center" justify="end" style="padding-bottom:0px;">
                <v-btn
                  icon
                  color="black"
                  x-small
                  style="background: #A0FFC1;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;width:100px;height:30px;color:black;text-transform: none !important;"
                  @click="doneList(index1)"
                >
                  Done All
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
        </draggable>
      </v-col>
    </v-row>
    <v-row v-if="todos.length === 0" style="position:fixed;bottom:20px;right:20px;" align="center">
      <v-col cols="12" align="end">
        <v-btn
          color="#FF8585"
          fab
          small
          style="border: 1px solid #000000;box-sizing: border-box;"
          @click="createTodo()"
        >
          <v-icon color="white">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else style="position:fixed;bottom:20px;" align="center">
      <v-col cols="8" align="start">
        <v-btn
          color="#A9F5FF"
          small
          style="border: 1px solid #000000;box-sizing: border-box;min-width:200px;;height:50px;border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 14px;"
          @click="checkAll()"
        >
          Finish All
        </v-btn>
      </v-col>
      <v-col cols="4" align="end">
        <v-btn
          color="#FF8585"
          fab
          small
          style="border: 1px solid #000000;box-sizing: border-box;"
          @click="createTodo()"
        >
          <v-icon color="white">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-show="dialogDetele" class="modal">
      <v-row align="center" class="modal-content">
        <v-col class="discard" style="margin-bottom:20px">
          Delete “{{ title_dialog }}” ?
        </v-col>
        <v-row row dense style="margin-bottom:30px;">
          <v-col cols="6">
            <v-btn
              style="background: #FF8585;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
              @click="deleted2(index_array)"
            >
              <v-icon
                left
                dark
              >
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              style="background: #EBEBEB;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
              @click="dialogDetele = false"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </div>
    <div v-show="dialogFinish" class="modal">
      <v-row align="center" class="modal-content">
        <v-col class="discard" style="margin-bottom:20px">
          Finish all to-do list?
        </v-col>
        <v-row row dense style="margin-bottom:30px;">
          <v-col cols="6">
            <v-btn
              style="background: #A9F5FF;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
              @click="checkAll2()"
            >
              Finish
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              style="background: #EBEBEB;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
              @click="dialogFinish = false"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      dialogDetele: false,
      dialogFinish: false,
      coba: true,
      todo_number: 1,
      data: {},
      jumlah: [],
      total: 0,
      total2: 0,
      title_dialog: '',
      tes: 0
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.state.list
      },
      set (value) {
        console.log('value', value)
        this.$store.commit('update', value)
      }
    },
    total3 () {
      return this.$store.state.total
    }
  },
  mounted () {
    this.data = this.$store.state.list
    this.total2 = this.todos.reduce((accum, item) => accum + item.data.active, 0)
  },
  methods: {
    finished(x) {
      this.$router.push({ name: 'finished' })
    },
    details(x, y) {
      this.$router.push({ name: 'details', params: { id: x, index: y} })
    },
    doneList (x) {
      this.$store.commit('checklist', x)
      this.total2 = this.todos.reduce((accum, item) => accum + item.data.active, 0)
    },
    deleted (x, y) {
      this.title_dialog = x
      this.index_array = y
      this.dialogDetele = true
    },
    deleted2 (x) {
      this.$store.commit('remove', x)
      this.dialogDetele = false
      this.total2 = this.todos.reduce((accum, item) => accum + item.data.active, 0)
    },
    checkAll () {
      this.dialogFinish = true
    },
    checkAll2 () {
      this.$store.commit('checkall', true)
      this.dialogFinish = false
      this.total2 = this.todos.reduce((accum, item) => accum + item.data.active, 0)
    },
    check (x, index1, index2) {
      this.$store.commit('edit', this.todos[index1].data.list[index2].name)
      if (x === true) {
        this.total = this.total + 1
      } else {
        this.total = this.total - 1
      }
      this.total2 = this.todos.reduce((accum, item) => accum + item.data.active, 0)
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    createTodo () {
      this.$router.push({ name: 'create' }) // -> /user/123
    }
  }
}
</script>

<style scoped>
  .welcome {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }
  .name {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #EC7C7C;
  }
  .active-todo {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }
  .list-todo {
    height:300px;
  }
  .card-todo {
    background: #F4FFB0;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    padding:20px;
    margin-bottom:20px;
    margin-top:10px;
  }
  .value-progress {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 11px;
  }

.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-transition: 0.5s;
  overflow: auto;
  transition: all 0.3s linear;
  /* filter: blur(20px); */
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  max-width: 300px;
  height: 150px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 14px;
}
.discard {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
.judul {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
.judul:hover {
  text-decoration: underline;
  cursor:pointer
}
</style>
