Project uses API: https://jsonplaceholder.typicode.com/

MUTATION Redux Toolkit RTK Query.

const [createPost, { isLoading: isCreating, error: createError }] =
  useCreatePostsMutation();

`useCreatePostsMutation()` returns an array with 2 items:

[
  mutationFunction,
  mutationStateObject
]

So internally:

const result = useCreatePostsMutation();

looks like:

[
  createPost,
  {
    isLoading,
    error,
    data,
    isSuccess
  }
]

---

# First item

createPost

This is the mutation function used to call API.

Example:

createPost({
  title: "React",
  body: "Learning RTK Query"
});

It sends POST request.

---

# Second item

{
  isLoading: isCreating,
  error: createError
}

This is object destructuring.

RTK Query provides mutation states:

{
  isLoading,
  error,
  data,
  isSuccess,
  isError
}

You renamed them:

isLoading: isCreating

means:

Take isLoading
Rename it to isCreating

Similarly:

error: createError

means:

Take error
Rename it to createError

---

Equivalent normal JavaScript:

const mutationResult = useCreatePostsMutation();

const createPost = mutationResult[0];

const isCreating = mutationResult[1].isLoading;

const createError = mutationResult[1].error;

---

# Why rename variables?

Because multiple mutations may exist.

Without renaming:

const [createPost, { isLoading }] =
  useCreatePostsMutation();

const [updatePost, { isLoading }] =
  useUpdatePostMutation();

This causes duplicate variable error.

So rename:

```js id="y4m7qv"
isLoading: isCreating
isLoading: isUpdating
```

Cleaner and avoids conflicts.

---

# Typical usage

<button
  onClick={handleCreate}
  disabled={isCreating}
>
  {
    isCreating
      ? "Creating..."
      : "Create Post"
  }
</button>

Error handling:

{
  createError && (
    <p>{createError.message}</p>
  )
}

This is the standard RTK Query mutation pattern.
