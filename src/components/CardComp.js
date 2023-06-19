import {Card} from 'react-bootstrap';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Link} from 'react-router-dom';
import { useItemsContext } from '../hooks/useItemsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useUserContext } from '../hooks/useUserContext';

function CardComp(props){

    const { dispatch } = useItemsContext();
    const { user } = useUserContext();

    const handleDelete = async ()=>{
        // console.log("deleting "+props.item._id);
        if(!user){
            return
        }

        const deleteResponse = await fetch("http://localhost:4000/api/items/"+props.item._id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await deleteResponse.json();

        if(deleteResponse.ok){
            console.log("Item deleted Successfully!");
            dispatch({type: 'DELETE_ITEM', payload: json.message})
        }
        if(!deleteResponse.ok){
            console.log("Item not found to deleted!");
        }
    }

    return(
        <div style={{padding:'2px'}}>
            <Card>
                <Card.Body>
                    <Card.Title>{props.item.itemName} <Link onClick={handleDelete}><DeleteOutlinedIcon style={{position:'relative',float:'right'}}/></Link></Card.Title>
                    <Card.Text>Quantity:{props.item.quantity}</Card.Text>
                    <Card.Text style={{position:'relative',float:'left'}}>
                        Added : {formatDistanceToNow(new Date(props.item.createdAt), { addSuffix: true})}
                    </Card.Text>
                </Card.Body>
                
            </Card>
        </div>
    );
}

export default CardComp;