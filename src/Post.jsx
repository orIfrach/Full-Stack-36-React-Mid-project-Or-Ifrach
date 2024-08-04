import React from 'react';

const Post = ({ post}) => {

  return (
      <div style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
        <div>Title: {post.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            </div>
        <div>Body: {post.body}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            </div>
      </div>
  );
};

export default Post;
