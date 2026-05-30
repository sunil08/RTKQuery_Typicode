This code is from Redux Toolkit RTK Query.

```js id="n4q8tx"
const [createPost, { isLoading: isCreating, error: createError }] =
  useCreatePostsMutation();
```

`useCreatePostsMutation()` returns an array with 2 items:

```txt id="x7m2qp"
[
  mutationFunction,
  mutationStateObject
]
```

So internally:

```js id="t5v9kr"
const result = useCreatePostsMutation();
```

looks like:

```js id="r8p4mv"
[
  createPost,
  {
    isLoading,
    error,
    data,
    isSuccess
  }
]
```

---

# First item

```js id="k2x7qw"
createPost
```

This is the mutation function used to call API.

Example:

```js id="v6m3tp"
createPost({
  title: "React",
  body: "Learning RTK Query"
});
```

It sends POST request.

---

# Second item

```js id="c9q4zw"
{
  isLoading: isCreating,
  error: createError
}
```

This is object destructuring.

RTK Query provides mutation states:

```js id="g3v8kt"
{
  isLoading,
  error,
  data,
  isSuccess,
  isError
}
```

You renamed them:

```js id="h7m2xp"
isLoading: isCreating
```

means:

```txt id="p5t9wr"
Take isLoading
Rename it to isCreating
```

Similarly:

```js id="e4q6mv"
error: createError
```

means:

```txt id="n8x3kp"
Take error
Rename it to createError
```

---

Equivalent normal JavaScript:

```js id="z2w7tr"
const mutationResult = useCreatePostsMutation();

const createPost = mutationResult[0];

const isCreating = mutationResult[1].isLoading;

const createError = mutationResult[1].error;
```

---

# Why rename variables?

Because multiple mutations may exist.

Without renaming:

```js id="u5p8mx"
const [createPost, { isLoading }] =
  useCreatePostsMutation();

const [updatePost, { isLoading }] =
  useUpdatePostMutation();
```

This causes duplicate variable error.

So rename:

```js id="y4m7qv"
isLoading: isCreating
isLoading: isUpdating
```

Cleaner and avoids conflicts.

---

# Typical usage

```jsx id="s8x2kn"
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
```

Error handling:

```jsx id="m6v9tp"
{
  createError && (
    <p>{createError.message}</p>
  )
}
```

This is the standard RTK Query mutation pattern.
