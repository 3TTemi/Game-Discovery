import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'fb0bf642bbd04f3791d4e4e4440b1832'
    }
})