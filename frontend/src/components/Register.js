
import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'




export const Register = () => {
    const [studentName, setStudentName] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [studentPhone, setPhoneNumber] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    const [registerAdmin, setRegisterAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
    const history = useHistory();


    const addStudent = async (e) => {
        e.preventDefault();

        if (confirmPassword !== studentPassword) {
            setWrongPassword(true);
            setStudentPassword("");
            setConfirmPassword("");
            return;
        }

        const config = {
            headers: {
                'Content-Type': "application/json",
            }
        }

        const newStudent = {
            name: studentName,
            password: studentPassword,
            phoneNumber : studentPhone,
            email : studentEmail
        }

        try {
            const res = await axios.post('/api/student/add', newStudent, config);
            sessionStorage.setItem("id", res.data.id)
            history.push('/register/success')


        } catch (error) {
            console.log("Unable to add a new student")
        }
    }


    const addAdmin = async (e) => {
            e.preventDefault();

            if (adminConfirmPassword !== adminPassword) {
                setWrongPassword(true);
                setAdminConfirmPassword("");
                setAdminPassword("")
                return;
            }

            const config = {
                headers: {
                    'Content-Type': "application/json",
                }
            }

            const newAdmin = {
                name: "admin",
                password: adminPassword
            }

            try {
                const res = await axios.post('/api/admin/add', newAdmin, config);
                sessionStorage.setItem("id", res.data.name + res.data.id)
                history.push('/register/success')


            } catch (error) {
                console.log("Unable to add an admin user")
            }
        }

    return (
        <div className="registerStudent">
            <h2>Register Your Account</h2>

            {wrongPassword ?<React.Fragment> <div style={{textAlign: "center"}} className="warning">Password does not match, please try again</div> <span>{studentPassword}</span></React.Fragment>: ""}

            <div className="registerAdmin">
                <div className="adminCheckBox">
                    <input type="checkbox" onChange={() => setRegisterAdmin(!registerAdmin)}/>
                    <span>Register Admin User</span>
                </div>

                {registerAdmin ?
                <form onSubmit={addAdmin}>
                 <div>
                     <label>Password:</label>
                     <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required/>
                </div>
                 <div>
                     <label>Confirm Password:</label>
                     <input type="password" value={adminConfirmPassword} onChange={e => setAdminConfirmPassword(e.target.value)} required/>
                 </div>
                 <button>Register Account</button>
                 </form> :""
                }
            </div>


            {!registerAdmin ?  <form onSubmit={addStudent}>

                <div>
                    <label>Name:</label>
                    <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={studentPassword} onChange={e => setStudentPassword(e.target.value)} required/>
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" value={studentPhone} onChange={e => setPhoneNumber(e.target.value)} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={studentEmail} onChange={e => setStudentEmail(e.target.value)} required/>
                </div>
                <button>Register Account</button>
            </form> : ""}
        </div>
    )
}
