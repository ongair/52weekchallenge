const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  contactId: String,
  source: String,
  name: String,
  accountType: String,
  state: String,
  metadata: String
});

UserSchema.methods.getMeta = function(key) {
  let json = this.metadata ? JSON.parse(this.metadata) : {}
  return json[key]
}

UserSchema.methods.setMeta = function(key, value) {
  let json = this.metadata ? JSON.parse(this.metadata) : {}
  json[key] = value
  this.metadata = JSON.stringify(json)
}

UserSchema.methods.clearMeta = function() {
  this.metadata = null
}

const UserModel = mongoose.model('User', UserSchema)

function findOrCreate(request) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ contactId: request.contactId, source: request.source, accountType: request.accountType }, (err, res) => {
      if (err)
        reject(err)

      if (res)
        resolve(res)
      else {
        const user = new UserModel({ contactId: request.contactId, source: request.source, name: request.contactName, accountType: request.accountType, state: 'new', metadata: null })
        user.save((err, result) => {
          if (err)
            reject(err)
          else
            resolve(user)
        });
      }
    })
  });
}


module.exports = {
  User: UserModel,
  findOrCreate: findOrCreate
}
