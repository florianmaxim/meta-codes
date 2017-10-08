import mongodb from 'mongodb';

export default class Database {

  constructor(){
    this.url = 'mongodb://localhost:27017/meta';
    this.connection = mongodb.connect(this.url);
  }

  get(identifier, cb){

    console.log('[Database] - _ID: '+identifier)

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").find({ '_id': new mongodb.ObjectID(identifier)}).toArray((err, result) => {
        if (err) throw err;
        console.log(result[0]);
        cb(JSON.stringify(result[0]));
        db.close();
        return;
      });

    });

  }

  set(code, cb){

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").insertOne({code: code}, (err, res) => {

        if (err) throw err;
        console.log('[Database] - Got identifier: '+res.insertedId);

        cb(res.insertedId);

        db.close();

      });

    });

  }

  remove(identifier){

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").remove({_id: ObjectID(identifier)}, (err, res)  => {
        if (err) throw err

        console.log(result);

        db.close();

        });

    });
  }
}
