import '../../styles/_orderConfirm.scss';
import Nav from '../../components/Nav';
import { Order } from '../../models/Interface';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

const OrderConfirm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const confirmedOrder: Order = useSelector((state: RootState) => state.orders);

  return (
    <section className="confirmed">
      <Nav />
        {loading ? 
            <div className='loading'></div>
            : ''
        }
        <div className='time-container'>
          <p>Kötid innan låst order : </p>
          <p>Maten klar att hämtas : </p>
        </div>

        <div className='headline'>
          <h1>Orderbekräftelse</h1>
        </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.132788853451!2d13.520668944233146!3d59.369957206767886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb19d87d4c3c7%3A0x300ad4aa5764fa28!2sLambergskajen%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1665738091678!5m2!1ssv!2sse" loading="lazy" ></iframe>
    </section>
  )
}

export default OrderConfirm