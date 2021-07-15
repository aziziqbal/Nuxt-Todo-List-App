<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="auto" md="6" align="start">
        <v-btn
          class="back-btn"
          style="min-width: 34px;min-height: 34px;background-color:#FF8585;padding-left:0px;padding-right:0px;"
          @click="dialogBtn = true"
        >
          <v-icon color="white">
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" md="6" align="end" class="title-todo">
        Create New To-do List
      </v-col>
    </v-row>
    <!-- list todo -->
    <v-row class="list-todo" dense align="center" justify="center">
      <v-col cols="12">
        <v-text-field
          v-model="title"
          label="Title To Do"
          :rules="[rules.required, rules.email]"
          required
          style="font-weight:bold;font-size:24px;margin-top:10px;"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" class="card-todo">
        <v-row align="center">
          <v-col cols="7">
            <v-text-field
              v-model="task_list"
              dense
              hide-details
              placeholder="New Task.. "
              style="background-color:white;font-size:12px;"
              outlined
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              fab
              style="width: 22px;height: 22px;background-color:transparent;border: 1px solid #000000;"
              @click="add()"
            >
              <v-icon color="black" style="font-size:15px;">
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-for="(item, index) in data"
          :key="index"
          dense
          cols="12"
          align="center"
          style=";height:30px;margin-top:5px;"
        >
          <v-col cols="auto" align="center" style="padding-top:8px">
            -
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="item.name"
              :disabled="item.disable"
              style="font-weight:bold;font-size:14px;padding:0px;"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              v-if="item.edit"
              icon
              color="pink"
              x-small
              @click="editBtn(index)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-else
              icon
              color="pink"
              x-small
              @click="updateData(index)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon
              color="pink"
              x-small
              @click="deleted(index)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div class="date-todo">
          {{ date }}
        </div>
      </v-col>
      <v-btn :disabled="btndisabled" class="btn-card" style="background-color:#A9F5FF;" @click="simpan()">
        Create To-do List
      </v-btn>
    </v-row>
    <div v-show="dialogBtn" class="modal">
      <v-row align="center" class="modal-content">
        <v-col class="discard">
          Discard Changes?
        </v-col>
        <v-row row dense>
          <v-col cols="6">
            <v-btn
              style="background: #FF8585;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
@click="back()"
            >
              Discard
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              style="background: #A0FFC1;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;text-transform: none !important;"
@click="dialogBtn = false"
            >
              Keep Editing
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      dialogBtn: false,
      edit: true,
      disable: true,
      date: Date.now(),
      todos: [],
      data: [],
      title: '',
      task_list: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    btndisabled () {
      if (this.title === '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.date = this.$moment.utc(Date.now()).format('ddd, DD MMMM YYYY')
  },
  methods: {
    deleted (x) {
      this.data.splice(x, 1)
    },
    editBtn (x) {
      this.data[x].disable = false
      this.data[x].edit = false
    },
    updateData (x) {
      this.data[x].disable = true
      this.data[x].edit = true
    },
    back () {
      this.$router.go(-1)
    },
    addTodo (e) {
    },
    simpan () {
      this.todos = []
      this.todos.push({
        id: Date.now(),
        title: this.title,
        mode: true,
        list: this.data,
        active: 0,
        time: this.date
      })
      this.todos = this.todos[0]
      this.$store.commit('add', this.todos)
      this.$router.go(-1)
    },
    add () {
      this.data.push({
        name: this.task_list,
        disable: true,
        edit: true,
        status: false
      })
      this.task_list = ''
    }
  }
}
</script>

<style scoped lang="scss">
.back-btn {
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 2px;
}
.title-todo {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
}
.card-todo {
  position: relative;
  min-height:350px;
  width:100%;
  background-color: #F4FFB0;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 14px;
  margin-top:20px;
  padding:20px;
  .date-todo {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    position:absolute;
    bottom:0px;
    margin-bottom:20px;
    margin-top:20px;
  }
}
.btn-card {
  width:100%;
  height: 34px;
  background-color: #A9F5FF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 14px;
  margin-top:20px;
  font-size: 12px;
  text-transform: none !important;
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
  // filter: blur(20px);
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
</style>
