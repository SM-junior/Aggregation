// 1. how many users are active?

// [
//     {
//       $match: {
//         eyeColor:"brown"
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         brownEyedPerson:{
//           $sum:1
//         }
//       }
//     }
//   ]
//   --------------Or---------------

//   [
//     {
//        $match:{
//         isActive:true
//        }
//     },
//     {
//         $count:"activeUsers"
//     }
//   ]

//2. what is the average age of all users ?
// [
//     {
//         $group: {
//             _id: null,
//             averageAge: {
//                 $avg: "$age"
//             }
//         }
//     }
// ]

// 3.what is the average age of male and female?

// [
//     {
//       $group: {
//         _id: "$gender",
//         averageAge:{
//           $avg:"$age"
//         }
//       }
//     }
//   ]

//4. list the 5 most common favoriteFruits among the users ?
// [
//     {
//       $group: {
//         _id: "$favoriteFruit",
//         favoriteFruits:{
//           $sum:1
//         }
//       }
//     },
//     {
//       $sort: {
//         favoriteFruits: -1
//       }
//     },
//     {
//       $limit: 4
//     }
//   ]

//------------------------------------------------
// [
//     {
//       $group: {
//         _id: "$favoriteFruit"
//       }
//     }
//   ]
//   result:
// _id: "strawberry"
// _id: "orange"
// _id: "apple"
// _id: "banana"
// _id: "grape"1

//------------------------------------------------
// [
//     {
//         $group: {
//             _id: "$favoriteFruit",
//             favoriteFruits: {
//                 $sum: 1
//             }
//         }
//     }
// ]

// result:
// _id: orange,
// favoriteFruits: 13
// _id: strawberry,
// favoriteFruits: 11
// _id: apple,
// favoriteFruits: 19
//  _id: banana,
// favoriteFruits: 13
// _id: grape,
// favoriteFruits: 8

//------------------------------------------------
// [
//     {
//       $group: {
//         _id: "$favoriteFruit",
//         favoriteFruits:{
//           $sum:1
//         }
//       }
//     },
//     {
//       $sort: {
//         favoriteFruits: -1
//       }
//     }
//   ]
//   result:
// _id: apple,
// favoriteFruits: 19
// _id: orange,
// favoriteFruits: 13
// _id: banana,
// favoriteFruits: 13
// _id: strawberry,
// favoriteFruits: 11
// _id: grape,
// favoriteFruits: 8

//------------------------------------------------
// [
//     {
//       $group: {
//         _id: "$favoriteFruit",
//         favoriteFruits:{
//           $sum:1
//         }
//       }
//     },
//     {
//       $sort: {
//         favoriteFruits: -1
//       }
//     },
//     {
//       $limit: 3
//     }
//   ]
// result:
//   _id: apple,
//   favoriteFruits: 19
//   _id: orange,
//   favoriteFruits: 13
//   _id: banana,
//   favoriteFruits: 13

//5.find the total number of males and females ?
// [
//     {
//         $group: {
//             _id: "$gender",
//             count: {
//                 $sum: 1
//             }
//         }
//     }
// ]

//6. which country has the highest number of registered users ?
// [
//     {
//       $group: {
//         _id: "$company.location.country",
//         count:{
//           $sum:1
//         }
//       }
//     },
//     {
//       $sort: {
//         count: -1
//       }
//     },
//     {
//       $limit: 1
//     }
//   ]

//7. list all the unique eye color present in the collection?
// [
//     {
//         $group: {
//             _id: "$eyeColor"
//         }
//     }
// ]

//8. what is the average number of tags per user?
// [
//     {
//       $addFields: {
//         numberOfTags:{
//           $size:{$ifNull:["$tags",[]]}
//         }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         averageNoOfTags:{
//           $avg:"$numberOfTags"
//         }
//       }
//     }
//   ]

// how many users has 'emin' as their tag?
// [
//     {
//       $match: {
//         tags:"emin"
//       }
//     },
//     {
//       $count: 'eminTag'
//     }
//   ]

// what are the name and age of users who are inactive and have 'velit' as a tag?
// [
//     {
//       $match: {
//         inActive:false,
//         tags:"velit"
//       }
//     },
//     {
//       $project: {
//         name:1,
//         age:1
//       }
//     }
//   ]

// who has registered the most recently?
// [
//     {
//       $sort: {
//         registered: -1
//       }
//     },
//     {
//       $project: {
//         name:1,
//         registered:1
//       }
//     },
//     {
//       $limit: 5
//     }
//   ]

// categorize users by their favorite fruit?
// [
//     {
//       $group: {
//         _id: "$favoriteFruit",
//         users:{
//           $push:"$name"
//         }
//       }
//     }
//   ]

// how many users have 'ad' as the second tag in their tag list?
// [
//     {
//       $match: {
//         "tags.1":"ad"
//       }
//     },
//     {
//       $count: 'TagwithAd'
//     }
//   ]

// find users who have both 'emin' and 'id' as their tags?
// [
//     {
//       $match: {
//         tags:{$all:["emin","id"]}
//       }
//     },
//     {
//       $count: 'user With emin & ad tag'
//     }
//   ]

//list all companies located in usa with their corresponding user count?
// [
//     {
//       $match: {
//         "company.location.country":"United States"
//       }
//     },
//     {
//       $group: {
//         _id: "$company.title",
//         userCount:{$sum:1}
//       }
//     }
//   ]