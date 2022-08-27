// Module 9 Mongoose Modelling relationships between connecte data

// // Lec 1 Modelling Relationship

// // trade off between query performance vs consistency

// // using References (Normalization) -> Consistency

// let author = {
//     name: 'xyz'
// }
// let course = {
//     author : 'id'
// }



// // Using Embedded Documents (Denormalization)-> Performanace
// let course = {
//     author: {
//         name: 'abc'
//     }
// }


// // Hybrid Approach
// // In this we only emmbbed the necessary property

// let author = {
//     name: 'abc'
//     // 50 other properties
// }

// let course = {
//     author: {
//         id: 'ref',
//         name: 'Mosh'
//     }
// }



// //=================================================================================

// // Lec 2 Referencing Documents

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const Author = mongoose.model('Author', new mongoose.Schema({
        
//     name: String,
//     bio: String,
//     website: String
// }))

// const Course = mongoose.model('Course', new mongoose.Schema({
//     name: String,
//     // schema type object
//     // referencing
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Author'
//     }
// }))


// async function createAuthor(name, bio, website) {
//     const author = new Author({
//         name,
//         bio,
//         website
//     })
//     const result = await author.save()
//     console.log(result)
// }

// async function createCourse(name, author) {
//     const course = new Course({
//         name,
//         author
//     })
//     const result = await course.save()
//     console.log(result)
// }

// async function listCourses() {
//     const courses = await Course
//         .find()
//         .select('name')
//     console.log(course)
// }

// //createAuthor('Anurag', 'My bio', 'My website')
// createCourse('Node Course', '6309fb837acf4e0e28fc6782')
// // listCourse()



//=================================================================================

// // Lec 3 Population

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const Author = mongoose.model('Author', new mongoose.Schema({
        
//     name: String,
//     bio: String,
//     website: String
// }))

// const Course = mongoose.model('Course', new mongoose.Schema({
//     name: String,
//     // schema type object
//     // referencing
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Author' // name of collection
//     }
// }))


// async function createAuthor(name, bio, website) {
//     const author = new Author({
//         name,
//         bio,
//         website
//     })
//     const result = await author.save()
//     console.log(result)
// }

// async function createCourse(name, author) {
//     const course = new Course({
//         name,
//         author
//     })
//     const result = await course.save()
//     console.log(result)
// }

// async function listCourses() {
//     const courses = await Course
//         .find()
//         // Using populate method in order to see the data of reference
//         //.populate('author')
//         //.populate('author', 'name') // propeties to include
//         .populate('author', 'name-_id') // excluding property
//         //we can populate multiple referneces like category
//         //.populate('category', 'name')
//         .select('name author')
//     console.log(courses)
// }

// //createAuthor('Anurag', 'My bio', 'My website')
// // createCourse('Node Course', '6309fb837acf4e0e28fc6782')
// listCourses()


//=============================================================================
// Lec 4 Embedding Documents

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


const authorSchema = new mongoose.Schema({ 
    name: String,
    bio: String,
    website: String
})

const Author = mongoose.model('Author', authorSchema)

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}))


async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save()
    console.log(result)
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })
    const result = await course.save()
    console.log(result)
}

async function listCourses() {
    const courses = await Course.find()
    console.log(courses)
}

// Updating the name of author in document
async function updateAuthor(courseId) {
    //const course = await Course.findById(courseId)

    // udating the sub document directly in database
    // const cosurse = await Course.update({ _id: courseId }, {
    //     // updating
    //     $set: {
    //         // write name of the properties you want to update
    //         'author.name': 'Jhon'
    //     }
    // })


    // removing the subdocument
    const course = await Course.update({ _id: courseId }, {
        // updating
        $unset: {
            // write name of the properties you want to update
            'author': ''
        }
    })
    // course.author.name = 'Anurag'
    // course.save()
    console.log(course)

    // note course.Author.save dosen't exist

}

//createAuthor('Anurag', 'My bio', 'My website')
// createCourse('Node Course', new Author({ name: 'Mosh'}))
// listCourses()

updateAuthor('630a02f2bac04584e8ea6e5c')