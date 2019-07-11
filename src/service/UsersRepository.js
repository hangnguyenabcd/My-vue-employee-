import axios from 'axios'
const resource = "/users";
axios.defaults.baseURL='http://localhost:3000'
export default {
    async Login(user) {
        let data = await axios.get(`${resource}`);
        for(var i = 0 ; i < data.data.length ; i ++)
        {
            if(user.username == data.data[i].username && user.password == data.data[i].password )
            {
                return true
            }
            else
            {
                return false
            }
        }
}
}