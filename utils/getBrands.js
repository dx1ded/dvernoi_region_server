export const getBrands = async (Model, match = {}) => (
  Model.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$brand",
        name: { $first: "$brand" }
      }
    },
    { $sort: { name: 1 } },
    { $project: { _id: 0 } }
  ])
)
