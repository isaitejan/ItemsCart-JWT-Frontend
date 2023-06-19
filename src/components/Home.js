import AddItemForm from './AddItemForm';
import CardComp from './CardComp';
import { useEffect } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useUserContext } from '../hooks/useUserContext';

function Home(){

    // const [items, setItems] = useState(null);
    const {items, dispatch} = useItemsContext();
    const { user } = useUserContext();

    useEffect(()=>{
        const fetchItems = async ()=>{
            const response = await fetch("http://localhost:4000/api/items/getAll",{
              headers:{
                'Authorization': `Bearer ${user.token}`
              }
            });

            const json = await response.json();
            if(response.ok){
                await dispatch({type:'SET_ITEMS', payload: json.message})
            }
        }
        if(user){
          fetchItems();
        }
    },[dispatch, user])

    return(
        <div className='container mt-4'>
          <div className='row'>
            <div className='col-lg-4'>
              <AddItemForm />
            </div>
            <div className='col-lg-6 offset-lg-2'>
              <h4>Items in the Cart</h4>
              {items && items.map((item)=>{
                return <CardComp key={item._id} item={item} />
              })}
            </div>
          </div>
        </div>
    );
}

export default Home;