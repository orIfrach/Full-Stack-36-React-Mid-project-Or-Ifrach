import React, { useState, useEffect } from 'react';
import Post from './Post';
import AddPost from './AddPost';

const PostsDisplay = ({ posts, user }) => {
  const [postList, setPostList] = useState(posts);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPostList((prevPosts) => [...prevPosts, { ...newPost, id: prevPosts.length + 1 }]);
    setShowAddPost(false);
  };

  return (
    <div 
      style={{
        border: '2px solid black',
        width: '420px',
        height: '300px',
        marginTop: '20px',
        overflowY: 'auto',
        padding: '10px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ paddingBottom: '10px', marginBottom: '10px' }}>Posts - User {user.id}</h4>
        <button onClick={() => setShowAddPost(true)}>Add</button>
      </div>
      {showAddPost ? (
        <AddPost onAddPost={handleAddPost} onCancel={() => setShowAddPost(false)} />
      ) : postList.length === 0 ? (
        <p>No Posts available.</p>
      ) : (
        postList.map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default PostsDisplay;
