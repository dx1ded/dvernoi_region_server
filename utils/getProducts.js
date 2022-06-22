export const getProducts = async (Model, limit, skip = 0, matches = {}) => (
  Model.aggregate([
    { $match: matches },
    { $sort: { glass: 1, size: 1, model: 1 } },
    { $skip: skip },
    { $limit: limit },
  ])
)
