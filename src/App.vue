<template>
<div>
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Orders</a>
    </div>
  </nav>
  <div class="container lighten">
    <div class="row">
      <input type="text" placeholder="Search..." v-model="searchTerm">
    </div>
    <div>
      <a class="col-sm-2 waves-effect waves-light btn search-button" v-on:click="searchByCompanyName">Search By Company Name</a>
      <a class="col-sm-2 waves-effect waves-light btn search-button" v-on:click="searchByAddress">Search By Customer Address</a>
      <a class="col-sm-2 waves-effect waves-light btn search-button" v-on:click="login">Test</a>
      <a class="col-sm-2 waves-effect waves-light btn search-button" v-on:click="createStudent">create</a>
    </div>
    <div v-if="orders.length > 0">
      <table class="stripped">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Company Name</th>
            <th>Customer Address</th>
            <th>Order Item</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <td>{{order.orderId}}</td>
            <td>{{order.companyName}}</td>
            <td>{{order.customerAddress}}</td>
            <td>{{order.orderItem}}</td>
            <td><a class="col-sm-2 waves-effect waves-light btn" v-on:click="deleteOrder(order.orderId)">delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="center-align valign-wrapper lighten">
      <h4 class="center-align no-orders">There are no orders to display</h4>
    </div>
    <div>
      <a class="col-sm-2 waves-effect waves-light btn search-button" v-on:click="searchOrderOccurrences">Refresh Occurences</a>
      <table class="stripped">
        <thead>
          <tr>
            <th>Order Item</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="occurrence in orderOccurrences">
            <td>{{occurrence.orderItem}}</td>
            <td>{{occurrence.count}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import ordersService from './OrdersService'
export default {
  name: 'app',
  data(){
    return {
      orders: [],
      searchTerm: '',
      orderOccurrences: [],
      order: {}
    }
  },
  beforeMount(){
    // this.searchOrderOccurrences();
  },
  mounted(){
   $('.modal').modal();
  },
  methods: {
    searchByCompanyName() {
      ordersService.getByCompanyName(this.searchTerm)
      .then(response => response.json())
      .then(parsedResponse => {
        this.orders = parsedResponse;
      })
    },
    searchByAddress() {
      ordersService.getByAddress(this.searchTerm)
      .then(response => response.json())
      .then(parsedResponse => {
        this.orders = parsedResponse;
      })
    },
    searchOrderOccurrences() {
      ordersService.getOccurrences()
      .then(response => response.json())
      .then(parsedResponse => {
        this.orderOccurrences = parsedResponse;
      })
    },
    deleteOrder(orderId) {
      ordersService.deleteById(orderId)
      .then(response => response.text())
      .then(parsedResponse => {
        this.orderOccurrences = parsedResponse;
        this.searchTerm = '';
        this.orders= [];
      })
    },
    register(){
      this.$http.post('https://bg-demo.herokuapp.com//v1/register', {username :'master', password: 'password', scope: ['admin']}).then(response => {console.log(response)})
    },
    login(){
      // ordersService.test()
      // .then(response => {console.log(response)})
      // this.$http.options.xhr = { withCredentials: true }
      // this.$http.headers.common['Access-Control-Allow-Origin'] = '*';
      this.$http.post('https://bg-demo.herokuapp.com//v1/login', {username :'master', password: 'password'}).then(response => {console.log(response)})
    },
    createStudent(){
      this.$http.post('https://bg-demo.herokuapp.com//v1/student', {name :'koyczan', account: '123123'}).then(response => {console.log(response)})
    }
  }
}
</script>
<style>
</style>