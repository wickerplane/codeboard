'use strict'

const db = require('APP/db')
    , {User, Question, Category, Difficulty, Hint, userQuestion, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    difficulties: difficulties(),
    categories: categories()
  }

  seeded.questions = questions(seeded)
  seeded.hints = hints(seeded)
  seeded.userQuestions = userQuestions(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  ruth: {
    email: 'ruth@codeboard.tech',
    name: 'Ruth Naebeck',
    password: '1234',
  },
  cigdem: {
    email: 'cigdem@codeboard.tech',
    name: 'Cigdem Aybar',
    password: '1234',
  },
  fanny: {
    email: 'fanny@codeboard.tech',
    name: 'Fanny Jiang',
    password: '1234',
  },
  rachel: {
    email: 'rachel@codeboard.tech',
    name: 'Rachel Cohen',
    password: '1234',
  },
  cody: {
    email: 'cody@gracehopper.edu',
    name: 'Cody Codeman',
    password: '1234'
  }
})

const categories = seed(Category, {
  stringsArrays: {
    id: 1,
    name: 'Strings & Arrays'
  },
  linkedLists: {
    id: 2,
    name: 'Linked Lists'
  },
  stacksQueues: {
    id: 3,
    name: 'Stacks & Queues'
  },
  treesGraphs: {
    id: 4,
    name: 'Trees & Graphs'
  }
})

const difficulties = seed(Difficulty, {
  easy: {
    id: 1,
    level: 'Easy',
    minutes: 15
  },
  medium: {
    id: 2,
    level: 'Medium',
    minutes: 20
  },
  hard: {
    id: 3,
    level: 'Hard',
    minutes: 30
  }
})

const questions = seed(Question, ({ categories, difficulties }) =>
  ({
    isUnique: {
      id: 101,
      name: 'Is Unique',
      text: 'Implement an algorithm to determine if a string has all unique characters by returning true or false.',
      start_function: 'function isUnique(str) {}',
      tests: '1.01-isUnique.spec.js',
      solution: '1.01-isUnique.js',
      category_id: categories.stringsArrays.id,
      difficulty_id: difficulties.easy.id,
    },
    checkPermutations: {
      id: 102,
      name: 'Check Permutations',
      text: 'Given two strings, write a function to decide if one is a permutation of the other by returning true or false.',
      start_function: 'function checkPermutations(str1, str2) {}',
      tests: '1.02-checkPermutations.spec.js',
      solution: '1.02-checkPermutations.js',
      category_id: categories.stringsArrays.id,
      difficulty_id: difficulties.easy.id
    },
    urlify: {
      id: 103,
      name: 'URLify',
      text: 'Write a method to replace all spaces in a string with percent twenty. Then return the updated string.',
      start_function: 'function urlify(str) {}',
      tests: '1.03-URLify.spec.js',
      solution: '1.03-URLify.js',
      category_id: categories.stringsArrays.id,
      difficulty_id: difficulties.easy.id
    },
    palindromePermutation: {
      id: 104,
      name: 'Palindrome Permutation',
      text: 'Given a string, write a function to check if it is a permutation of a palindrome.',
      start_function: 'function palindromePermutation(str) {}',
      tests: '1.04-palindromePermutation.spec.js',
      solution: '1.04-palindromePermutation.js',
      category_id: categories.stringsArrays.id,
      difficulty_id: difficulties.easy.id
    },
    removeDupes: {
      id: 201,
      name: 'Remove Duplicates',
      text: 'Given an unsorted linked list, write code to remove the duplicates.',
      start_function: 'function removeDupes(list) {}',
      tests: '2.01-removeDupes.spec.js',
      solution: '2.01-removeDupes.js',
      category_id: categories.linkedLists.id,
      difficulty_id: difficulties.medium.id
    },
    kthToLast: {
      id: 202,
      name: 'Kth To Last',
      text: 'Implement an algorithm to return the K to last element of a singly linked list.',
      start_function: 'function kthToLast(list, k) {}',
      tests: '2.02-KthToLast.spec.js',
      solution: '2.02-KthToLast.js',
      category_id: categories.linkedLists.id,
      difficulty_id: difficulties.medium.id
    },
    deleteMiddleNode: {
      id: 203,
      name: 'Delete Middle Node',
      text: 'Implement an algorithm to delete a given node from a singly linked list. The node will not be the head or tail node.',
      start_function: 'function deleteMiddleNode(node) {}',
      tests: '2.03-deleteMiddleNode.spec.js',
      solution: '2.03-deleteMiddleNode.js',
      category_id: categories.linkedLists.id,
      difficulty_id: difficulties.easy.id
    },
    partition: {
      id: 204,
      name: 'Partition',
      text: 'Write code to partition a linked list around a value X, such that all nodes less than X, come before all nodes greater than or equal to X, if X, is contained within the list, the values of X, only need to be after the elements less than X, the partition element X, can appear anywhere in the right partition. It does not need to appear between the left and right partitions.',
      start_function: 'function partition(list, partitionNum) {}',
      tests: '2.04-partition.spec.js',
      solution: '2.04-partition.js',
      category_id: categories.linkedLists.id,
      difficulty_id: difficulties.medium.id
    },
    threeStacksInOne: {
      id: 301,
      name: 'Three Stacks in One',
      text: 'Write a class that uses a single array to implement three stacks. The class should have push, pop, and peek methods.',
      start_function: 'var TripleStack = class{\n  constructor() {}\n}',
      tests: '3.01-threeStacksInOne.spec.js',
      solution: '3.01-threeStacksInOne.js',
      category_id: categories.stacksQueues.id,
      difficulty_id: difficulties.medium.id
    },
    stackMin: {
      id: 302,
      name: 'Stack Min',
      text: 'Write a stack class that has min, push, pop, and peek methods.',
      start_function: 'var stackMin = class{\n  constructor() {}\n}',
      tests: '3.02-stackMin.spec.js',
      solution: '3.02-stackMin.js',
      category_id: categories.stacksQueues.id,
      difficulty_id: difficulties.medium.id
    },
    setOfStacks: {
      id: 303,
      name: 'Set of Stacks',
      text: 'Implement a data structure that creates stacks. When one stack reaches its maximum size, a new stack will be created. The class should have push, pop, and pop at methods.',
      start_function: 'var setOfStacks = class{\n  constructor() {}\n}',
      tests: '3.03-setOfStacks.spec.js',
      solution: '3.03-setOfStacks.js',
      category_id: categories.stacksQueues.id,
      difficulty_id: difficulties.medium.id
    },
    queueViaStacks: {
      id: 304,
      name: 'Queue via Stacks',
      text: 'Write a class that implements a queue using two stacks. The class should have enqueue and dequeue methods.',
      start_function: 'var queueViaStacks = class{\n  constructor(maxSize) {}\n}',
      tests: '3.04-queueViaStacks.spec.js',
      solution: '3.04-queueViaStacks.js',
      category_id: categories.stacksQueues.id,
      difficulty_id: difficulties.medium.id
    },
    routesBetweenNodes: {
      id: 401,
      name: 'Routes Between Nodes',
      text: 'Given a directed graph, design an algorithm to determine if there is a route between two nodes by returning true or false.',
      start_function: 'function routesBetweenNodes(graph, start, target) {}',
      tests: '4.01-routesBetweenNodes.spec.js',
      solution: '4.01-routesBetweenNodes.js',
      category_id: categories.treesGraphs.id,
      difficulty_id: difficulties.hard.id
    },
    minimalHeightBST: {
      id: 402,
      name: 'Minimal Tree',
      text: 'Given a sorted, increasing order, array with unique integer elements, write an algorithm to create a binary search tree with minimal height.',
      start_function: 'function minimalHeightBST(arr) {}\n\nfunction createMinimalHeightBST(arr, start, end) {}',
      tests: '4.02-minimalHeightBST.spec.js',
      solution: '4.02-minimalHeightBST.js',
      category_id: categories.treesGraphs.id,
      difficulty_id: difficulties.hard.id
    },
    linkedListsOfBTDepth: {
      id: 403,
      name: 'Linked Lists of BT Depth',
      text: 'Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth. The number of linked lists will equal the tree depth.',
      start_function: 'function linkedListsOfBTDepth(tree) {}',
      tests: '4.03-listOfDepthBT.spec.js',
      solution: '4.03-listOfDepthBT.js',
      category_id: categories.treesGraphs.id,
      difficulty_id: difficulties.hard.id
    },
    checkBalancedBT: {
      id: 404,
      name: 'Check Balanced BT',
      text: 'Implement a function to check if a binary tree is balanced. A balanced tree is a tree where the heights of the two sub trees of any node never differ by more than one.',
      start_function: 'function checkBalancedBT(tree) {}',
      tests: '4.04-checkBalancedBT.spec.js',
      solution: '4.04-checkBalancedBT.js',
      category_id: categories.treesGraphs.id,
      difficulty_id: difficulties.hard.id
    },
  }))

const hints = seed(Hint, ({ questions }) =>
  ({
    isUnique1: {
      id: 1011,
      text: 'Try a hash table.',
      question_id: questions.isUnique.id
    },
    isUnique2: {
      id: 1012,
      text: 'Could a bit vector be useful?',
      question_id: questions.isUnique.id
    },
    checkPermutations1: {
      id: 1021,
      text: 'Two strings that are permutations of each other should have the same characters but in different orders.',
      question_id: questions.checkPermutations.id
    },
    checkPermutations2: {
      id: 1022,
      text: 'Could a hash table be useful?',
      question_id: questions.checkPermutations.id
    },
    urlify1: {
      id: 1031,
      text: "It's often easiest to modify strings by going from the end of the string to the beginning.",
      question_id: questions.urlify.id
    },
    urlify2: {
      id: 1032,
      text: 'You might find it helpful to count the number of spaces in the string.',
      question_id: questions.urlify.id
    },
    palindromePermutation1: {
      id: 1041,
      text: 'You do not have to, and should not, generate all permutations.',
      question_id: questions.palindromePermutation.id
    },
    palindromePermutation2: {
      id: 1042,
      text: '',
      question_id: questions.palindromePermutation.id
    },
    removeDupes1: {
      id: 2011,
      text: 'Have you tried a hash table? You should be able to do this in a single pass of the linked list.',
      question_id: questions.removeDupes.id
    },
    removeDupes2: {
      id: 2012,
      text: 'Try using two pointers where the second one searches ahead of the first one.',
      question_id: questions.removeDupes.id
    },
    kthToLast1: {
      id: 2021,
      text: "Since you don't know the linked list's size, how can you compute it?",
      question_id: questions.kthToLast.id
    },
    kthToLast2: {
      id: 2022,
      text: 'What if you had two pointers pointing to adjacent nodes?',
      question_id: questions.kthToLast.id
    },
    deleteMiddleNode1: {
      id: 2031,
      text: 'Picture the list 1, 5, 9, 12. Removing 9 would leave 1, 5, 12.',
      question_id: questions.deleteMiddleNode.id
    },
    partition1: {
      id: 2041,
      text: 'Consider that the elements do not have to stay in the same relative order. You only need to ensure that elements less than the pivot must be before elements greater than the pivot.',
      question_id: questions.partition.id
    },
    threeStacksInOne1: {
      id: 3011,
      text: 'A stack is a data structure in which the most recently added elements are removed first.',
      question_id: questions.threeStacksInOne.id
    },
    threeStacksInOne2: {
      id: 3012,
      text: 'You could simulate three stacks in an array by allocating the first third of the array to the first stack, the second third to the second stack, and the final third to the third stack.',
      question_id: questions.threeStacksInOne.id
    },
    stackMin1: {
      id: 3021,
      text: 'The minimum element does not change very often. It only changes when a smaller element is added, or when the smallest element is popped.',
      question_id: questions.stackMin.id
    },
    stackMin2: {
      id: 3022,
      text: 'What if we keep track of extra data at each stack node? What sort of data might make it easier to solve the problem?',
      question_id: questions.stackMin.id
    },
    stackMin3: {
      id: 3023,
      text: 'Consider having each node know the minimum of its substack, all the elements beneath it, including itself.',
      question_id: questions.stackMin.id
    },
    setOfStacks1: {
      id: 3031,
      text: 'You will need to keep track of the size of each substack. When one stack is full, you may need to create a new stack.',
      question_id: questions.setOfStacks.id
    },
    setOfStacks2: {
      id: 3032,
      text: 'Popping an element at a specific substack will mean that some stacks are not at full capacity.',
      question_id: questions.setOfStacks.id
    },
    queueViaStacks1: {
      id: 3041,
      text: 'The major difference between a queue and a stack is the order of elements. A queue removes the oldest item and a stack removes the newest item.',
      question_id: questions.queueViaStacks.id
    },
    queueViaStacks2: {
      id: 3042,
      text: 'You can remove the oldest item from a stack by repeatedly removing the newest item, inserting those items into a temporary stack, until you are left with one element.',
      question_id: questions.queueViaStacks.id
    },
    routesBetweenNodes1: {
      id: 4011,
      text: 'Try a breadth first search.',
      question_id: questions.routesBetweenNodes.id
    },
    routesBetweenNodes2: {
      id: 4012,
      text: 'The breadth first search should be iterative.',
      question_id: questions.routesBetweenNodes.id
    },
    minimalHeightBST1: {
      id: 4021,
      text: 'A minimal binary search tree has about the same number of nodes on the left of each node as on the right.',
      question_id: questions.minimalHeightBST.id
    },
    minimalHeightBST2: {
      id: 4022,
      text: 'You could implement this by finding the ideal next element to add and repeatedly calling insert value.',
      question_id: questions.minimalHeightBST.id
    },
    linkedListsOfBTDepth1: {
      id: 4031,
      text: 'Try modifying a graph search algorithm to track the depth from the root.',
      question_id: questions.linkedListsOfBTDepth.id
    },
    linkedListsOfBTDepth2: {
      id: 4032,
      text: 'A hash table or array that maps from level number to nodes at that level might also be useful.',
      question_id: questions.linkedListsOfBTDepth.id
    },
    checkBalancedBT1: {
      id: 4041,
      text: 'Think about the definition of a balanced tree. Can you check that condition for a single node? Can you check it for every node?',
      question_id: questions.checkBalancedBT.id
    },
    checkBalancedBT2: {
      id: 4042,
      text: 'What if you could modify the binary tree node class to allow a node to store the height of its subtree?',
      question_id: questions.checkBalancedBT.id
    },
  }))

const userQuestions = seed(userQuestion, ({ users, questions }) =>
  ({
    ruthQuestion1: {
      status: 'pending',
      question_id: questions.isUnique.id,
      user_id: users.ruth.id,
      user_answer: 'function isUnique(str) {\n\n}',
      user_drawing: []
    },
    codyQuestion1: {
      status: 'complete',
      question_id: questions.checkPermutations.id,
      user_id: users.cody.id,
      user_answer: 'function checkPermutations(str1, str2) {}',
      user_drawing: []
    },
    codyQuestion2: {
      status: 'pending',
      question_id: questions.removeDupes.id,
      user_id: users.cody.id,
      user_answer: 'function removeDupes(list) {}',
      user_drawing: []
    },
    codyQuestion3: {
      status: 'pending',
      question_id: questions.threeStacksInOne.id,
      user_id: users.cody.id,
      user_answer: 'var TripleStack = class{\n  constructor() {}\n}',
      user_drawing: []
    },
    codyQuestion4: {
      status: 'complete',
      question_id: questions.routesBetweenNodes.id,
      user_id: users.cody.id,
      user_answer: 'function routesBetweenNodes(graph, start, target) {}',
      user_drawing: []
    },
  }))

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
