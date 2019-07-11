<template>
  <div>
    <v-card class="wrapper">
      <v-container grid-list-md class="margintop">
        <v-form>
          <v-layout wrap>
            <v-flex xs12 sm8>
              <v-text-field
                counter
                maxlength="30"
                :error="nameErr.isNameErr"
                @input="textNameChange"
                :error-messages="nameErr.nameErrMsg"
                v-model="employee.name"
                label="Employee Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
                v-model="employee.gender"
                :error-messages="genderErr"
                @change="genderErr=''"
                :items="['Male', 'Female']"
                label="Gender"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12>
              <span class="subheading">Date of birth:</span>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
                @change="birthdayErr.yearErrMsg=''"
                :error-messages="birthdayErr.yearErrMsg"
                v-model="birthday.year"
                :items="['2003','2002','2001','2000','1999', '1998', '1997', '1996', '1995','1994','1993','1992','1991','1990','1989', '1988', '1987', '1986', '1985','1984','1983','1982','1981','1980','1979', '1978', '1977', '1976', '1975','1974','1973','1972','1971','1970','1969','1968','1967','1966','1965','1964','1963','1962','1961','1960','1959','1958','1957','1956','1955','1954','1953','1952','1951','1950','1949','1948','1947','1946','1945','1944','1943','1942','1941']"
                label="Year"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
              @change="birthdayErr.monthErrMsg=''"
                :error-messages="birthdayErr.monthErrMsg"
                v-model="birthday.month"
                :items="['January', 'February','March','April','May','June','July','August', 'September', 'October', 'November', 'December']"
                label="Month"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
              @change="birthdayErr.dayErrMsg=''"
                :error-messages="birthdayErr.dayErrMsg"
                v-model="birthday.day"
                :items="['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']"
                label="Day"
                required
              ></v-select>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <a href="/emp">
              <v-btn color="blue darken-1" flat>Cancel</v-btn>
            </a>
            <v-btn color="blue darken-1" flat @click="clearClicked">Clear</v-btn>
            <v-btn color="blue darken-1" flat @click="saveClicked">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import EmployeeRepository from '../service/EmployeeRepository';
export default {
  data: () => ({
    nameErr: {
      isNameErr: false,
      nameErrMsg: ""
    },
    birthdayErr: {
      yearErrMsg: "",
      monthErrMsg: "",
      dayErrMsg: ""
    },
    genderErr:"",
    birthday: {year:"", month:"",day:""},
    employee: { name: "", gender: "", birthday: "" }
  }),
  methods: {
    clearClicked: function() {
        this.nameErr.isNameErr = false,
        this.nameErr.nameErrMsg = '',
        this.genderErr='',
        this.birthdayErr.yearErrMsg = '',
        this.birthdayErr.monthErrMsg = '',
        this.birthdayErr.dayErrMsg = '',
        this.employee = {
          name: "",
          gender: "",
          year: "",
          month: "",
          day: ""
        };
    },
    saveClicked: function() {
      this.checkNameValidation();
      this.checkBirthdayValidation();
      this.checkGenderValidation();
      
      if(this.nameErr.nameErrMsg == '' &&
        this.genderErr == '' &&
        this.birthdayErr.yearErrMsg == ''&&
        this.birthdayErr.monthErrMsg == ''&&
        this.birthdayErr.dayErrMsg == '')
      { 
      this.employee.birthday= new Date(this.birthday.month + " " + this.birthday.day +" "+this.birthday.year).getTime()
      EmployeeRepository.post(this.employee).then(res =>{
        console.log(res);
        this.$router.push({name: 'Employee'})
      })
    }
    },
    checkNameValidation: function() {
      if (this.employee.name == "" || this.employee.name.trim() === "") {
        (this.nameErr.isNameErr = true), (this.nameErr.nameErrMsg = "Required");
      } else {
        (this.nameErr.isNameErr = false), (this.nameErr.nameErrMsg = "");
      }
    },
    checkBirthdayValidation: function() {
      if (this.birthday.year == "") {
        this.birthdayErr.yearErrMsg = "Required";
      } else {
        this.birthdayErr.yearErrMsg = "";
      }
      if (this.birthday.month == "") {
        this.birthdayErr.monthErrMsg = "Required";
      } else {
        this.birthdayErr.monthErrMsg = "";
      }
      if (this.birthday.day == "") {
        this.birthdayErr.dayErrMsg = "Required";
      } else if (
        this.birthday.day == "31" &&
        (this.birthday.month == "April" ||
          this.birthday.month == "June" ||
          this.birthday.month == "August" ||
          this.birthday.month == "October" ||
          this.birthday.month == "December")
      ) {
        this.birthdayErr.dayErrMsg = "This month not have 31th day";
      } else {
        this.birthdayErr.dayErrMsg = "";

        if (this.isLeapYear(this.birthday.year)) {
          if (
            (this.birthday.day == "30" || this.birthday.day == "31") &&
            this.birthday.month == "February"
          ) {
            this.birthdayErr.dayErrMsg =
              "Leap year is only 29 days in February";
          } else {
            this.birthdayErr.dayErrMsg = "";
          }
        } else {
          if (
            (this.birthday.day == "29" ||
              this.birthday.day == "30" ||
              this.birthday.day == "31") &&
              this.birthday.month == "February"
          ) {
            this.birthdayErr.dayErrMsg =
              "Non leap year only 28 days in February";
          } else {
            this.birthdayErr.dayErrMsg = "";
          }
        }
      }
    },
    checkGenderValidation(){
      if(this.employee.gender==""){
        this.genderErr="required"

      }else{
        this.genderErr=''
      }
    },
    textNameChange: function() {
      (this.nameErr.isNameErr = false), (this.nameErr.nameErrMsg = "");
    },
    isLeapYear: function(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }
  }
};
</script>
<style>
.wrapper {
  width: 500px;
  margin: 0 auto;
}
.margintop {
  margin-top: 20px;
}
</style>


