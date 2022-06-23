export const getSizes = async (product, Model, options = {}) => (
  Model.aggregate([
    {
      $match: {
        model: product.model,
        ...options
      }
    },
    {
      $group: {
        _id: "$size",
        id: { $first: "$_id" },
        size: { $first: "$size" }
      }
    },
    { $sort: { size: 1 } },
    { $project: { _id: 0 } }
  ])
)
