import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';

export default function UserProfile() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub'>
                <div className='ctr-sub-left'>
                    <img src='images/logo-cut.png' alt='Logo'/>
                    <h1 className='ctr-sub-left-font'>CarCheckMate</h1>
                    <br />
                    <br />
                    <hr />
                    <h6 className='placeAtBottom-right'><a href='mailto:carcheckmate@mail.com'>carcheckmate@mail.com</a></h6>
                </div>
                <div className='ctr-sub-right'>
                    <h1 className='ctr-sub-right-font'>Enter A New Password</h1>
                    <form>
                        <input type="password" name="newPassword" placeholder="New Password" />
                        <input type="password" name="confirmNewPassword" placeholder="Confirm New Password" />
                        <button className='btn-forget-password' type="button">Save</button>
                    </form>
                    <h6 className='placeAtBottom-left'>
                        {/*<span>Forgot your login?</span>&nbsp;-&nbsp;*/}
                        <span>Privacy Policy</span>
                    </h6>
                </div>
            </div>
        </div>
    );
}