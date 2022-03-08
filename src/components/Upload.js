import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Upload() {
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

    // when the submit button is clicked, get a signed put request from the server
    const getSignedRequest = async () => {
        // verify the file is an image before sending
        if (!verifyImage()) {
            alert('File is not an image');
            return;
        }

        // also check there is a user logged in
        let login = loggedIn();
        if (!login) {
            alert('Not logged in, cannot upload');
            return;
        }

        // GET the signed request from the server
        await Axios({
            method: 'GET',
            params: {
                fileName: image.name,
                fileType: image.type,
            },
            withCredentials: true,
            url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/sign-s3',
        }).then(res => uploadImage(res))
        .catch(err => {
            console.log('Error thrown on GET /api/auth/sign-s3');
            throw err;
        });
    }

    // upload the image to S3 and get a url for it
    const uploadImage = async (res) => {
        const imageUrl = res.data.url;

        const options = {
            headers: {
                'Content-Type': image.type,
                //'x-amz-acl': 'public-read', // ACL is not used on the current bucket, this would be needed otherwise
            }
        }

        await Axios.put(res.data.signedRequest, image, options)
        .then(postToDatabase(imageUrl))
        .catch(err => {
            console.log('Error thrown on PUT for S3 Bucket');
            throw err;
        });
    }

    // POST to the database and create a new post
    const postToDatabase = async (url) => {
        if (!content) {
            setContent('Null');
        }

        await Axios({
            method: 'POST',
            data: {
                imageUrl: url,
                content: content,
            },
            withCredentials: true,
            url: process.env.REACT_APP_LOCAL_SERVER + '/api/post',
        })
        .catch(err => {
            console.log('Error thrown on POST /api/post');
        });
    }

    const verifyImage = () => {
        if (!image.name.match(/.(jpg|jpeg|png|gif)$/i))
            return false;
        else
            return true;
    }

    const loggedIn = async () => {
        // use Axios to get the login status from the server
        await Axios({
            method: 'GET',
            withCredentials: true,
            url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/check-logged-in',
        }).then(res => {
            if (res.data) {
                return true;
            } else {
                return false;
            }
        });
    }

    return (
        <div className='Upload'>
            <input type='file' onChange={e => setImage(e.target.files[0])} />
            <input placeholder='Write a description...' onChange={e => setContent(e.target.value)} />
            <button onClick={getSignedRequest}>Submit</button>
        </div>
    );
}

export default Upload;