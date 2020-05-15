import React from 'react'
import classes from './PageNotFound.module.css'

const bottomlog={
    position:'absolute',
    width:'100%',
    bottom:'0px',
    textAlign:'center',
    margin:'0px',
    color:'#ffffff'
}
const bottomlogspan={
    position:'relative',
}

function PageNotFound() {
    return (
        <div>
            <video className={classes.catvideo} autoPlay loop muted src="https://assets.mixkit.co/videos/preview/mixkit-a-white-cat-sits-in-front-of-a-white-wall-1535-large.mp4"/>
            <div id={classes.notfound}>
                <div className={classes.notfound}>
                    <div className={classes.notfound-404}>
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>
                    <a href="/">Go TO Homepage</a>
                </div>
            </div>
            <p  style={bottomlog}><span style={bottomlogspan}>&copy; 2020-Present Lalit, All rights reserved.</span></p>
        </div>
    )
}

export default PageNotFound
