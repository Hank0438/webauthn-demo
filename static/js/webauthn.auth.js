let getMakeCredentialsChallenge = (formBody) => {
    return fetch('/webauthn/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status !== 'ok')
            throw new Error(`Server responed with error. The message is: ${response.message}`);

        return response
    })
}


let sendWebAuthnResponse = (body) => {
    return fetch('/webauthn/response', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status !== 'ok')
            throw new Error(`Server responed with error. The message is: ${response.message}`);

        return response
    })
}

let getGetAssertionChallenge = (formBody) => {
    return fetch('/webauthn/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status !== 'ok')
            throw new Error(`Server responed with error. The message is: ${response.message}`);

        return response
    })
}

/* Handle for register form submission */

$('#AdminRegister').submit(function(event) {
    event.preventDefault();

    let username = this.username.value;
    let name     = this.name.value;

    if(!username || !name) {
        alert('Name or username is missing!')
        return
    }
    getMakeCredentialsChallenge({username, name})
        .then((response) => {
            console.log('newCredentialInfo: ', response)
            let publicKey = preformatMakeCredReq(response);
            return navigator.credentials.create({ publicKey })
        })
        .then((response) => {
            let makeCredResponse = publicKeyCredentialToJSON(response);
            return sendWebAuthnResponse(makeCredResponse)
        })
        .then((response) => {
            if(response.status === 'ok') {
                alert(`Webauthn Register Success!`);
                loadMainContainer() 
            }else{
                alert(`Server responed with error. The message is: ${response.message}`);
            }
        })
        .catch((error) => alert(error))
})

/* Handle for login form submission */
$('#AdminLogin').submit(function(event) {
    event.preventDefault();
    
    let username = this.username.value;
    if(!username) {
        alert('Username is missing!')
        return
    }
    
    
    //let username = "admin";
    //let name     = "Hank";

    getGetAssertionChallenge({username})
        .then((response) => {
            let publicKey = preformatGetAssertReq(response);
            console.log('publicKey:', publicKey)
            return navigator.credentials.get({ publicKey })
        })
        .then((response) => {
            let getAssertionResponse = publicKeyCredentialToJSON(response);
            return sendWebAuthnResponse(getAssertionResponse)
        })
        .then((response) => {
            if(response.status === 'ok') {
                alert(`Webauthn Login Success!`);
                loadMainContainer()   
            } else {
                alert(`Server responed with error. The message is: ${response.message}`);
            }
        })
        .catch((error) => alert(error))

})