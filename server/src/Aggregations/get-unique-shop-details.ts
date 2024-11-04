/// date
let date = new Date();
let fixed_date = new Date("2024-01-12T12:00:00");
// image tretement query
let image_processing = {
  $addFields: {
    avatar: {
      $switch: {
        branches: [
          {
            case: {
              $eq: [{ $substr: ["$avatar", 0, 17] }, "./uploads/images/"],
            },
            then: { $substr: ["$avatar", 17, { $strLenCP: "$avatar" }] },
          },
          {
            case: {
              $eq: [{ $substr: ["$avatar", 0, 16] }, "/uploads/images/"],
            },
            then: {
              $substr: ["$avatar", 16, { $strLenCP: "$avatar" }],
            },
          },
          {
            case: {
              $eq: [{ $substr: ["$avatar", 0, 15] }, "uploads/images/"],
            },
            then: {
              $substr: ["$avatar", 15, { $strLenCP: "$avatar" }],
            },
          },
          {
            case: {
              $eq: [
                { $substr: ["$avatar", 0, 38] },
                "https://food.yassir.io/uploads/images/",
              ],
            },
            then: {
              $substr: ["$avatar", 38, { $strLenCP: "$avatar" }],
            },
          },
        ],
        default: "$avatar",
      },
    },
  },
};

// query

let getUniqueDetailsShopQuery: any = [
  {
    $match: {
      status: 1,
      food_count: { $gt: 0 },
    },
  },
  {
    $lookup: {
      from: "categories",
      foreignField: "restaurant",
      localField: "_id",
      as: "categories",
      pipeline: [
        {
          $match: {
            status: 1,
          },
        },
        {
          $sort: {
            is_promotion: 1,
            order: -1,
          },
        },
        image_processing,
        {
          $project: {
            _id: 1,
            n: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$name_translations.en", null] },
                    {
                      $eq: ["$name_translations.en", ""],
                    },
                    {
                      $eq: [{ $type: "$name_translations.en" }, "missing"],
                    },
                  ],
                },
                then: "$name",
                else: "$name_translations.en",
              },
            },
            i: "$avatar",
            o: "$order",
            p: "$parent",
            pro: {
              $cond: {
                if: {
                  $or: [
                    {
                      $eq: ["$is_promotion", null],
                    },
                    {
                      $eq: [{ $type: "$is_promotion" }, "missing"],
                    },
                  ],
                },
                then: "$$REMOVE",
                else: "$is_promotion",
              },
            },
          },
        },
      ],
    },
  },
  {
    $addFields: {
      categories: {
        $filter: {
          input: "$categories",
          as: "ct",
          cond: {
            $ne: ["$$ct.n", "Recommended"],
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "food",
      let: {
        shop_id: "$_id",
        ids: {
          $map: {
            input: "$categories",
            as: "ct",
            in: "$$ct._id",
          },
        },
      },
      as: "food_list",
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$shop", "$$shop_id"],
                },
                {
                  $eq: ["$status", 1],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            categories: {
              $filter: {
                input: "$categories",
                as: "ct",
                cond: {
                  $in: ["$$ct.category", "$$ids"],
                },
              },
            },
          },
        },
        {
          $addFields: {
            category: { $arrayElemAt: ["$categories", 0] },
          },
        },
        image_processing,
        {
          $project: {
            _id: 1,
            n: "$name",
            dc: {
              $cond: {
                if: { $eq: ["$offer.status", 1] },
                then: "$offer.amount",
                else: "$$REMOVE",
              },
            },
            v: "$visibility",
            os: {
              $cond: {
                if: { $gt: ["$quantity", 1] },
                then: true,
                else: "$$REMOVE",
              },
            },
            q: "$qunatity",
            ct: "$category.category",
            o: "$category.item_position",
            d: {
              $cond: {
                if: {
                  $or: [
                    {
                      $eq: ["$descreption", ""],
                    },
                    {
                      $eq: [{ $type: "$descreption" }, "missing"],
                    },
                    {
                      $eq: ["$descreption", undefined],
                    },
                    {
                      $eq: ["$descreption", null],
                    },
                  ],
                },
                then: "$$REMOVE",
                else: "$description",
              },
            },
            mx: {
              $cond: {
                if: {
                  $or: [
                    {
                      $eq: ["$addons", null],
                    },
                    {
                      $eq: ["$addons", []],
                    },
                  ],
                },
                then: "$$REMOVE",
                else: { $toInt: "$minAddons" },
              },
            },
            mi: {
              $cond: {
                if: {
                  $or: [{ $eq: ["$addons", []] }, { $eq: ["$addons", null] }],
                },
                then: "$$REMOVE",
                else: { $toInt: "$minAddons" },
              },
            },
            i: "$avatar",
            mxq: {
              $cond: {
                if: {
                  $eq: ["$maxQuantity", null],
                },
                then: "$$REMOVE",
                else: "$maxQuantity ",
              },
            },
            bp: {
              $cond: {
                if: { $eq: ["$base_pack", []] },
                then: "$$REMOVE",
                else: {
                  $map: {
                    input: "$base_pack",
                    as: "bp",
                    in: {
                      _id: "$$bp._id",
                      n: "$$bp.name",
                      t: "$$bp.type",
                      d: "$$bp.description",
                      mxt: "$$bp.maxTop",
                      mit: "$$bp.minTop",
                      sp: {
                        $map: {
                          input: "$$bp.sub_pack",
                          as: "sb",
                          in: {
                            _id: "$$sb._id",
                            n: "$$sb.name",
                            v: "$$sb.visibility",
                            p: "$$sb.price",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            p: "$price",
            a: {
              $cond: {
                if: {
                  $or: [{ $eq: ["$addons", null] }, { $eq: ["$addons", []] }],
                },
                then: "$$REMOVE",
                else: {
                  $map: {
                    input: "$addons",
                    as: "ad",
                    in: {
                      _id: "$$ad._id",
                      n: "$$ad.name",
                      v: "$$ad.visibility",
                      p: "$$ad.price",
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
  {
    $addFields: {
      list: {
        $filter: {
          input: "$food_list",
          as: "fl",
          cond: {
            $and: [
              { $ne: ["$$fl.ct", null] },
              { $ne: [{ $type: "$$fl.ct" }, "missing"] },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      ct: {
        $map: {
          input: "$categories",
          as: "ct",
          in: {
            $let: {
              vars: {
                l: {
                  l: {
                    $filter: {
                      input: "$list",
                      as: "li",
                      cond: {
                        eq: ["$$li.ct", "$ct._id"],
                      },
                    },
                  },
                },
              },
              in: {
                $cond: {
                  if: { $eq: [{ $size: "$$l.l" }, 0] },
                  then: "$$ct",
                  else: {
                    $mergeObjects: ["$$l", "$$ct"],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "offers",
      foreignField: "restaurant",
      localField: "_id",
      as: "offers",
      pipeline: [
        {
          $match: {
            status: 1,
            valid_form: { $lte: date },
            expering_form: { $gte: date },
          },
        },
        {
          $project: {
            n: {
              n: "$displayName.name",
              fr: "$displayName.fr",
              ar: "$displayName.ar",
              en: "$displayName.en",
            },
            c: "$cumulatif",
            t: "$offer_type",
            b: {
              n: "$item1.name",
              e: "$item._id",
              q: "$nbr_items_purchased",
            },
            g: {
              els: {
                $map: {
                  input: "$item2",
                  as: "itm",
                  in: {
                    _id: "$itm._id",
                    n: "$itm.name",
                    d: "$itm.discount_percent",
                  },
                },
              },
              q: "$nbr_items_offer",
            },
          },
        },
      ],
    },
  },
  {
    $addFields: {
      op: {
        $objectToArray: "$time_setting",
      },
    },
  },
  {
    $addFields: {
      op: {
        $map: {
          input: "$op",
          as: "day",
          in: {
            d: {
              $switch: {
                branches: [
                  {
                    case: {
                      $eq: ["$$day.k", "sunday"],
                    },
                    then: 0,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "monday"],
                    },
                    then: 1,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "tuesday"],
                    },
                    then: 2,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "wednesday"],
                    },
                    then: 3,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "thursday"],
                    },
                    then: 4,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "friday"],
                    },
                    then: 5,
                  },
                  {
                    case: {
                      $eq: ["$$day.k", "saturday"],
                    },
                    then: 6,
                  },
                ],
                default: null,
              },
            },
            t: {
              $concatArrays: [
                [
                  {
                    $concat: [
                      {
                        $dateToString: {
                          format: "%H:%M",
                          date: {
                            $ifNull: [
                              { $toDate: "$$day.v.start_time" },
                              fixed_date,
                            ],
                          },
                        },
                      },
                      "-",
                      {
                        $dateToString: {
                          format: "%H:%M",
                          date: {
                            $ifNull: [
                              { $toDate: "$$day.v.end_time" },
                              fixed_date,
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
                {
                  $map: {
                    input: "$$day.v.other_slots",
                    as: "os",
                    in: {
                      $concat: [
                        {
                          $dateToString: {
                            format: "%H:%M",
                            date: {
                              $ifNull: [
                                { $toDate: "$os.start_time" },
                                fixed_date,
                              ],
                            },
                          },
                        },
                        "-",
                        {
                          $dateToString: {
                            format: "%H:%M",
                            date: {
                              $ifNull: [
                                { $toDate: "$os.end_time" },
                                fixed_date,
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      off: {
        $cond: {
          if: {
            $eq: ["$offer.offer_status", "true"],
          },
          then: {
            ot: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$offer.offer_type", "percentage"] },
                    then: 0,
                  },
                  {
                    case: { $eq: ["$offer.offer_type", "Flat"] },
                    then: 0,
                  },
                ],
                default: 0,
              },
            },
            oa: "$offer_amount",
            ta: "$target_amount",
            mo: "$max_off",
          },
          else: "$$REMOVE",
        },
      },
      cu: {
        $map: {
          input: "$main_cuisine",
          as: "mc",
          in: "$$mc.name",
        },
      },
      t: {
        $switch: {
          branches: [
            {
              case: { $eq: ["$store_type", "dark_store"] },
              then: 0,
            },
            {
              case: { $eq: ["$store_type", "restaurant"] },
              then: 1,
            },
            {
              case: { $eq: ["$store_type", "store"] },
              then: 3,
            },
          ],
          default: 1,
        },
      },
      busy: {
        $cond: {
          if: {
            $or: [
              { $eq: ["$restaurantAvailability", null] },
              {
                $and: [
                  { $ne: ["$restaurantAvailability.busyUntil", null] },
                  { $lte: ["$restaurantAvailability.busyUntil", new Date()] },
                ],
              },
            ],
          },
          then: "$$REMOVE",
          else: "$restaurantAvailability.isBusy",
        },
      },
      rv: {
        $size: "$ratings",
      },
      se: {
        $map: {
          input: "$serv",
          as: "sv",
          in: "$$sv._id",
        },
      },
      sc: {
        $map: {
          input: "$sec",
          as: "sv",
          in: "$$sv._id",
        },
      },
    },
  },
  {
    $addFields: {
      avatar: { $substr: ["$avatar", 1, { $strLenCP: "$avatar" }] },
    },
  },
  {
    $project: {
      n: "$restaurantname",
      ad: "$address.fulladres",
      //   pt: "$pracing_type",
      //   cc: "$address.country_code",
      //   loc: "$location",
      //   rd: "$search_radius",
      //   off: 1,
      rt: "$avg_ratings",
      //   rv: 1,
      //   cu: 1,
      ct: 1,
      //   se: 1,
      //   sc: 1,
      //   t: 1,
      //   ofr: "$offers",
      i: "$avatar",
      //   cs: "$address.currency_symbol",
      //   busy: 1,
      //   op: 1,
    },
  },
];

export default getUniqueDetailsShopQuery;
