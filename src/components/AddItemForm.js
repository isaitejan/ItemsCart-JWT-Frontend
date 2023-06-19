import {Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useUserContext } from '../hooks/useUserContext';

function AddItemForm(){

    const {dispatch} = useItemsContext();
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {user} = useUserContext();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const itemPayLoad = {itemName, quantity};

        if(!user){
            setError('You must be logged in');
            return
        }

        const response = await fetch('http://localhost:4000/api/items/insertItem',{
            method: 'POST',
            body: JSON.stringify(itemPayLoad),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setSuccess('');
        }
        if(response.ok){
            setItemName('');
            setQuantity('');
            setError(null);
            setSuccess(json.message);
            dispatch({ type:'CREATE_ITEM', payload: json.message});
        }
    }

    return(
        <div >
            <Form onSubmit={handleSubmit}>
                <Form.Text>Add a New Item</Form.Text>
                <Form.Group>
                    <Form.Label>Enter Item Name:</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Item Name'
                        onChange={(e)=> setItemName(e.target.value)}
                        value={itemName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Quantity:</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Quantity'
                        onChange={(e)=> setQuantity(e.target.value)}
                        value={quantity}    
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' style={{width:'100%'}}>Submit</Button>
                {error && <div className='text-danger'>{error}</div>}
                {success && <div className='text-success'>{success.itemName} Inserted Successfully!</div>}
            </Form>
        </div>
    );  
}

export default AddItemForm;