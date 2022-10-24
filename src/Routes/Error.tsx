import { useEffect } from 'react';
import { Order } from '../models/types';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { actions as tempOrderActions } from '../features/tempOrderReducer';
import { actions as cartActions } from '../features/cartReducer';

const Error = () => {

  const dispatch = useDispatch();

  const tempOrder: Order | undefined =  useSelector((state: RootState) => state.tempOrder)[0];
  useEffect(() => {
    if(tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart())
    }
  }, [])
  
  return (
    <div>Error</div>
  )
}

export default Error