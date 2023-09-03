import React from 'react';
import {useAuth} from '../context/AuthContext';
function ProfileInvitaciones(props) {
    const {user}= useAuth()
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    );
}

export default ProfileInvitaciones;