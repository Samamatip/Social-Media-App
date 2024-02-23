import {useState, useEffect} from "react";
import './App.css';


function App(){
const [celebrity, setCelebrity] = useState([]);
const [loading, setLoading] = useState(true);
const [celebposts, setCelebposts] = useState([]);
const [likecounter, setLikecounter] = useState(0);
const [comments, setComments] = useState(' ');
const [allcomments, setAllcomments] = useState([]);



        useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(data => {
                setCelebrity(data);
                setLoading(false);
                            })
            .catch(error => {
                console.error('there is an error in fetching the data', error)
            })
        }, []);

        useEffect(()=>{

            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(Response => Response.json())
            .then(info => {
                setCelebposts(info);
                setLoading(false);
            })
            .catch(error=>{
                console.error('Error in fetching photo data', error)
            })
        }, []);

        
        const handleLikeCounter = ()=> {
            setLikecounter(likecounter+1);
        }

        const handlecomments = ()=> {
            if(comments){
               
                setAllcomments([...allcomments, comments]);
                setComments('');
            }
            else{
                setAllcomments('No comments')
            }

        }

//line 28 Loading? ():() simply means if loading () else ()
return(
    <div>
        {loading? (<p>Loading...</p>
        ) : (


            <ul>
                <ul>
                    <h1> Tutors of the year profiles</h1>
                    {celebrity.map(profile =>(
                        <li className="lecturerNames">
                            <h3>{profile.name}</h3>
                            <p>{profile.email}</p>
                            <p>
                                    {profile.address.street} -
                                    {profile.address.suite} -
                                    {profile.address.city} -
                                    {profile.address.zipcode} 
                                    {profile.address.geo.lat}
                                    {profile.address.geo.lng}
                            </p>
                        </li>
                    ))}
                </ul>

                <h2>You can also have a look at the interesting posts by our graduating students taught by this tutors.</h2>

                <h3><em>
                    Don't forget to leave a comment on your favourite post.</em>
                </h3>

                <ul className="posts">
                {celebposts.map(post => (
                    <li>
                        {post.body}
                        <p>
                            <input type="text" value={comments} placeholder="Type you comments here" onChange={(e)=>setComments(e.target.value)}/>
                            <button onClick={handlecomments}>Comment</button>
                        </p>
                            <button onClick={handleLikeCounter}>Like</button> <em>{likecounter}Likes</em>
                            <dl>
                                <dt>
                                </dt>
                                <dd>
                                    {allcomments}<hr></hr>
                                </dd>
                            </dl>
                            
                    </li>
                    ))}
                </ul>

            </ul>


        )}

    </div>
);

}


export default App;