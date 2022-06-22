export const getColors = async (product, Model) => (
  Model.aggregate([
    {
      $match: {
        model: product.model,
        canvas_type: product.canvas_type,
        size: product.size,
        group: product.group
      }
    },
    {
      $group: {
        _id: "$color",
        id: { $first: "$_id" },
        articul: { $first: "$articul" },
        name: { $first: "$name" },
        color: { $first: "$color" }
      }
    },
    { $sort: { color: 1 } },
    { $project: { _id: 0 } }
  ])
)
