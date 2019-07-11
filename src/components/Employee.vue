<template>
  <div class="Employee">
    <div class="wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-header clearfix">
              <h2 class="pull-left">Employees Details</h2>
              <a @click="addnew"><v-btn
                color="primary"
                class="pull-right"
              >Add New Employee</v-btn></a>
              <div class="pull-right">
                <Dialog />
              </div>
            </div>

            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Brithday</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(employee, index) in employees" :key="employee.id">
                  <td>{{index+1}}</td>
                  <td>{{employee.name}}</td>
                  <td>{{formatbirthday(employee.birthday)}}</td>
                  <td>{{employee.gender}}</td>
                  <td>
                     <v-btn flat icon @click="editEmployee1(employee)" ><v-icon>edit</v-icon></v-btn>
                    <v-btn flat icon>
                      <v-icon @click="deleteEmployee(employee)">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import EmployeeRepository from './../service/EmployeeRepository'
export default {
  components: {
    
  },
  data: () => ({
    
      editEmployee: {
      name: "",
      gender: "",
      year: "",
      month: "",
      day: ""
    },
    birthday: {year:"", month:"",day:""},
    employees:[],
  }),

  created(){
    this.getData();
  },
  methods: {
     getData(){
      EmployeeRepository.get().then(res=>{
        this.employees = res
      })
      .catch(e=>{
        console.log(e);
        
      })
    },
    addnew: function(){
      this.$router.push({name: 'AddNewEmployee', params: {isCreate: true}})
    },
    editEmployee1: function(obj){
      let id = obj.id
      this.$router.push({name: 'EditEmployee',params:{id, isCreate: false } })
     
  },
    deleteEmployee: function(employee) {
      confirm('Are you sure?') && EmployeeRepository.remove(employee.id).then(res => {
      console.log(res);
      this.getData()
                
      })
    },
    formatbirthday(birthdayNumber){
      var monthName = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var date = new Date(birthdayNumber)
      var day = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()
      return year + ' - ' + monthName[month] + ' - ' + day 
    }
  }
};
</script>

<style>
.icon-margin {
  margin: 3px;
}
</style>