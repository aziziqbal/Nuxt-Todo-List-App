<template>
  <v-container>
    <v-row align="center" justify="start">
        <!-- {{ data.data.title }} -->
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
    <v-row v-for="(item, index1) in data" :key="index1" align="center" class="card-todo" style="">
      <v-col cols="12" class="judul">
        {{ item.data.title }}
      </v-col>
      <v-col v-for="(item2, index) in item.data.list" :key="index" cols="12" style="padding-bottom:0px;padding-top:0px;">
        <v-row dense align="center" style="background-color:;padding:0px;margin:0px;">
          <v-col cols="auto" style="padding:0px;height:30px;padding-right:10px;">
            <v-checkbox :input-value="item2.status" style="padding:0px;height:20px;margin-top:0px;" disabled />
          </v-col>
          <v-col align="start" style="padding:0px;height:30px;">
            {{ item2.name }}
          </v-col>
        </v-row>
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
        {{ item.data.time }}
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
      data: []
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
    for (let i = 0; i < this.todos.length; i++) {
        if(this.todos[i].data.active === this.todos[i].data.list.length){
            this.data.push(this.todos[i])
        }
    //   console.log(this.todos.find(element => element.data.active === element.data.list.length))
    }
    console.log(this.data)
    //   console.log(this.todos.find(element => element.data.active === element.data.list.length))
    //   this.data.push(this.todos.find(element => element.data.active === element.data.list.length))
    // console.log(this.data)
  },
  methods: {
    back () {
      this.$router.go(-1)
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
  margin-bottom:10px;
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
    padding:16px;
    margin-bottom:20px;
    margin-top:20px;
  }
</style>
