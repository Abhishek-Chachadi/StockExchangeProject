
import axios from 'axios';
import http from "./http-common";
const getIpoDetails = "https://phase3stockexchange.herokuapp.com/getipodetailsAll";
const getStockExchange = "https://phase3stockexchange.herokuapp.com/getstockexchange";
const getCompanies = "https://phase3stockexchange.herokuapp.com/getcompanydetailsAll";
const getExchangeMap = "https://phase3stockexchange.herokuapp.com/getExchangeMapAll";
const getSectorList2 = "https://phase3stockexchange.herokuapp.com/getcompanysectors";


// const getIpoDetails = "http://localhost:8080/getipodetailsAll";
// const getStockExchange = "http://localhost:8080/getstockexchange";
// const getCompanies = "http://localhost:8080/getcompanydetailsAll";
// const getExchangeMap = "http://localhost:8080/getExchangeMapAll";
// const getSectorList2 = "http://localhost:8080/getcompanysectors";

class Service{
    getIpoDetailFromCompany()
    {
        return axios.get(getIpoDetails);
    }

    getStockExchanges()
    {
        return axios.get(getStockExchange);
    }

    getCompany()
    {
        return axios.get(getCompanies);
    }
    getExchangeMap()
    {
        return axios.get(getExchangeMap);
    }
    getSectorList()
    {
        return axios.get(getSectorList2);
    }
    getCompany1(id){
        return http.get(`/company/${id}`)
    }
    updateCompany(id,data){
        return http.put(`/company/${id}`, data)
    }
    deleteCompany(id) {
        return http.delete(`/company/${id}`);
    }
}

export default new Service();