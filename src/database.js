import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

    const URI = `mongodb+srv://${process.env.USER_MONGO_DB}:${process.env.PASS_MONGO_DB}@${process.env.CLUSTER}/${process.env.NAME_DB}?retryWrites=true&w=majority`

    const conn = () => {
        return (
            mongoose.connect(URI)
                .then(db => console.log('Mongo is listen'))
                .catch(err => console.error(err)) 
        )
    }
    
export default conn