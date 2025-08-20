
import LottiePi from './LottiePi'
import MessageForm from '../(home)/utils/messageForm'

const Contact = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <div className='sm:block hidden'>
                <LottiePi />
            </div>
            <MessageForm />
        </div>
    </div>
  )
}

export default Contact