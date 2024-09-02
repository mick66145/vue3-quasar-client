import request from '@core/utils/request'

export default function useResource ({
  uri,
  listModel = (item) => item,
  getModel = (item) => item,
  postModel = (item) => item,
  patchModel = (item) => item,
  putModel = (item) => item,
}) {
  const list = ({ query }) => {
    return request({
      url: `/${uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const model = listModel(element)
          return model
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }

  const get = ({ id, query }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && (query = { ...query, id: +id })
    return request({
      url: url,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const model = getModel({ ...res.data })
        return model
      })
  }

  const post = ({ payload }) => {
    return request({
      url: `/${uri}`,
      method: 'post',
      data: postModel(payload),
    }).then(res => res.data)
      .then(res => res.data)
  }

  const patch = ({ id, payload }) => {
    payload = { ...payload, id: +id }
    return request({
      url: `/${uri}/${id}`,
      method: 'patch',
      data: patchModel(payload),
    }).then(res => res.data)
      .then(res => res.data)
  }

  const put = ({ id, payload }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && (payload = { ...payload, id: +id })
    return request({
      url: url,
      method: 'put',
      data: putModel(payload),
    }).then(res => res.data)
      .then(res => res.data)
  }

  const destroy = ({ id, query }) => {
    query = { id: +id }
    return request({
      url: `/${uri}/${id}`,
      method: 'delete',
      params: query,
    }).then(res => res.data)
  }

  const selectAll = ({ query }) => {
    return request({
      url: `/${uri}/action/select_all`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      },
      )
  }

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
  }
}
