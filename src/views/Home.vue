<template lang='pug'>
.table
  v-card.nav(flat tile)
    v-card.id(@click="sort('id')" flat tile) №
    v-card.status(flat tile)
      v-select(
        :items="statuses"
        label="Статус"
        dense
        v-model='status')
      v-btn(icon @click="sort('status')")
        v-icon mdi-ArrowUpDown
    v-card.position(flat tile)
      v-select(
        :items="positions"
        label="Должность"
        dense
        v-model='position')
      v-btn(icon @click="sort('position')")
        v-icon {{reverse?'mdi-chevron-up':'mdi-chevron-down'}}
    v-card.city(flat tile)
      v-text-field(v-model='city' label='Город')
      v-btn(icon @click="sort('city')")
        v-icon mdi-ArrowUpDown
    v-card.name(flat tile) 
      v-text-field(v-model='name' label='Наименование') 
      v-btn(icon @click="sort('name')")
        v-icon mdi-ArrowUpDown
    v-card.date(flat tile) Дата
      v-date-picker.calendar(
        v-model='range'
        is-range
      )
  v-card.body(flat tile)
    .row(v-for='(r,idx) in sortedData' :key='idx')
      .id {{r.id}}
      .status {{r.status}}
      .position {{r.position}}
      .city {{r.city}}
      .name {{r.name}}
      .date {{r.date.toJSON() | date()}}
  v-card.statusBar(flat tile)
    .result Найдено {{filteredData.length}}
    .pagination {{page+1}}
    button.prev(:disabled='page==0' @click='prevPage') Prev
    button.next(:disabled='page==-1' @click='nextPage') Next
    select(v-model='size')
      option(value=1) 1 на странице
      option(value=2) 2 на странице
      option(value=3) 3 на странице
    v-btn.reset(elevation="6" @click='reset') Сбросить
</template>

<script>
export default {
  data(){
    return{
      data:[
        {'id':0,'status':'Открыта','position':'Junior','city':'syk','name':'andrey','date':new Date(2021, 0, 20)},
        {'id':1,'status':'Открыта','position':'Middle','city':'msc','name':'tom','date':new Date(2021, 0, 22)},
        {'id':2,'status':'Закрыта','position':'Senior','city':'spb','name':'john','date':new Date(2021, 0, 23)},
        {'id':3,'status':'Открыта','position':'Full','city':'krd','name':'mike','date':new Date(2021, 0, 24)}
      ],
      status:'',
      position:'',
      city:'',
      name:'',
      sortBy:'',
      reverse:false,
      page:0,
      size:2,
      range:{
        start: new Date(2021, 0, 1),
        end: new Date(2021,2,2)
      },
      statuses:['Открыта','Закрыта'],
      positions:['Junior','Middle','Senior','Fullstack']
    }
  },
  computed:{
    filteredData(){
      return this.data
        .filter(r=>{
          return this.status==0 || r.status==this.status
      }).filter(r=>{
          return this.position==0 || r.position==this.position
      }).filter(r=>{
          return this.city=='' || r.city.toLowerCase().includes(this.city) 
      }).filter(r=>{
          return this.name=='' || r.name.toLowerCase().includes(this.name) 
      }).filter(r=>{
          return this.range==null || (r.date>this.range.start && r.date<this.range.end)
      })
    },
    sortedData(){
      return this.pagList.slice(0).sort((a,b)=> {
        let d=(this.reverse)?1:-1
        if(a[this.sortBy] < b[this.sortBy]) return -1*d
        if(a[this.sortBy] > b[this.sortBy]) return 1*d
        return 0
      })
    },
    pageCount(){
      let l=this.filteredData.length, s=this.size
      return Math.ceil(l/s)
    },
    pagList(){
      const start=this.page*this.size, end=start+this.size
      return this.filteredData.slice(start,end)
    }
  },
  methods:{
    sort(sortBy){
      this.reverse=(this.sortBy==sortBy)? ! this.reverse:false
      this.sortBy=sortBy
    },
    nextPage(){
      this.page++
    },
    prevPage(){
      this.page--
    },
    reset(){
      this.status='0',
      this.position='0',
      this.city='',
      this.name='',
      this.sortBy='',
      this.reverse=false,
      this.range={
        start: new Date(2021, 0, 1),
        end: new Date(2021,2,2)
      }
    }
  }
}
</script>

<style lang='stylus'>
body, html, #app, .table
  height 100%
  margin 0 
  padding 0
.id,.status,.position,.city,.name,.date
  display flex
  justify-content center
.id
  width 5%
.status
  width 15%
.position
  width 12%
.city
  width 11%
.name
  width 15%
.date
  width 20%
.table
  margin 0 10px
  display flex
  flex-direction column
.nav
  margin-top 15px
  display flex
  justify-content space-between
.row
  display flex
  justify-content space-between
.body
  flex 1 0 auto
.statusBar
  margin-bottom 5px
  display flex
  justify-content space-between
  flex-shrink 0
.calendar
  position absolute
  display none
  z-index 2
.date:hover .calendar
  display block
  transform translateX(-60px)
@media (max-width:610px)
  .table
    font-size 12px
  ::-webkit-input-placeholder
    font-size 8px
  select
    font-size 8px
</style>
