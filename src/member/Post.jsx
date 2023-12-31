import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../css/Post.css'

const Post = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    console.log(data);
    let extraAddress = '';
    let zonecode = '';

    if(data.addressType === 'R'){
      if(data.bname !== ''){
        extraAddress += data.bname;
      }
      if(data.buildingName !== ''){
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '');
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.setcompany({
      ...props.company,
      address:fullAddress,
      zonecode:data.zonecode,
    })
  }
  return (
    <div>
      <DaumPostcode
      className='postmodal'
      autoClose
      onComplete={complete}></DaumPostcode>
    </div>
  );
};

export default Post;