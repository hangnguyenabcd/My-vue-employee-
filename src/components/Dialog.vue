    <template>
    <div class="text-xs-center">
    <v-dialog
    persistent
    v-model="dialog"
    width="500"
    >
    <template v-slot:activator="{ on }">
    <v-btn
    @click="isEditData = false"
    color="primary"
    dark
    v-on="on"
    >
    Add new Employee
    </v-btn>
    </template>

    <v-card>
    <v-card-title>
    <span class="headline">Employee Infomations</span>
    </v-card-title>
    <v-card-text>
    <v-container grid-list-md>
    <v-layout wrap>
    <v-flex xs12 sm8>
    <v-text-field v-model="employee.name" label="Employee Name" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm4>
    <v-select
    v-model="employee.gender"
    :items="['Male', 'Female']"
    label="Gender"
    required
    ></v-select>
    </v-flex>
    <v-flex xs12 sm12>
    <span class="subheading">Date of birth:</span>
    </v-flex>
    <v-flex xs12 sm4>
    <v-text-field v-model="employee.year" label="Year" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm4>
    <v-select
    v-model="employee.month"
    :items="['January', 'February','March','April','May','June','July','August', 'September', 'October', 'November', 'December']"
    label="Month"
    required
    ></v-select>
    </v-flex>
    <v-flex xs12 sm4>
    <v-text-field v-model="employee.day" label="Day" required></v-text-field>
    </v-flex>
    </v-layout>
    </v-container>
    <!--<small>*indicates required field</small>-->
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click="closeClicked">Close</v-btn>
    <v-btn color="blue darken-1" flat @click="saveClicked">Save</v-btn>
    </v-card-actions>
    </v-card>
    </v-dialog>
    </div>
    </template>


    <script>

    import { EventBus } from '../event-bus.js'
    export default {
    data: () => ({
    isEditData: false,
    dialog: false,
    employee: {
    name: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    }

    }),
    created () {
    EventBus.$on('showDialogEdit', this.showDialog)
    EventBus.$on('EditType', this.changeType)
    },
    methods: {
    closeClicked: function(){
    this.dialog = false
    this.employee = {
    name: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    }
    },
    showDialog: function(e){
    this.dialog = true
    this.employee = e
    },
    changeType: function(){
    this.isEditData = true
    },
    saveClicked: function(){
    if(!this.isEditData)
    {
    this.dialog = false
    EventBus.$emit('send-data-employye', this.employee);
    this.employee = {
    name: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    }
    } else
    {
    this.dialog = false
    EventBus.$emit('send-data-employye-to-edit', this.employee);
    }
    }
    }
    }
    </script>