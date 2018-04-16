import React from 'react';

class GoogleLogin1 extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        (function () {
            let e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            let t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();
    }

    //Triggering login for google
    googleLogin = () => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function (authResponse) {
                this.googleSignInCallback(authResponse)
            }.bind(this),
            client_id: "31237231524-4vibq7hrr7g6dsp1h9oh5h9k9mmndhhq.apps.googleusercontent.com", //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    };

    googleSignInCallback = (e) => {
        console.log(e);
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function () {
                if (e["access_token"]) {
                    this.getUserGoogleProfile(e["access_token"])
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    };

    getUserGoogleProfile = accesstoken => {
        let e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function (e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data');
                return;

            } else if (e.id) {
                //Profile data
                alert("Successfull login from google : " + e.displayName);
                console.log(e);
                return;
            }
        }.bind(this));
    };

    render() {
        return (
            <div className="g-signin2" title="google login" onClick={() => this.googleLogin()}/>
        )
    }
}

export default GoogleLogin1
