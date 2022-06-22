export const getOuterColors = async (product, Model) => (
  Model.aggregate([
    {
      $match: {
        model: product.model,
        group: product.group,
        size: product.size,
        canvas_type: product.canvas_type,
        inner_side_color: product.inner_side_color
      }
    },
    {
      $group: {
        _id: "$outer_side_color",
        id: { $first: "$_id" },
        articul: { $first: "$articul" },
        name: { $first: "$name" },
        color: { $first: "$outer_side_color" }
      }
    },
    { $sort: { color: 1 } },
    { $project: { _id: 0 } }
  ])
)
