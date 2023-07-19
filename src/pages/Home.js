import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState(''); //roomid state(box syd) me store krva rehe hai
    const [username, setUsername] = useState(''); //username state me store krva rehe hai
    const createNewRoom = (e) => {
        e.preventDefault(); /*it will stop the 'new room' link from refreshing the page */
        const id = uuidv4(); /* to generate new id*/
        setRoomId(id); //setting new id generated in the box
        //console.log(id);  //printing new generated id on consol
        toast.success('Created a new room'); //iska container bana jayuri hai
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        } //kisi ne room id ya username nhi diya toh error show kre

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username, //yha jb 2nd page pr navigate ho ajyege toh yeh username jo 1st page pr likha tha use use kr payege
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') /* ager key enter press hui toh hi joinroom krna hai*/ {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper" >
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID" 
                        onChange={(e) => setRoomId(e.target.value)}  //dynamic id enter kre user toh voh bhi ho jaye enter
                        value = {roomId}     //new room id generated box me show ho toh link kiya hai   
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"  
                        onChange={(e) => setUsername(e.target.value)}  //dynamic id enter kre user toh voh bhi ho jaye enter
                        value = {username}
                        onKeyUp={handleInputEnter} //enter krne pr aaage chla jaye                      
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a   
                            onClick={createNewRoom}             
                            href=""
                            className="createNewBtn"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                Built with 💛
                </h4>
            </footer>                
        </div>
    )
}

export default Home;