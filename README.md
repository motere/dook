# Dook

> Manage remote **data** with **hooks**

## 核心 Api

核心只有一个 `useQuery`:

```js
const { data, loading } = useQuery(input, opt)
```

## Restfull

Get todos:

```js
const { data, loading } = useQuery('/todos', {
  query: { limit: 10 },
})
```

create todo:

```js
const { data, loading, start } = useQuery('/todos', {
  method: 'POST',
  body: { title: 'todo 1' },
})
```

## GraphQL

```js
const { data, loading } = useQuery(`query todos { title }`, {
  variables: { limit: 5 },
})
```

## Custom key

```js
const { data, loading } = useQuery(['getTodo_key', () => getTodo()])
```
