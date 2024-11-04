let ItemQuery = [
  {
    $match: {
      status: 1,
    },
  },
  {
    $addFields: {
      avatar: { $substr: ["$avatar", 1, { $strLenCP: "$avatar" }] },
    },
  },
  {
    $project: {
      _id: 1,
      n: "$restaurantname",
      a: "$availability",
      ra: "$avg_ratings",
      s: "$speciality",
      ro: "$role",
      i: "$avatar",
    },
  },
  //limit to five juste for traying
];

export default ItemQuery;
