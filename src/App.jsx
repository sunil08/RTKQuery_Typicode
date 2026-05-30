import { useState } from 'react'
import './App.css'
import { useCreatePostMutation, useGetPostsQuery } from './Redux/jsonPlaceholderAPI'

function App() {

  const [newPost, setNewPost] = useState({title: "", body: "", id: 99999});

  const {data, error, loading, refetch} = useGetPostsQuery();

  const [createPost, {isLoading: isCreating, error: createError}] = useCreatePostMutation();

  const handleCreatePost = async () => {
    await createPost(newPost);
    //refetch();
  }

  if(loading){
    <h3>Loading...</h3>
  }

  if(createError){
    <h3>There was an error creating post...</h3>
  }

  if(error){
    <h3>There was an error...</h3>
  }

  return (
    <>
      <h1>Posts</h1>
      <div>
        <input
          type='text'
          placeholder='Enter title'
          onChange={(e) => setNewPost((prev) => ({...prev, title: e.target.value}))}
        />

        <input
          type='text'
          placeholder='Enter Body'
          onChange={(e) => setNewPost((prev) => ({...prev, body: e.target.value}))}
        />

        <button onClick={handleCreatePost} disabled={isCreating}>
          Create Post
        </button>

        <div>
          {
            data?.map((post) => (
              <p>{post.title}</p>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
