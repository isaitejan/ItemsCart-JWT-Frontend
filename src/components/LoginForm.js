import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';

function LoginForm(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const {error, isLoading, login} = useLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await login(email, password)
    }

    return(
        <>
            <div className='mt-4'>
                <h2>Login to ItemsCart</h2>
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
      
                    <Button variant="primary" type="submit" disabled={isLoading} style={{width:'100%'}}> Login </Button>
                </Form>
                {error && <div className="text-danger">{error}</div>}
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginForm;

