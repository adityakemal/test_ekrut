import axios from "axios"


const PROFILE_ACTIONS = {
    getUserDetail : (id)=>{
        return (dispatch)=>{
            axios.get(`/users/${id}`).then(res=>{
                console.log(res.data)
                dispatch({
                    type : 'GET_USER',
                    payload : res.data.data,
                    isError : false
                })
            }).catch(err=>{
                // window.location.href = (`/`)
                dispatch({
                    type : 'GET_USER',
                    payload : {},
                    isError : true
                })
            })
        }
    },
    postUserDetail : (body)=>{
        return (dispatch)=>{
            axios.post(`/users/`, body).then(res=>{
                console.log(res.data, 'post')
                dispatch({
                    type : 'ADD_USER',
                    // payload : res.data.data,
                    isSuccessAdd : true
                })
                window.location.href = (`/${res.data.data.id}`)
            }).catch(err=>{
                dispatch({
                    type : 'ADD_USER',
                    // payload : {},
                    isSuccessAdd : false
                })
                alert(err.response.data.errors.map(res=> res.message))
                console.log(err.response)
            })
        }
    },

    postEducation : (body)=>{
        return (dispatch)=>{
            axios.post(`/education/`, body).then(res=>{
                console.log(res.data, 'post')
                alert('success update education')
            }).catch(err=>{
                alert(err.response.data.errors.map(res=> res.message))
                console.log(err.response)
            })
        }
    },

    postExperience : (body)=>{
        return (dispatch)=>{
            axios.post(`/experience/`, body).then(res=>{
                console.log(res.data, 'post')
                alert('success update experience')
            }).catch(err=>{
                alert(err.response.data.errors.map(res=> res.message))
                console.log(err.response)
            })
        }
    },
}

export default PROFILE_ACTIONS