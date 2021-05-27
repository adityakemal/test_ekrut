import * as axios from 'axios'
import PROFILE_ACTIONS from './profileAction';

axios.defaults.baseURL = `http://hr.ekrut.co/items`;


const ACTION = {
    ...PROFILE_ACTIONS,
}

export default ACTION