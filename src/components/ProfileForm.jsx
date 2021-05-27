// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from './Table';
import { useHistory } from "react-router-dom";

import { connect } from 'react-redux'
import ACTION from '../redux/action/action';


function ProfileForm({
    match, 
    getUserDetail, 
    user, 
    isError,
    postUserDetail,
    postEducation,
    postExperience
}) {
    const history = useHistory();
    const id = match.params.id
    
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [startDateEdu, setStartDateEdu] = useState('')
    const [endDateEdu, setEndDateEdu] = useState('')
    const [educations, setEducations] = useState([])

    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [startDateExp, setStartDateExp] = useState('')
    const [endDateExp, setEndDateExp] = useState('')
    const [experiences, setExperiences] = useState([])
    
    useEffect(()=>{
        if (id) {
            getUserDetail(id)
        }else{
            setFullname('')
            setPhone('')
            setEmail('')
        }
    }, [id])
    
    useEffect(()=>{
        const {fullname, phone, email} = user
        setFullname(fullname)
        setPhone(phone)
        setEmail(email)
        if (isError === true) {
            history.push('/')
        }
    }, [user,isError])


    
    const handleSubmit = (e)=>{
        const body={
            fullname,
            phone,
            email,
        }
        postUserDetail(body)
        console.log(body)
        e.preventDefault()
    }

    const handleSubmitEdu = (e)=>{
        const body={
            uuid : uuidv4(),
            school,
            major,
            start_date : startDateEdu,
            end_Date : endDateEdu
        }
        setEducations([...educations, body])
        setSchool('')
        setMajor('')
        setStartDateEdu('')
        setEndDateEdu('')
        e.preventDefault()
    }

    const removeEdu = (uuid) => setEducations(educations.filter(res => res.uuid !== uuid))
    const removeExp = (uuid) => setExperiences(experiences.filter(res => res.uuid !== uuid))

    const handleSubmitExp = (e)=>{
        const body={
            uuid : uuidv4(),
            company,
            title,
            start_date : startDateExp,
            end_Date : endDateExp
        }
        setExperiences([...experiences, body])
        setCompany('')
        setTitle('')
        setStartDateExp('')
        setEndDateExp('')
        e.preventDefault()
    }

    const basicForms = [
        {id : 'fullname', label:'Full Name', type: 'text', value: fullname, handleChange : setFullname},
        {id : 'phone', label:'Phone Number', type: 'tel', value: phone, handleChange : setPhone},
        {id : 'email', label:'Email', type: 'email', value: email, handleChange : setEmail},
    ]
    const educationForms = [
        {id : 'school', label:'School', type: 'text', value: school, handleChange : setSchool},
        {id : 'major', label:'Major', type: 'text', value: major, handleChange : setMajor},
        {id : 'startDateEdu', label:'Start Date', type: 'date', value: startDateEdu, handleChange : setStartDateEdu},
        {id : 'endDateEdu', label:'End Date', type: 'date', value: endDateEdu, handleChange : setEndDateEdu},
    ]
    const experienceForms = [
        {id : 'company', label:'Company', type: 'text', value: company, handleChange: setCompany},
        {id : 'title', label:'Title', type: 'text', value: title, handleChange: setTitle},
        {id : 'startDateExp', label:'Start Date', type: 'date', value: startDateExp, handleChange: setStartDateExp},
        {id : 'endDateExp', label:'End Date', type: 'date', value: endDateExp, handleChange: setEndDateExp},
    ]

    const submitAll = ()=>{
        let dataEdu = educations.map(res=>({...res, user_id : parseInt(id)}))
        let dataExp = experiences.map(res=>({...res, user_id : parseInt(id)}))
        Promise.all([
            postEducation(dataEdu),
            postExperience(dataExp),
        ]).then(res=>{
            history.push('/')
        })
    }

    const educationSection = ()=>{
        const header = educationForms.map( res=> res.label)
        return(
            <>
                <h3>EDUCATION</h3>
                {
                    educations.length !== 0?
                    <Table data={educations} header={['No',...header, 'Action']} remove={removeEdu}/>
                    :null
                }
                <form onSubmit={handleSubmitEdu} className='boxed' id='education'>
                    {
                        educationForms.map((res,i)=>(
                            <div className='wrap-inp' key={i}>
                            <label htmlFor={res.id}>{res.label}</label>
                            <input id={res.id} type={res.type} name={res.id} value={res.value} onChange={(e)=> res.handleChange(e.target.value)} required />
                            </div>
                        ))
                    }
                </form>
                <button type='submit' form='education'>Add New</button>
            </>
        )
    }

    const experinceSection = ()=>{
        const header = experienceForms.map( res=> res.label)
        return(
            <>
                <h3>EXPERIENCE</h3>
                {
                    experiences.length !== 0?
                    <Table data={experiences} header={['No',...header, 'Action']} remove={removeExp}/>
                    :null
                }
                <form onSubmit={handleSubmitExp} className='boxed' id='exp'>
                    {
                        experienceForms.map((res,i)=>(
                            <div className='wrap-inp' key={i}>
                            <label htmlFor={res.id}>{res.label}</label>
                            <input id={res.id} type={res.type} name={res.id} value={res.value} onChange={(e)=> res.handleChange(e.target.value)} required />
                            </div>
                        ))
                    }
                </form>
                <button type='submit' form='exp'>Add New</button>
            </>
        )
    }

    return (
        <div className='profile-form'>
            <h3>BASIC INFORMATION</h3>
            <form onSubmit={handleSubmit} className='unboxed'>
                {
                    basicForms.map((res,i)=>(
                        <div key={i}>
                        <label htmlFor={res.id}>{res.label}</label>
                        <input id={res.id} type={res.type} name={res.id} value={res.value} onChange={(e)=> res.handleChange(e.target.value)} disabled={id} required/>
                        </div>
                    ))
                }
                {
                id ? null : 
                <button type='submit'>Submit</button>
                }
            </form>

            {id?educationSection():null}
            {id?experinceSection():null}
            <br />

            {   
                id?
                <button onClick={submitAll} className='save' disabled={educations.length === 0 && experiences.length === 0}>SAVE</button>
                :null
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    user : state.basicInfoReducer.user,
    isError : state.basicInfoReducer.isError,
    isSuccessAdd : state.basicInfoReducer.isSuccessAdd,
  })
  
  const mapDispatchToProps = {
    getUserDetail : (id)=> ACTION.getUserDetail(id),
    postUserDetail : (body)=> ACTION.postUserDetail(body),
    postEducation : (body)=> ACTION.postEducation(body),
    postExperience : (body)=> ACTION.postExperience(body),
    
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)