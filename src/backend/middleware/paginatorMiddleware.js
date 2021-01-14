/**
 * Pagination middleware
 *
 * @author Huda Prasetyo
 * @since 2020
 */

export default (req, res, next) => {
  res.paginate = async (model, limitData = 10) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || limitData

    const startIndex = (page - 1) * limit

    if (startIndex < 0 || limit < 0) {
      return false
    }

    let results = {}

    try {
      const totalData = await model.countDocuments().exec()
      const lastPage = Math.ceil(totalData / limit)
      const fullUrl = `${req.protocol}://${req.get('host')}${req.route.path}`

      results.links = {
        first: `${fullUrl}?page=1`,
        last: `${fullUrl}?page=${lastPage}`,
        prev: `${startIndex > 0 ? fullUrl + '?page=' + (page - 1) : null}`,
        next: `${fullUrl}?page=${page + 1}`
      }

      results.meta = {
        currentPage: page,
        previousPage: startIndex > 0 ? page - 1 : null,
        nextPage: page + 1,
        lastPage,
        path: fullUrl,
        limit,
        total: totalData
      }

      results.data = await model.find().limit(limit).skip(startIndex).exec()
      if (results.data.length === 0) results.meta.nextPage = null
      return results
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  next()
}
