import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '1079304108039-utkh4notc6upa9pdfi8u467tb9jr85d8.apps.googleusercontent.com'; 

function GoogleLoginComponent() {
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
          
    };

    const handleLoginFailure = (error) => {
        console.log('Login Failed:', error);
        
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App">
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </div>
            
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginComponent;
