export const getInnerColors = async (product, Model) => (
  Model.aggregate([
    {
      $match: {
        model: product.model,
        group: product.group,
        size: product.size,
        canvas_type: product.canvas_type,
        outer_side_color: product.outer_side_color
      }
    },
    {
      $group: {
        _id: "$inner_side_color",
        id: { $first: "$_id" },
        articul: { $first: "$articul" },
        name: { $first: "$name" },
        color: { $first: "$inner_side_color" }
      }
    },
    { $sort: { color: 1 } },
    { $project: { _id: 0 } }
  ])
)
