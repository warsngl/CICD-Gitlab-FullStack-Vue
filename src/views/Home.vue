<template lang='pug'>
table.table
  thead.nav
    th.id №
    span.arrow(@click="sort('id')") {{arrow}}
    th.status 
      select(v-model='status')
        option(value='0') Статус
        option Открыта
        option Закрыта
      span.arrow(@click="sort('status')") {{arrow}}
    th.position
      select(v-model='position')
        option(value='0') Должность
        option Junior
        option Middle
        option Senior 
        option Full 
      span.arrow(@click="sort('position')") {{arrow}}
    th.city
      input(v-model='city' placeholder='Город')
      span.arrow(@click="sort('city')") {{arrow}}
    th.name 
      input(v-model='name' placeholder='Наименование')
      span.arrow(@click="sort('name')") {{arrow}}
    th.date Дата
      v-date-picker.calendar(
        v-model='range'
        is-range
      )
  tbody
    tr(v-for='(r,idx) in sortedData' :key='idx')
      td.id {{r.id}}
      td.status {{r.status}}
      td.position {{r.position}}
      td.city {{r.city}}
      td.name {{r.name}}
      td.date {{r.date.toJSON() | date()}}
  .statusBar
    .result Найдено {{filteredData.length}}
    .pagination {{page+1}}
    button.prev(:disabled='page==0' @click='prevPage') Prev
    button.next(:disabled='page==pagecount-1' @click='nextPage') Next
    select(v-model='size')
      option(value=1) 1 на странице
      option(value=2) 2 на странице
      option(value=3) 3 на странице
    button.reset(@click='reset') Сбросить
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
      status:'0',
      position:'0',
      city:'',
      name:'',
      sortBy:'',
      reverse:false,
      page:0,
      size:2,
      range:{
        start: new Date(2021, 0, 1),
        end: new Date(2021,2,2)
      }
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
    },
    arrow(){
      return this.reverse ? '↑': '↓'
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
body, html, #app, table
  height 100%
  margin 0 
  padding 0
  display: flex;
  justify-content: center;
table
  background-color pink
  max-width 90%
  border-radius 10px
  border 1px solid gray
td,thead>*
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
  &>input
    width 100%
.name
  width 15%
  &>input
    width 100%
.date
  width 20%
table
  margin 0 10px
  display flex
  flex-direction column
thead
  margin-top 5px
  display flex
  justify-content space-between
tr
  display flex
  justify-content space-between
tbody
  flex 1 0 auto
.statusBar
  margin-bottom 5px
  padding 0 10px
  display flex
  justify-content space-between
  flex-shrink 0
.calendar
  position absolute
  display none
  z-index 2
.arrow
  cursor: pointer;
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
