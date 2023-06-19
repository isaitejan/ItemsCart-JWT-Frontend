import { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import { useSignup } from '../hooks/useSignup';

function SignupForm(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        await signup(email, password)
    }

    return(
        <>
            <div className='mt-4'>
                <h2>Signup For New Users</h2>
            </div>
            <div className='container mt-4'>
            <div className='row'>
                <div className='col-lg-4 offset-4'>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading} style={{width:'100%'}}> Submit </Button>
                </Form>
                {error && <div className="text-danger">{error}</div>}
                </div>
            </div>
        </div>
        </>
    );
}

export default SignupForm;