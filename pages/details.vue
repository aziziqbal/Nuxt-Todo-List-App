<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="auto" md="6" align="start">
        <v-btn
          class="back-btn"
          style="min-width: 34px;min-height: 34px;background-color:#FF8585;padding-left:0px;padding-right:0px;"
          @click="back()"
        >
          <v-icon color="white">
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" md="6" align="end" class="title-todo">
        To-do List Details
      </v-col>
    </v-row>
    <v-row v-if="loading" align="center" justify="start" style="margin-bottom:15px;">
      <v-col cols="12" class="judul">
        {{ data.data.title }}
      </v-col>
      <v-col cols="12" align="start" style="padding-bottom:0px;">
        <v-progress-linear
          color="deep-purple accent-4"
        />
      </v-col>
      <v-col class="value-progress" align="start" cols="12" style="padding-top:10px;">
        5/10 Task Completed
      </v-col>
    </v-row>
    <v-row v-for="(item, index1) in data" :key="index1" align="center" class="card-todo" style="">
      <v-col v-for="(item2, index) in item.list" :key="index" cols="12" style="padding-bottom:0px;padding-top:0px;">
        <v-row dense align="center" style="background-color:;padding:0px;margin:0px;">
          <v-col cols="auto" style="padding:0px;height:30px;padding-right:10px;">
            <v-checkbox :input-value="item2.status" style="padding:0px;height:20px;margin-top:0px;" @change="check($event, index1, index)" />
          </v-col>
          <v-col align="start" style="padding:0px;height:30px;">
            {{ item2.name }}
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon
              color="pink"
              x-small
              @click="deleted(index1, index)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="konten"
          dense
          hide-details
          placeholder="New Task.. "
          style="background-color:white;font-size:12px;"
          outlined
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          outlined
          x-small
          fab
          @click="addNew()"
          color="black"
          style="height:25px;width:25px;font-size:12px;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        align="start"
        style="padding-bottom:0px;font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 10px;
margin-top:20px;
padding-left:15px;
line-height: 12px;"
      >
        {{ item.time }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
        @click="checklistall()"
          block
          style="background: #A0FFC1;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 14px;border-radius: 14px;width:100px;height:30px;color:black;text-transform: none !important;
"
        >
          Done All
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      konten: '',
      loading: false,
      data: [],
      judul: '',
      data2: [],
      indextodos: 0
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.state.list
      }
    }
  },
  mounted () {
    this.loading = true
    this.data = this.todos.find(element => element.data.id === this.$route.params.id)
    console.log('asdas', this.data.data.title)
    if (this.data.length > 0) {
      this.title = this.data.data.title
      this.loading = false
    }
    console.log('index list', this.$route.params.index)
  },
  methods: {
    checklistall() {
      this.$store.commit('checklistall', this.$route.params.index)
    },
    addNew() {
      this.data2 = []
      this.data2.push({
        name: this.konten,
        disable: true,
        edit: true,
        status: false,
        indexlist: this.$route.params.index
        // id_todo: this.$route.params.id
      })
      this.data2 = this.data2[0]
      console.log(this.data2)
      this.$store.commit('add2', this.data2)

      this.konten = ''
    },
    back () {
      this.$router.go(-1)
    },
    check (x, index1, index2) {
      console.log(this.data[index1].list[index2].name)
      this.$store.commit('edit', this.data[index1].list[index2].name)
      // this.total2 = this.data.reduce((accum, item) => accum + item.data.active, 0)
    },
    deleted(index1, index) {
      // console.log(this.data[index1].list[index])
      this.$store.commit('remove1', this.data[index1].list[index])
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
.judul {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}

  .value-progress {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 11px;
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
</style>
