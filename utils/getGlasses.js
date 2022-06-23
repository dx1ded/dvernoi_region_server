export const getGlasses = async (product, Model) => (
  Model.aggregate([
    {
      $match: {
        model: product.model,
        color: product.color,
        canvas_type: product.canvas_type,
        size: product.size
      }
    },
    {
      $group: {
        _id: "$glass",
        id: { $first: "$_id" },
        articul: { $first: "$articul" },
        glass: { $first: "$glass" },
        model: { $first: "$model" }
      }
    },
    { $sort: { glass: 1 } },
    { $project: { _id: 0 } }
  ])
)
