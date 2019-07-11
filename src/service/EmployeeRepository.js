import axios from 'axios'
const resource = "/employee";
axios.defaults.baseURL='http://localhost:3000'
export default{
    async get(){
        let data = await axios.get(`${resource}`);
        return data.data
    }, 
    async getUserById (id){
        let data = await axios.get(`${resource}/${id}`);
        return data.data
    },
    async post(obj){
        let data = await axios.post(`${resource}`,obj);
        return data.data
    },
    async remove(id){
        await axios.delete(`${resource}/${id}`);

    },
    async update(id,obj){
        let data = await axios.put(`${resource}/${id}`,obj);
        return data.data
    }
  
}