var mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1/pfe', { useNewUrlParser: true , useUnifiedTopology: true } ); 
 //mongoose.connect(bdUrl , options)


mongoose.Promise=global.Promise; 
// I used promise and global to use mongoose anywhere as Async when writing mongoose


mongoose.connection.on('error',console.log.bind(console,'MongoDB connection error:'));