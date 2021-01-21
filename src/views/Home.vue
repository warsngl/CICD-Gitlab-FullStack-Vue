<template lang='pug'>
.table
  .nav
    .id №
    .status 
      select(v-model='status')
        option(value='0') Статус
        option Открыта
        option Закрыта
    .position 
      select(v-model='position')
        option(value='0') Должность
        option Junior
        option Middle
        option Senior 
        option Full 
    .city
      input(v-model='city' placeholder='Город')
    .name 
      input(v-model='name' placeholder='Наименование')
    .date Дата размещения
  .body
    .row(v-for='(r,idx) in frows' :key='idx')
      .id {{r.id}}
      .status {{r.status}}
      .position {{r.position}}
      .city {{r.city}}
      .name {{r.name}}
      .date {{r.date}}
  .statusBar
    .result Найдено
    .pagination 1 2 3
    button.reset
</template>

<script>

export default {
  data(){
    return{
      rows:[
        {'id':0,'status':'Открыта','position':'Junior','city':'syk','name':'andrey','date':'21.01.2021'},
        {'id':1,'status':'Открыта','position':'Middle','city':'msc','name':'tom','date':'21.01.2021'},
        {'id':2,'status':'Закрыта','position':'Senior','city':'spb','name':'john','date':'21.01.2021'},
        {'id':3,'status':'Открыта','position':'Full','city':'krd','name':'mike','date':'21.01.2021'}
      ],
      status:'0',
      position:'0',
      city:'',
      name:''
    }
  },
  computed:{
    frows(){
      return this.rows
        .filter(r=>{
          return this.status==0 || r.status==this.status
      }).filter(r=>{
          return this.position==0 || r.position==this.position
      }).filter(r=>{
          return this.city=='' || r.city.toLowerCase().includes(this.city) 
      }).filter(r=>{
          return this.name=='' || r.name.toLowerCase().includes(this.name) 
      })
    }
  },
  methods:{

  },

}
</script>

<style lang='stylus'>
body, html, #app, .table
  height 100%
  margin 0
  padding 0 10px
  background-color pink
.table
  display flex
  flex-direction column
.nav
  margin-top 10px
  display flex
  justify-content space-between
.row
  display flex
  justify-content space-between
.body
  flex 1 0 auto
.statusBar
  margin-bottom 25px
  display flex
  justify-content space-between
  flex-shrink 0
</style>
