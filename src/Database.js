import mongodb from 'mongodb';

export default class Database {

  constructor(){
    this.url = 'mongodb://localhost:27017/meta';
    this.connection = mongodb.connect(this.url);
  }

  select(identifier, cb){

    console.log('[Database] - Select identifier: '+identifier)

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").find({ '_id': new mongodb.ObjectID(identifier)}).toArray((err, result) => {
        if (err) throw err;

        //console.log('[Database] - Selected identifier: '+JSON.stringify(result[0]);
        cb(JSON.stringify(result[0]));

        db.close();

      });

    });

  }

  insert(code, cb){

    //console.log('[Database] - Set code: '+code);

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").insertOne({code: code}, (err, res) => {

        if (err) throw err;

        //console.log('[Database] - Received identifier: '+res.insertedId);

        //Callback identifier
        cb(res.insertedId);

        db.close();

      });

    });

  }

  remove(identifier, cb){

    //console.log('[Database] - Remove identifier: '+identifier);

    mongodb.connect(this.url, (err, db) => {

      db.collection("codes").remove({_id: new mongodb.ObjectID(identifier)}, (err, res)  => {

        if (err) throw err

        //console.log('[Database] - Removed identifier: '+identifier);

        cb(res);

        db.close();

        });

    });
  }
}
