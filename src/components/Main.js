import routes from '../routes';
import './Main.css'

const Main = () => {
    return (
        <main className='main'>
            <hr className='separator'/>
            { routes }
        </main>
    )
}

export default Main