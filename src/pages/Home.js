import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <h2 className='welcome'>Welcome</h2>
            <p className='welcome-text'>This here is my little website. There are a lot like it, but this one is mine. If you've found this website, welcome! Here you can find many things about me, and many things I've made! Make yourself at home.</p>
            <div className="why-you-here">
                <p className="website-desc">There are a number of things about me and my life on this website. A few of them include:</p>
                <ol className="website-list">
                    <li className="website-list-item">An about me section!</li>
                    <li className="website-list-item">A snippet about my skills!</li>
                    <li className="website-list-item">A page linking to my previous projects!</li>
                    <li className="website-list-item">A section for my contact information!</li>
                </ol>
            </div>
        </div>
    )
}
 
export default Home